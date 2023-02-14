import { Text, View, Image } from 'react-native';
import React from 'react';
import SVG, { Path } from 'react-native-svg';
import { Colors } from '../../Utilities';
import { getTime } from '../../Utilities/Time';
import { useSelector } from 'react-redux';
import { languageSelect } from '../../Redux/Feature/SettingSlice';

const SolarActivityChart = ({
    sunrise,
    sunset,
    viewWidth,
    chartLineColor = Colors.LIGHT_SLATE_GRAY,
    chartBackgroundColor = Colors.WHITE,
    textColor = Colors.LIGHT_SLATE_GRAY,
}) => {
    const viewHeigh = viewWidth * 0.3;
    const chartSize = viewWidth * 0.95;
    let pathIcon = require('../../Utilities/WeatherIcon/Light/Sun.png');
    const language = useSelector(languageSelect);
    // (0;0) : top left conner
    // parabolic top : (3*size/4 ; size/2)
    // parabolic cuts (0; size /2)
    // parabolic has a symmetry axis of x = size/2
    const parabolicEquation = x => {
        const y = x ** 2 * (0.5 / chartSize) - 0.5 * x + chartSize / 2;
        return y;
    };
    // data to draw SVG path
    const parabolicData = `M 0 ${chartSize / 2}, Q ${chartSize / 2} ${chartSize / 4
        }, ${chartSize} ${chartSize / 2}`;

    const currentTime = new Date(Date.now()).getTime();
    // scale the length of the graph based on sunset and sunrise
    const timeLength = (sunset - sunrise) * 1000;
    // x point 
    const solarXPoint = (() => {
        if (currentTime < sunrise * 1000) {
            pathIcon = require('../../Utilities/WeatherIcon/Light/Moon.png');
            return 0;
        } else if (currentTime > sunset * 1000) {
            pathIcon = require('../../Utilities/WeatherIcon/Light/Moon.png');
            return chartSize;
        } else {
            return chartSize * ((currentTime - sunrise * 1000) / timeLength);
        }
    })();
    // y point 
    const solarYPoint = parabolicEquation(solarXPoint);
    return (
        <View
            style={{
                height: viewHeigh,
                width: viewWidth,
                alignItems: 'center',
            }}>
            <View
                style={{
                    height: viewHeigh,
                    width: chartSize,
                    position: 'absolute',
                    backgroundColor: chartBackgroundColor,
                }}>
                    {
                        // chart line
                    }
                <SVG
                    height={chartSize}
                    width={chartSize}
                    style={{
                        position: 'absolute',
                        marginTop: -chartSize / 3,
                    }}>
                    <Path
                        d={parabolicData}
                        stroke={chartLineColor}
                        strokeWidth={2}
                        fill="none"
                    />
                </SVG>
                {
                    // hidden view
                }
                <View
                    style={{
                        height: viewHeigh,
                        width: chartSize - solarXPoint,
                        alignSelf: 'flex-end',
                        backgroundColor: chartBackgroundColor,
                    }}></View>
            </View>
            <View
                style={{
                    height: viewHeigh,
                    width: chartSize,
                    alignItems: 'center',
                }}>
                    {
                        // chart dot is front
                    }
                <SVG
                    height={chartSize}
                    width={chartSize}
                    style={{
                        marginTop: -chartSize / 3,
                    }}>
                    <Path
                        d={parabolicData}
                        stroke={chartLineColor}
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray={'5'}
                        strokeOpacity={0.5}
                    />
                    <View
                        style={{
                            height: chartSize * 0.1,
                            aspectRatio: 1,
                            position: 'absolute',
                            top: solarYPoint,
                            left: solarXPoint,
                            transform: [
                                {
                                    translateY: -chartSize * 0.045,
                                },
                                {
                                    translateX: -chartSize * 0.05,
                                },
                            ],
                        }}>
                        <Image
                            style={{
                                height: '100%',
                                aspectRatio: 1,
                            }}
                            source={pathIcon}></Image>
                    </View>
                </SVG>
            </View>
            <Text
                style={{
                    width: chartSize,
                    fontSize: 13,
                    textAlign: 'left',
                    position: 'absolute',
                    marginTop: chartSize * 0.2,
                    paddingHorizontal: chartSize * 0.05,
                    color: textColor,
                }}>
                {language.lang == 'en' ? 'Sunrise' : 'Bình minh'}{' '}
                {getTime(sunrise * 1000, false)}
            </Text>
            <Text
                style={{
                    width: chartSize,
                    fontSize: 13,
                    textAlign: 'right',
                    position: 'absolute',
                    marginTop: chartSize * 0.2,
                    paddingHorizontal: chartSize * 0.05,
                    color: textColor,
                }}>
                {language.lang == 'en' ? 'Sunset' : 'Hoàng hôn'}{' '}
                {getTime(sunset * 1000, false)}
            </Text>
        </View>
    );
};

export default SolarActivityChart;
