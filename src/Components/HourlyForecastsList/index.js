import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { weatherForecastsListSelect } from '../../Redux/Feature/WeatherForecastSlice';
import { screenHeight } from '../../Utilities';
import HourlyForecastItem from '../HourlyForecastItem';

const HourlyForecastsList = ({ location }) => {
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const weatherForecastsList = useSelector(weatherForecastsListSelect);

  useEffect(() => {
    setHourlyForecasts(() => {
      // get hourly forecasts of the location
      for (const iterator of weatherForecastsList) {
        if (iterator?.location?.name == location?.name) {
          const current = Date.now();
          // get a list includes 24 hours;
          return iterator?.weatherForecast?.hourlyForecast?.list
            .filter(element => {
              const elementTime = new Date(element.dt_txt)
              return (elementTime - current >= -3599000 && elementTime - current <= 82800000) 
            })
            .map(element => {
              return{
                "sunrise": iterator.weatherForecast.hourlyForecast.city.sunrise,
                "sunset": iterator.weatherForecast.hourlyForecast.city.sunset,
                ...element
              }
            })
        }
      }
      return null;
    })
  }, [weatherForecastsList])
  return (
    <FlatList
      style={styles.container}
      data={hourlyForecasts}
      renderItem={({ item }) => <HourlyForecastItem item={item}></HourlyForecastItem>}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
    </FlatList>
  )
}

export default HourlyForecastsList

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.14,
  },
})