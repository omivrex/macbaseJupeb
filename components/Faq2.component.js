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
                <Text style={styles.heading}>WHAT IS JUPEB?</Text>
                
                <View style={styles.p}>
                    <Text style={styles.text}>
                        It is the acronym for <Text style={styles.bolded}>Joint University Preliminary Examination Board</Text>, it is a newly Approved, Proven, and Certified Advanced Level examination body established and coordinated by the University of Lagos. the program is similar to the interim joint matriculation Board (IJMB) coordinated by Ahmadu Bello University. It has a coordinating body in various tertiary institutions and different affiliated study centers nationwide. The program is specifically for candidates who cannot gain admission to regular degree programs in Nigerian Universities for one reason or the other, as the program only requires candidates' o’level results, also awaiting results candidates can Enroll.
                    </Text>
                </View>

                <View style={styles.p}>
                    <Text style={styles.text}>
                        <Text style={styles.bolded}>Approved:</Text> By the Federal Government has a platform for securing admission into higher institutions in the country and abroad.
                    </Text>
                </View>

                <View style={styles.p}>
                    <Text style={styles.text}>
                        <Text style={styles.bolded}>Proven:</Text> Yearly, about 20,000 applicants put in for the program in which more than 70% fraction successfully secure admission with it into 200 level to their preferred institution and course of study.
                    </Text>
                </View>
                
                <View style={styles.p}>
                    <Text style={styles.text}>
                        <Text style={styles.bolded}>Certified:</Text> By Nigeria University Commission (NUC) has an Advanced level examination that qualifies students for 200level via Direct Entry.
                    </Text>
                </View>
              </ScrollView>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  
  
  export default Faq2