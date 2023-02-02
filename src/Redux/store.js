import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "./Feature/WeatherForecastSlice";
import settingSlice from "./Feature/SettingSlice";
import locationSlice from "./Feature/LocationSlice";
export const store = configureStore({
  reducer: {
    weatherForecast: weatherForecastSlice.reducer,
    setting: settingSlice.reducer,
    location: locationSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})