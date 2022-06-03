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
  
  const Faq2 = () => {
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

      p: {
        width: '100%',
        // paddingBottom: '5%',
        marginBottom: hp('5%')
      },

      heading: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center'
      },
            
      text: {
        margin: '2.5%'
      },

      bolded: {
        fontWeight: '800'
      }
    
    })
  
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.curve}>
          </View>
            <View style={styles.contentList}>
              <ScrollView style={styles.wraper}>
                <Text style={styles.heading}>WHEN JUPEB RESUMPTION DATE AND DURATION?</Text>
                
                <View style={styles.p}>
                    <Text style={styles.text}>
                        The resumption date for registered JUPEB candidates is usually August/September yearly. The program runs for 10 months and ends in June/July the following year. Prior to the resumption, candidates who are interested in staying in the school hostel to apply as soon as possible.
                        Also, be informed that the resumption date varies for all institutions running the program. If you are not sure of the specific date, kindly contact us now.
                    </Text>
                </View>
              </ScrollView>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Faq2