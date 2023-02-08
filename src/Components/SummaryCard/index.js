import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, screenHeight, screenWidth } from '../../Utilities'
import { useSelector } from 'react-redux'
import { weatherForecastsListSelect } from '../../Redux/Feature/WeatherForecastSlice'
import { unitSelect } from '../../Redux/Feature/SettingSlice'

const SummaryCard = ({ location }) => {
    const [currentWeather, setCurrentWeather] = useState({});

    const unitTemperature = useSelector(unitSelect);
    const weatherForecastsList = useSelector(weatherForecastsListSelect);

    useEffect(() => {
        setCurrentWeather(() => {
            for (const iterator of weatherForecastsList) {
                if (iterator?.location?.name == location?.name) {
                    return iterator.weatherForecast.currentWeather;
                }
            }
            return null;
        })
    }, [weatherForecastsList])

    return (
        <View style={styles.container}>
            <View style={styles.temperatureContainer}>
                <Text style={styles.numberText}>
                    {Math.round(currentWeather?.main?.temp)}
                </Text>
                <Text style={styles.unitText}>
                    {`º${unitTemperature == 'metric' ? 'C' : 'F'}`}
                </Text>
            </View>
            <Text style={styles.describeText}>
                {Array.isArray(currentWeather?.weather) ? currentWeather?.weather[0]?.description : ''}
            </Text>
        </View>
    )
}

export default SummaryCard

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.25,
        width: screenWidth * 0.6,
        alignItems: 'center',
    },
    temperatureContainer: {
        height: screenHeight * 0.17,
        width: screenWidth * 0.6,
        flexDirection: 'row',
    },
    numberText: {
        flex: 3,
        fontSize: 110,
        textAlign: 'right',
        letterSpacing: -5,
        color: Colors.WHITE,
    },
    unitText: {
        flex: 1,
        fontSize: 20,
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.WHITE,

    },
    describeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.WHITE,
    }
})