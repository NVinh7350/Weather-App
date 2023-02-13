import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { dailyForecastDetailSelect } from '../../Redux/Feature/WeatherForecastSlice';
import { LineChart } from 'react-native-chart-kit';
import { Colors, screenHeight, screenWidth } from '../../Utilities';
import { languageSelect } from '../../Redux/Feature/SettingSlice';
import { getDate, getDay } from '../../Utilities/Time';
import { iconIdDark } from '../../Utilities/WeatherIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailCard from '../DetailCard';

const TimeItem = ({ item }) => {
    const language = useSelector(languageSelect);
    const date = getDate(item.dt * 1000, language.lang);
    const day = getDay(item.dt * 1000);
    const pathIcon = iconIdDark(`${item.weather[0].id}`);

    return (
        <View style={styles.timeItemContainer}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.dayAndMonthText}>{day}</Text>
            <Image style={styles.iconImage} source={pathIcon}></Image>
        </View>
    );
};

const TemperatureChart = ({ item }) => {
    let dotIndex = 0;
    const temperatureMaxList = item.map(e => Math.round(e.temp.max));
    const temperatureMinList = item.map(e => Math.round(e.temp.min));
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: temperatureMaxList,
                color: (opacity = 1) => Colors.RED,
            },
            {
                data: [Math.max(...temperatureMaxList) + 5],
                withDots: false,
            },
            {
                data: temperatureMinList,
                color: (opacity = 1) => Colors.BLUE,
            },
            {
                data: [Math.min(...temperatureMinList) - 5],
                withDots: false,
            },
        ],
    };
    const chartConfig = {
        backgroundGradientFrom: Colors.WHITE,
        backgroundGradientTo: Colors.WHITE,
        color: () => Colors.BLACK,
        strokeWidth: 2, // optional, default 3
    };
    return (
        <LineChart
            style={styles.temperatureChart}
            data={data}
            width={screenWidth * 1.5}
            height={screenHeight * 0.25}
            chartConfig={chartConfig}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withShadow={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            withScrollableDot={false}
            renderDotContent={({ x, y, index, indexData }) => {
                dotIndex += 1;
                return (
                    <View key={x + y + index}>
                        <Text
                            key={dotIndex}
                            style={{
                                position: 'absolute',
                                top: dotIndex < 8 ? y - 30 : y + 10,
                                left: x - 12,
                                fontSize: 15,
                                color: dotIndex < 8 ? Colors.RED : Colors.BLUE,
                            }}>
                            {indexData}
                        </Text>
                    </View>
                );
            }}
        />
    );
};

const WindItem = ({ item }) => {
    const windDeg = `${item?.deg}deg`;
    const windSpeed = `${item?.speed}km/h`;

    return (
        <View style={styles.windItemContainer}>
            <Icon
                style={[styles.windDeg, { transform: [{ rotate: windDeg }] }]}
                name="navigation"
            />
            <Text style={styles.windText} numberOfLines={1} ellipsizeMode="tail">
                {windSpeed}
            </Text>
        </View>
    );
};

const ScrollButtonItem = ({ isSelected, setSelectItem }) => {
    return (
        <TouchableWithoutFeedback onPress={setSelectItem}>
            <View
                style={[
                    styles.scrollButtonItemContainer,
                    {
                        backgroundColor: isSelected ? Colors.GRAY : Colors.WHITE,
                        borderRadius: isSelected ? 20 : 0,
                        opacity: 0.2,
                    },
                ]}></View>
        </TouchableWithoutFeedback>
    );
};

const DailyForecastDetail = () => {
    const dailyForecastDetail = useSelector(dailyForecastDetailSelect);
    const [selectItem, setSelectItem] = useState(0);
    return (
        <View style={styles.container}>
            <View style={styles.scrollViewContainer}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <View style={styles.scrollItemListContainer}>
                        <View style={styles.timeListContainer}>
                            {dailyForecastDetail.map((item, index) => (
                                <TimeItem item={item} key={index} />
                            ))}
                        </View>
                        <TemperatureChart item={dailyForecastDetail} />
                        <View style={styles.windListContainer}>
                            {dailyForecastDetail.map((item, index) => (
                                <WindItem item={item} key={index} />
                            ))}
                        </View>
                        <View style={styles.scrollButtonListContainer}>
                            {dailyForecastDetail.map((_, index) => (
                                <ScrollButtonItem
                                    key={index}
                                    isSelected={selectItem == index}
                                    setSelectItem={() => {
                                        setSelectItem(index);
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <DetailCard item={dailyForecastDetail[selectItem]}/>
        </View>
    );
};

export default DailyForecastDetail;

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.8,
    },
    scrollViewContainer: {
        height: screenHeight * 0.4,
    },
    scrollItemListContainer: {
        flexDirection: 'column',
        width: screenWidth * 1.4,
    },
    temperatureChart: {
        height: screenHeight * 0.2,
        paddingRight: screenWidth * 0.1,
    },
    timeListContainer: {
        height: screenHeight * 0.115,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeItemContainer: {
        height: screenHeight * 0.1,
        width: screenWidth * 0.2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 15,
        color: Colors.DARK_BLUE,
    },
    dayAndMonthText: {
        fontSize: 13,
        color: Colors.DARK_GRAY,
    },
    iconImage: {
        height: screenHeight * 0.04,
        aspectRatio: 1,
    },
    windListContainer: {
        height: screenHeight * 0.05,
        flexDirection: 'row',
    },
    windItemContainer: {
        height: screenHeight * 0.075,
        width: screenWidth * 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    windDeg: {
        color: Colors.BLACK,
    },
    windText: {
        fontSize: 12,
        maxWidth: screenWidth * 0.16,
        color: Colors.DARK_GRAY,
    },
    scrollButtonListContainer: {
        height: screenHeight * 0.4,
        width: screenWidth * 1.4,
        flexDirection: 'row',
        position: 'absolute',
    },
    scrollButtonItemContainer: {
        height: screenHeight * 0.4,
        width: screenWidth * 0.2,
    },
});
