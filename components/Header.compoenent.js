import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
import { Dimensions } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const window = Dimensions.get('window')
const Header = ({title}) => {
  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1c1c74',
        // borderBottomLeftRadius: 85,
        // borderBottomRightRadius: 85,
        width: wp('100%'),
        height: hp('10%'),
        // position: 'absolute',
        // top: 20,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        color: '#eee',
        textAlign: 'center',
        fontSize: hp('3%')
    }
})

export default Header