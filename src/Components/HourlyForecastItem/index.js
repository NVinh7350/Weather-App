import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, screenHeight, screenWidth } from '../../Utilities'
import { useSelector } from 'react-redux';
import { languageSelect } from '../../Redux/Feature/SettingSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { iconId } from '../../Utilities/WeatherIcon';

const HourlyForecastItem = ({ item }) => {
    const windDeg = `${item.wind.deg}deg`;
    const windSpeed = `${item.wind.speed}km/h`
    const language = useSelector(languageSelect).lang;
    // time variables use to determine Night, Day
    const currentTime = new Date(Date.now()).getHours();
    const itemTime = new Date(item.dt_txt).getHours();
    const sunsetTime = new Date(item.sunset * 1000);
    const sunriseTime = new Date(item.sunrise * 1000);
    // set pathIcon of item
    const pathIcon = itemTime >= sunsetTime.getHours() || itemTime < sunriseTime.getHours() ?
        iconId(`${item.weather[0].id}n`) : iconId(`${item.weather[0].id}`)



    let temperature = `${Math.round(item.main.temp)}º`;
    let timeString = '';
    switch (itemTime) {
        case sunriseTime.getHours():
            timeString = `${sunriseTime.getHours().toString().padStart(2, 0)}:${sunriseTime.getMinutes()}`;
            temperature = language == 'en' ? 'Sunrise' : 'Bình minh';
            break;
        case sunsetTime.getHours():
            timeString = `${sunsetTime.getHours().toString().padStart(2, 0)}:${sunsetTime.getMinutes()}`;
            temperature = language == 'en' ? 'Sunset' : 'Hoàng hôn';
            break;
        case currentTime:
            timeString = language == 'Current' ? 'Sunset' : 'Bây giờ';
            break;
        default:
            timeString = `${itemTime.toString().padStart(2, 0)}:00`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{timeString}</Text>
            <Text style={styles.temperatureText}> {temperature}</Text>
            <View style={styles.iconContainer}>
                <Image
                    style={styles.iconImage}
                    source={pathIcon}
                ></Image>
            </View>
            <View style={styles.windContainer}>
                <Icon
                    style={[styles.windDeg, { transform: [{ rotate: windDeg }] }]}
                    name='navigation'
                />
                <Text style={styles.windText}>{windSpeed}</Text>
            </View>
        </View>
    )
}

export default HourlyForecastItem

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.13,
        width: screenWidth * 0.24,
        marginLeft: screenWidth * 0.02,
    },
    timeText: {
        flex: 2,
        fontSize: 13,
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
    },
    temperatureText: {
        flex: 3,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.WHITE,
    },
    iconContainer: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
    },
    iconImage: {
        height: 40,
        aspectRatio: 1,
    },
    windContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    windDeg: {
        flex: 1,
        textAlign: 'center',
        color: Colors.WHITE
    },
    windText: {
        flex: 4,
        fontSize: 13,
        color: Colors.LIGHT_GRAY,
    }

})