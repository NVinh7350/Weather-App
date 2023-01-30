import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "./Feature/WeatherForecastSlice";
import settingSlice from "./Feature/SettingSlice";
export const store = configureStore({
  reducer: {
    weatherForecast: weatherForecastSlice.reducer,
    setting: settingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})