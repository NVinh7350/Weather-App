import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, screenHeight, screenWidth } from '../../Utilities'

const SummaryCard = ({}) => {
  return (
    <View style={ styles.container }>
        <View style={ styles.temperatureContainer }>
            <Text style={ styles.numberText }>-66</Text>
            <Text style={ styles.unitText }>ºC</Text>
        </View>
        <Text style={ styles.describeText }>Patchy freezing drizzle possible</Text>
    </View>
  )
}

export default SummaryCard

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.25,
        width: screenWidth * 0.6,
        alignItems:'center',
    },
    temperatureContainer: {
        height: screenHeight * 0.17,
        flexDirection: 'row',
        justifyContent:'center',
    },
    numberText: {
        fontSize: 110,
        textAlign: 'center',
        letterSpacing: -5,
        color: Colors.WHITE
    },
    unitText : {
        fontSize: 20,
        marginTop:30,
        fontWeight: 'bold',
        color: Colors.WHITE
    },
    describeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.WHITE
    }
})