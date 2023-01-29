import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "./Feature/WeatherForecastSlice";
export const store = configureStore({
  reducer: {
    weatherForecast : weatherForecastSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})