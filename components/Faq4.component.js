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
                <Text style={styles.heading}>JUPEB REGISTRATION PROCEDURES</Text>
                
                <View style={styles.p}>
                    <Text style={styles.text}>
                        The registration process for the JUPEB program is very simple and we are going to put through the process.  If you are yet to apply for the program and you do not know the steps to follow, we will be showing you two ways you can apply for JUPEB admission without stress.
                    </Text>
                </View>
              </ScrollView>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Faq2