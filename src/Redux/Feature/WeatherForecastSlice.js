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
  weatherForecastsList: []
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
    // setWeatherForecastsList states
    // if pending then process status is loading
    build.addCase(setWeatherForecastsList.pending, (state, action) => {
      state.process = {
        status: 'loading',
        message: '...',
      };
    });
    // if fulfilled then process status is success
    // currentWeather, hourlyForecast, dailyForecast are assigned the forecast value
    build.addCase(setWeatherForecastsList.fulfilled, (state, action) => {
      state.process = {
        status: 'success',
        message: 'update is success',
      };
      state.weatherForecastsList = action.payload;
    });
    // if reject then process status is error
    build.addCase(setWeatherForecastsList.rejected, (state, action) => {
      state.process = {
        status: 'error',
        message: action.error.message
      }
    });
    // getWeatherForecastsList
    build.addCase(getWeatherForecastsList.pending, (state, action) => {
      state.process = {
        status: 'loading',
        message: '...',
      };
    });
    build.addCase(getWeatherForecastsList.fulfilled, (state, action) => {
      state.process = {
        status: 'success',
        message: 'update is success',
      };
      state.weatherForecastsList = action.payload;
    });
    // if reject then process status is error
    build.addCase(getWeatherForecastsList.rejected, (state, action) => {
      state.process = {
        status: 'error',
        message: action.error.message
      }
    })
  },
});

export default weatherForecastSlice;

export const setWeatherForecastsList = createAsyncThunk(
  'weatherForecast/setWeatherForecastsList',
  async (locationList, {getState}) => {
    const state = getState();
    // there are user options about language and temperature unit
    const options = `&lang=${state.setting.language.lang}&units=${state.setting.unit}`;
    const weatherForecastsList = [];
    // loop location in location list to call and add weather forecast to weatherForecastsList 
    for (const iterator of locationList) {
      const weatherForecast = await callWeatherForecastAPI(Object.keys(iterator)[0], options);
      weatherForecastsList.push({
        [Object.keys(iterator)[0]] : weatherForecast
      });
    }

    await setAsyncStorage('weatherForecastsList', JSON.stringify(weatherForecastsList));

    return weatherForecastsList
  }
);

export const getWeatherForecastsList = createAsyncThunk(
  'weatherForecast/getWeatherForecastsList',
  async () => {
    const weatherForecastsList = JSON.parse(await getAsyncStorage('weatherForecastsList'));
    if (!weatherForecastsList) {
      weatherForecastsList = [];
    }
    return weatherForecastsList;
  }
)

const callWeatherForecastAPI = async (location, options) => {
  // the paths to call API
  let urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}${options}`;
  let urlHourlyForecast = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}${options}`;
  let urlDailyForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=7&appid=${API_KEY}${options}`;
  // fetch API from OpenWeatherMap
  const currentWeather = await (await fetch(urlCurrentWeather)).json();
  const hourlyForecast = await (await fetch(urlHourlyForecast)).json();
  const dailyForecast = await (await fetch(urlDailyForecast)).json();
  // weatherForecast is object contains all weather forecasts information about location
  const weatherForecast = {
    'currentWeather': currentWeather,
    'hourlyForecast': hourlyForecast,
    'dailyForecast': dailyForecast
  };
  // check value response if cod != 200 then the response may be wrong
  for (const iterator of Object.values(weatherForecast)) {
    if(iterator?.cod != 200) {
      return iterator.message;
    } 
  }
  return weatherForecast
}

export const processSelect = (state) => state.weatherForecast.process;
export const weatherForecastsListSelect = (state) => state.weatherForecast.weatherForecastsList;