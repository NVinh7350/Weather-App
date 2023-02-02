import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PermissionsAndroid } from 'react-native';
import {
    setAsyncStorage,
    getAsyncStorage,
    clearAsyncStorage,
} from '../../Storage';
import Geolocation from '@react-native-community/geolocation';
import { API_KEY } from '../../Utilities/Constant';
import { CITY } from '../../Utilities/Geographic';
const initialState = {
    process: {
        status: 'idle',
        message: '',
    },
    currentLocation: {},
    addedLocations: [],
    searchedLocations: []
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setProcessStatus: (state, action) => {
            state.process.status = action.payload;
        },
    },
    extraReducers: (build) => {
        // FindCurrentLocation cases
        build.addCase(findCurrentLocation.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...'
            }
        });
        build.addCase(findCurrentLocation.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'current location is found'
            };
            state.currentLocation = action.payload
        });
        build.addCase(findCurrentLocation.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        }),
            // FindLocationByName cases
            build.addCase(findLocationByName.pending, (state, action) => {
                state.process = {
                    status: 'loading',
                    message: '...'
                }
            });
        build.addCase(findLocationByName.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'search location is found'
            };
            state.searchedLocations = action.payload;
        });
        build.addCase(findLocationByName.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        });
        // Set & Get the added locations in AsyncStorage
        build.addCase(setAddedLocations.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...'
            }
        });
        build.addCase(setAddedLocations.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'set successfully the added locations'
            };
            state.addedLocations = action.payload;
        });
        build.addCase(setAddedLocations.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            };
        });
        build.addCase(getAddedLocations.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...'
            }
        });
        build.addCase(getAddedLocations.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'get successfully the added locations'
            };
            state.addedLocations = action.payload;
        });
        build.addCase(getAddedLocations.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            };
        });

    }
});

export default locationSlice;

// request Location Permission
const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted;
    } catch (err) {
        console.warn(err);
    }
};

// get longitude and latitude by Geolocation API, and use to take location information by OpenWeatherMap API 
export const findCurrentLocation = createAsyncThunk(
    'location/findCurrentLocation',
    async () => {
        let currentLocation = {
            "name": "Duy Xuyên District",
            "local_names": { "ko": "즈이쑤옌현", "vi": "Huyện Duy Xuyên", "zh": "潍川县", "en": "Duy Xuyên District" },
            "lat": 15.7928895,
            "lon": 108.1605745130791,
            "country": "VN",
            "state": "Quang Nam Province"
        };
        // if location permission is negative, return location default (my home :))) )
        if (await requestLocationPermission() != PermissionsAndroid.RESULTS.GRANTED) {
            return currentLocation;
        } else {
            const optionGeolocation = {
                timeout: 30000, // 30 second
                enableHighAccuracy: true //set true to use GPS, false to use Wifi
            }
            const currentPosition = await (new Promise((resolve, reject) => {
                // use Geolocation API to take longitude and latitude
                Geolocation.getCurrentPosition(resolve, reject, optionGeolocation)
            }))
            const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${currentPosition?.coords?.latitude}&lon=${currentPosition.coords?.longitude}&limit=1&appid=${API_KEY}`
            currentLocation = ((await fetch(url)).json());
            return currentLocation;
        }

    }
)

// find the searched location list by city name
// is a list of cities already listed in the Geographic folder
export const findLocationByName = createAsyncThunk(
    'location/findLocationByName',
    async (searchName) => {
        let searchedResultList = [];
        if (searchName) {
            CITY.forEach(element => {
                const reg = new RegExp(searchName, 'g')
                // maximum 5 result on one find
                if (searchedResultList.length >= 5) {
                    return;
                }
                // result is push on searchResultList, matching with searchName
                else if (Object.keys(element)[0].match(reg)) {
                    searchedResultList.push(element)
                }
            });
        }
        return searchedResultList;
    }
)

// get the added location in AsyncStorage 
export const getAddedLocations = createAsyncThunk('location/getAddedLocations',
    async () => {
        const addedLocations = JSON.parse(await getAsyncStorage('addedLocations'));
        if (addedLocations) {
            return addedLocations;
        }
        else {
            // return an empty array because to add an new element to the array, not to an null 
            return [];
        }

    }
)

// set the added locations in AsyncStorage
export const setAddedLocations = createAsyncThunk('location/setAddedLocations',
    async (newLocation, { getState }) => {
        const state = getState();
        const currentAddedLocations = state.location.addedLocations;
        let newAddedLocations = [];
        // If newLocation is already in addedLocations, remove it, otherwise add
        if (currentAddedLocations.includes(newLocation)) {
            newAddedLocations = currentAddedLocations.filter(e => JSON.stringify(e) != JSON.stringify(newLocation));
        } else {
            newAddedLocations = [...currentAddedLocations, newLocation];
        }
        // save new addedLocations in AsyncStorage
        await setAsyncStorage('addedLocations', JSON.stringify(newAddedLocations));
        return newAddedLocations;
    }
)

export const currentLocationSelect = (state) => state.location.currentLocation
export const searchedLocationsSelect = (state) => state.location.searchedLocations
export const addedLocationsSelect = (state) => state.location.addedLocations
