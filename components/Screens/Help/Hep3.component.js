import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {useContext} from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../../context/Colors.context';

const Hep3 = () => {
  const colors = useContext(ColorContext)

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#1c1c74',

    },
    
    curve: {
      backgroundColor: colors.backgroundColor,
      borderBottomRightRadius: 2500,
      width: '100%',
      height: '70%',
      position: 'absolute',
    },
  
    wraper: {
      width: wp('95%'),
      height: '100%',
      padding: 25,
      left: wp('2.5%'),
      overflow: 'scroll',
      backgroundColor: colors.backgroundColor,
    },

    heading: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'center'
    },
          
    text: {
      margin: '2.5%'
    }
  
  })

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.curve}>
        </View>
          <View style={styles.contentList}>
            <ScrollView style={styles.wraper}>
              <Text style={styles.heading}>
                  Can I access this app on multiple devices?
              </Text>
              <Text style={styles.text}>
                  The Macbase Educational Jupeb app is available in iOS format (in the iTunes Store, for iPhone and iPad) and for Android (in the Google Play Stores). It is also available on the web (www.Macbaze.com) as an online application.
              </Text>
              <Text style={styles.text}>
                  However, note that if you access the app on different platforms, your progress will not be synced across devices.
              </Text>
            </ScrollView>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default Hep3