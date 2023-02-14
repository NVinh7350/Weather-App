import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, screenHeight, screenWidth } from '../../Utilities';
import SolarActivityChart from '../SolarActivityChart';
import { useSelector } from 'react-redux';
import { languageSelect } from '../../Redux/Feature/SettingSlice';

const DetailCard = ({item}) => {
    const language = useSelector(languageSelect);
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <SolarActivityChart
                    sunrise={item?.sys?.sunrise * 1000}
                    sunset={item?.sys?.sunset * 1000} 
                    viewWidth={screenWidth * 0.85}
                    chartLineColor={Colors.LIGHT_GRAY}
                    chartBackgroundColor={Colors.BABY_BLUE}
                    textColor={Colors.LIGHT_GRAY}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Feel like': 'Cảm giác như'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.main?.feels_like)}°`}</Text>
                </View>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Visibility': 'Tầm nhìn xa'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.visibility/1000)}km`}</Text>
                </View>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Wind speed': 'Tốc độ gió'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.wind?.speed*3.6)}km/h`}</Text>
                </View>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Humidity': 'Độ ẩm'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.main?.humidity)}%`}</Text>
                </View>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Pressure': 'Áp suất'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.main?.pressure)}mbar`}</Text>
                </View>
                <View style={styles.infoItemContainer}>
                    <Text style={styles.labelText}>{language.lang == 'en'? 'Clouds': 'Độ che phủ'}</Text>
                    <Text style={styles.contentText}>{`${Math.round(item?.clouds?.all)}%`}</Text>
                </View>
            </View>
        </View>
    );
};

export default DetailCard;

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.4,
        width: screenWidth * 0.9,
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:Colors.BABY_BLUE,
    },
    chartContainer: {
        height: screenHeight * 0.16,
        width: screenWidth * 0.85,
        justifyContent:'center',
        alignItems:'center',
    },
    infoContainer: {
        height: screenHeight * 0.23,
        width: screenWidth * 0.85,
        flexWrap: 'wrap',
    },
    infoItemContainer: {
        height: screenHeight * 0.23 * 0.33,
        width: screenWidth * 0.85 * 0.5,
        justifyContent:'center',
        paddingHorizontal: screenWidth * 0.05
    },
    labelText: {
        fontSize: 13,
        color:Colors.WHITE,
        opacity:0.5
    },
    contentText: {
        fontSize: 20,
        color:Colors.WHITE,
    }
});
