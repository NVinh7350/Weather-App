import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
    setAsyncStorage,
    getAsyncStorage,
    clearAsyncStorage,
} from '../../Storage';
import { API_KEY, LANGUAGE, UNIT } from '../../Utilities/Constant';

const initialState = {
    process: {
        status: 'idle',
        message: '',
    },
    language: LANGUAGE.VietNamese,
    unit: UNIT.Celsius,
};


const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setProcessStatus: (state, action) => {
            state.process.status = action.payload;
        },
    },
    extraReducers: build => {
        // setLanguage states
        build.addCase(setLanguage.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...',
            };
        });
        build.addCase(setLanguage.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'update language is success',
            };
            state.language = action.payload;
        });
        build.addCase(setLanguage.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        });
        // getLanguage states
        build.addCase(getLanguage.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...',
            };
        });
        build.addCase(getLanguage.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'update language is success',
            };
            state.language = action.payload;
        });
        build.addCase(getLanguage.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        });
        // setUnit states
        build.addCase(setUnit.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...',
            };
        });
        build.addCase(setUnit.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'update language is success',
            };
            state.unit = action.payload;
        });
        build.addCase(setUnit.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        });
        // getUnit states
        build.addCase(getUnit.pending, (state, action) => {
            state.process = {
                status: 'loading',
                message: '...',
            };
        });
        build.addCase(getUnit.fulfilled, (state, action) => {
            state.process = {
                status: 'success',
                message: 'update language is success',
            };
            state.unit = action.payload;
        });
        build.addCase(getUnit.rejected, (state, action) => {
            state.process = {
                status: 'error',
                message: action.error.message
            }
        });
    },
});

export default settingSlice;

// set language to AsyncStorage
export const setLanguage = createAsyncThunk(
    'setting/setLanguage',
    async settingData => {
        await setAsyncStorage('language', JSON.stringify(settingData));
        return settingData;
    }
)
// get language to AsyncStorage
export const getLanguage = createAsyncThunk(
    'setting/getLanguage',
    async () => {
        const language = JSON.parse(await getAsyncStorage('language'));
        // if storage is cleared or first install then return default language 
        if (!language) {
            return LANGUAGE.VietNamese;
        }
        return language;
    }
)
// set unit to AsyncStorage
export const setUnit = createAsyncThunk(
    'setting/setUnit',
    async settingData => {
        await setAsyncStorage('unit', JSON.stringify(settingData));
        return settingData;
    }
)
// get unit to AsyncStorage
export const getUnit = createAsyncThunk(
    'setting/getUnit',
    async () => {
        const unit = JSON.parse(await getAsyncStorage('unit'));
        // if storage is cleared or first install then return default unit 
        if (!unit) {
            return UNIT.Celsius;
        }
        return unit;
    }
)

export const processSelect = (state) => state.setting.process;
export const languageSelect = (state) => state.setting.language;
export const unitSelect = (state) => state.setting.unit;
