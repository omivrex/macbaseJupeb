import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    SafeAreaView
  } from 'react-native';
  import {useContext} from 'react';
  
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import ColorContext from '../context/Colors.context';
  
  const Faq3 = () => {
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
                <Text style={styles.heading}>How do I keep track of my Progress?</Text>
                <Text style={styles.text}>
                    Once you have viewed a video or listened to an audio recording, a blue bullet appears next to that item in the context menu. This provides a convenient record of your progress.
                </Text>
                <Text style={styles.text}>
                    <Text style={{fontWeight: 'bold'}}>Note:</Text> if you are using the web-based application, your past scores will be lost if you delete cookies in your browser.
                </Text>
              </ScrollView>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Faq3