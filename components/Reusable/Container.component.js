import { 
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform
} from 'react-native';
import {useContext} from 'react';
import Svg, { Path } from "react-native-svg"
import ColorContext from '../context/Colors.context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
  
  const Container = ({children}) => {
    const colors = useContext(ColorContext)
  
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: colors.backgroundMix,
        
      },

      curveWrapper: {
        flexWrap: 'nowrap',
        width: wp('100%'),
        height: hp('35%'),
        position: 'absolute',
      },
      
      fill: {
        backgroundColor: colors.appColor,
        width: '100%',
        height: '90%',
        margin: 0
      },

      curve: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        // backgroundColor: 'red'
      },
      
      inward: {
        alignSelf: 'flex-end',
        height: '60%',
        width: '100%',
        left: '-17.5%',
        top: '3%',
        borderTopLeftRadius:2500,
        backgroundColor: colors.backgroundColor
      }
    })
  
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={-50} behavior={Platform.OS === "ios" ? "padding" : "position"}>
        <SafeAreaView style={styles.container}>
          <View style={styles.curveWrapper}>
            <View style={styles.fill}></View>
            <Svg style={styles.curve} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <Path
                fill={colors.appColor}
                d="m0 224 48-5.3c48-5.7 144-15.7 240-21.4 96-5.3 192-5.3 288-32C672 139 768 85 864 74.7c96-10.7 192 21.3 288 48 96 26.3 192 48.3 240 58.6l48 10.7V0H0Z"
              />
            </Svg>
          </View>
            {children}
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
  
  
  export default Container