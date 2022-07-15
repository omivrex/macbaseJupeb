import { View, Text, TouchableHighlight } from "react-native"
import { StyleSheet } from "react-native"
import { Entypo } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
import { useContext } from "react";

const Header = ({title, navigation}) => {
  const colors = useContext(ColorContext)
  const styles = StyleSheet.create({
      header: {
          backgroundColor: colors.appColor,
          width: wp('100%'),
          height: hp('20%'),
          alignContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
      },
  
      iconWrapper: {
          width: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          alignItems: 'center',
  
      },
  
      headerText: {
          color: colors.defaultText,
          alignSelf: 'center',
          width: '85%',
          right: '5%',
          textAlign: 'center',
          fontSize: hp('3%')
      }
  })

  return (
    <View style={styles.header}>
        <TouchableHighlight underlayColor={colors} onPress={()=> navigation.openDrawer()} style={styles.iconWrapper}>
            <Entypo name="menu" size={24} style={styles.menuIcon} color="#fff" />
        </TouchableHighlight>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}


export default Header