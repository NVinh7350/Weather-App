import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {
  setAsyncStorage,
  getAsyncStorage,
  clearAsyncStorage,
} from '../../Storage';
import {API_KEY} from '../../Utilities/Constant';

const initialState = {
  process: {
    status: 'idle',
    message: '',
  },
  currentWeather: {},
  hourlyForecast: [],
  dailyForecast: [],
};

const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {
    setProcessStatus: (state, action) => {
      state.process.status = action.payload;
    },
  },
  extraReducers: build => {
    // callWeatherForecastAPI states
    // if pending then process status is loading
    build.addCase(callWeatherForecastAPI.pending, (state, action) => {
      state.process = {
        status: 'loading',
        message: '...',
      };
    });
    // if fulfilled then process status is success
    // currentWeather, hourlyForecast, dailyForecast are assigned the forecast value
    build.addCase(callWeatherForecastAPI.fulfilled, (state, action) => {
      state.process = {
        status: 'success',
        message: 'update is success',
      };
      state.currentWeather = action.payload?.current;
      // get the attributes contained in forecastday list and remove hourly forecast
      state.dailyForecast = action.payload?.forecast?.forecastday?.map(e => {
        const {hour, ...dailyForecast} = e;
        return dailyForecast;
      });
      // get today's hourly forecast
      state.hourlyForecast = action.payload?.forecast?.forecastday[0]?.hour;
    });
    // if reject then process status is error
    build.addCase(callWeatherForecastAPI.rejected, (state, action) => {
      state.process = {
        status: 'error',
        message: action.error.message
      }
    })
  },
});

export default weatherForecastSlice;

export const callWeatherForecastAPI = createAsyncThunk(
  'weatherForecast/callWeatherForecastAPI',
  async position => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${position}&aqi=yes`;
    const weatherForecastData = await (await fetch(url)).json();
    return weatherForecastData;
  },
);

export const processSelect = (state) => state.weatherForecast.process;
export const currentWeatherSelect = (state) => state.weatherForecast.currentWeather;
export const dailyForecastSelect = (state) => state.weatherForecast.dailyForecast;
export const hourlyForecastSelect = (state) => state.weatherForecast.hourlyForecast;