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

const AboutScreen = () => {
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
    }
  
  })

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.curve}>
        </View>
          <View style={styles.contentList}>
            <ScrollView style={styles.wraper}>
              <View style={styles.p}>
                <Text style={styles.text}>
                  Welcome to the Macbase Educational Jupeb app
                  from Macbase Professional! This is your one-stop
                  store of value for Jupeb with great content to build your skills,
                  whether you are learning by yourself or studying for class. Designed by
                  our expert authors and programmers, these bonus learning tools,
                  practical questions with solutions, and a grade point calculator 
                  are perfect for studying on the go!
                </Text>
              </View>

              <View style={styles.p}>
                <Text style={styles.heading}>Who We Are?</Text>
                <Text style={styles.text}>
                  Macbase is a Multi-educational resource designed
                  to solve academic problems faced by aspirants to
                  several secondary and tertiary institutions in 
                  Nigeria.
                </Text>
                <Text style={styles.text}>
                  The company was established in 2019 as Jiproford 
                  institute, later in October 2019, the company 
                  compiled a compendium on the Jupeb past 
                  questions. 
                </Text>
                <Text style={styles.text}>
                  The main business of macbase educational 
                  services is the publication and marketing of 
                  textbooks and digital content for the entire 
                  gamut of the education system for the tertiary 
                  aspirants, on WAEC, NECO, JAMB, JUPEB, IJMB, 
                  NABTEB ETC.
                </Text>
                <Text style={styles.text}>
                  Today, the company has the widest range of 
                  books/educational resources and a very expensive
                  distribution network in Nigeria.
                </Text>
                <Text style={styles.text}>
                  As part of the service, the company also 
                  provide Exam solutions to various kinds of 
                  subscribers and also refers links for admission
                  into the various tertiary institution through
                  direct entry only.
                </Text>
              </View>

              <View style={styles.p}>
                <Text style={styles.heading}>OUR VISION</Text>
                <Text style={styles.text}>
                  To empower students seeking admission in order to be admitted.
                </Text>
              </View>

              <View style={styles.p}>
                <Text style={styles.heading}>OUR VALUE</Text>
                <Text style={styles.text}>
                  We don’t accept payment on any service we 
                  are not capable of rendering. No questions 
                  asked.
                </Text>
                <Text style={styles.text}>
                  We deliver books purchased from us to any 
                  location in Nigeria within a maximum of 3 
                  working days.
                </Text>
                <Text style={styles.text}>
                  We keep time based on agreement.
                </Text>
              </View>

              <View style={styles.p}>
                <Text style={styles.heading}>APP TERMS AND CONDITIONS</Text>
                <Text style={styles.text}>
                  1. The Content is a copyrighted work of Macbase
                  Educational and Macbase Education reserves all 
                  rights in and to the Content. The Work is 2022 
                  by Macbase Educational.
                </Text>
                
                <Text style={styles.text}>
                  2. The user is receiving only a limited right
                  to use the Content for user own internal or personal
                  use. The user may not reproduce, forward, modify, create derivative
                  works based upon, transmit, distribute, disseminate, sell, publish
                  or sublicense the Content or in any way commingle the Content with 
                  other third party content, without Macbase Education's consent.
                </Text>
              </View>

            </ScrollView>
          </View>
      </View>
    </SafeAreaView>
  )
}


export default AboutScreen