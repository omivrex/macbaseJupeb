import { View, Text, TouchableHighlight } from "react-native"
import { StyleSheet } from "react-native"
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = ({title, navigation}) => {
  return (
    <View style={styles.header}>
        <TouchableHighlight onPress={()=> navigation.openDrawer()} style={styles.iconWrapper}>
            <Entypo name="menu" size={24} style={styles.menuIcon} color="#fff" />
        </TouchableHighlight>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1c1c74',
        width: wp('100%'),
        height: hp('10%'),
        alignContent: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },

    iconWrapper: {
        width: '10%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',

    },

    headerText: {
        color: '#eee',
        alignSelf: 'center',
        width: '90%',
        textAlign: 'center',
        fontSize: hp('3%')
    }
})

export default Header