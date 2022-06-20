import { 
  StyleSheet, 
  View,
  SafeAreaView
} from 'react-native';
import {useContext} from 'react';
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
        backgroundColor: colors.backgroundColor,
        
      },

      curveWrapper: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: wp('100%'),
        height: hp('65%'),
        position: 'absolute',
      },
      
      curve1: {
        backgroundColor: colors.appColor,
        borderBottomRightRadius: 2500,
        width: '85%',
        height: '85%'
      },

      curve2: {
        backgroundColor: colors.appColor,
        width: '75%',
        height: '100%',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        // transform: [{ rotate: '-75deg'}],
        left: '-27%',
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
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.curveWrapper}>
            <View style={styles.curve1}>
            </View>
            <View style={styles.curve2}>
              <View style={styles.inward}></View>
            </View>
          </View>
            {children}
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Container