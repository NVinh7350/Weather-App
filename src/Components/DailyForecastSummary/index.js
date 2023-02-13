import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import weatherForecastSlice, {
    weatherForecastsListSelect,
} from '../../Redux/Feature/WeatherForecastSlice';
import { Colors, screenHeight, screenWidth } from '../../Utilities';
import { languageSelect } from '../../Redux/Feature/SettingSlice';
import { iconIdLight } from '../../Utilities/WeatherIcon';
import ReactNativeMarquee from 'react-native-marquee';
import { useNavigation } from '@react-navigation/native';
import { getDate } from '../../Utilities/Time';

const DailyForecastSummary = ({ location }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [dailyForecast, setDailyForecast] = useState([]);
    const [threeDayForecast, setThreeDayForecast] = useState([]);

    const weatherForecastsList = useSelector(weatherForecastsListSelect);
    const language = useSelector(languageSelect);

    useEffect(() => {
        setDailyForecast(() => {
            // get daily forecasts of the location
            for (const iterator of weatherForecastsList) {
                if (iterator?.location?.name == location?.name) {
                    const dailyForecastList =
                        iterator?.weatherForecast?.dailyForecast?.list;
                    // get three day forecast for flatlist
                    setThreeDayForecast([
                        dailyForecastList[0],
                        dailyForecastList[1],
                        dailyForecastList[2],
                    ]);
                    return dailyForecastList;
                }
            }
            return null;
        });
    }, [weatherForecastsList]);

    const ThreeDayForecastItem = ({ item }) => {
        const description = `${getDate(item.dt * 1000, language.lang)}∙${item.weather[0].description
            }`;
        const temperature = `${Math.round(item.temp.max)}°/ ${Math.round(
            item.temp.min,
        )}°`;
        const pathIcon = iconIdLight(`${item.weather[0].id}`);
        return (
            <View style={styles.itemFlatListContainer}>
                <View style={styles.iconContainer}>
                    <Image style={styles.iconImage} source={pathIcon}></Image>
                </View>
                <View style={styles.descriptionContainer}>
                    {/*
                    use to string run when string is long
                */}
                    <ReactNativeMarquee
                        style={styles.descriptionText}
                        marqueeOnStart={true}
                        loop={true}
                        delay={1000}
                        speed={1}>
                        {description}
                    </ReactNativeMarquee>
                </View>
                <Text style={styles.temperatureText}>{temperature}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.flatList}>
                {threeDayForecast.map((item, index) => (
                    <ThreeDayForecastItem key={index} item={item} />
                ))}
            </View>
            <TouchableOpacity
                style={styles.detailButton}
                onPress={() => {
                    // set dailyForecast of current location and navigation to screen detail
                    dispatch(
                        weatherForecastSlice.actions.setDailyForecastDetail(dailyForecast),
                    );
                    navigation.navigate('DailyForecast');
                }}>
                <Text style={styles.detailButtonTitle}>
                    {language.language == 'en' ? '5 days forecasts' : 'Dự báo 5 ngày'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DailyForecastSummary;

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.3,
        paddingHorizontal: screenWidth * 0.05,
        justifyContent: 'space-evenly',
    },
    flatList: {
        height: screenHeight * 0.18,
    },
    detailButton: {
        height: screenHeight * 0.06,
        borderRadius: 40,
        backgroundColor: Colors.BABY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailButtonTitle: {
        fontSize: 17,
        color: Colors.WHITE,
    },
    itemFlatListContainer: {
        height: screenHeight * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        aspectRatio: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconImage: {
        height: '80%',
        width: '80%',
    },
    descriptionContainer: {
        flex: 5,
    },
    descriptionText: {
        fontSize: 17,
        color: Colors.WHITE,
        textAlign: 'left',
        borderColor: 'blue',
    },
    temperatureText: {
        flex: 2,
        fontSize: 20,
        color: Colors.WHITE,
        textAlign: 'right',
    },
});
