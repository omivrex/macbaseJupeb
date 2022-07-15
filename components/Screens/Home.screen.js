import {useContext, useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as network from 'expo-network';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Container from '../Reusable/Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { Heading } from '../Reusable/CustomText.component';
import { getSectionData } from '../../utils/news.util';

const HomeScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [greeting, setgreeting] = useState('');
  const [newsData, setnewsData] = useState([])
  const renderGreeting = () => {
    const hour = new Date().getHours()
    if (hour<= 12) {
      setgreeting('Good Morning!')
    } else if (hour>=12 && hour<=16) {
      setgreeting('Good Afternoon!')
    } else {
      setgreeting('Good Evening!')
    }
  }
  
  const getGenInfo = async () => {
    const networkStat = await network.getNetworkStateAsync()
    if (networkStat.isInternetReachable) {
      getSectionData('General Information').then(data=> {
        console.log(data)
        setnewsData([... data])
      }).catch(err=> {
        alert('we are having trouble reaching our server. Are you offline?')
        console.error(err)

      })
    } 
  }

  useEffect(() => {
    renderGreeting()
    getGenInfo()
  }, []);

  const styles = StyleSheet.create({
    greeting: {
      color: '#fff',
      paddingVertical: '2%',
      fontSize: hp('3%'),
      backgroundColor: colors.appColor,
      zIndex: 2,
      width: '100%',
      textAlign: 'center'
    },
  
    scrollView: {
      overflow: 'scroll',
      width: '100%',
      height: '100%',
      top: '4%',
      position: 'absolute'
    },
    
    tabContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      overflow: 'scroll',
      width: '100%',
      // height: '100%'
    },
  
    tabs: {
      width: wp('40%'),
      backgroundColor: colors.appWhite,
      height: hp('25%'),
      marginHorizontal: '5%',
      marginVertical: '10%',
      borderRadius: 28,
      flexDirection: 'column',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 7,
    },
  
    tabTexts: {
      width: '100%',
      textAlign: 'center',
      color: colors.darkText
      // alignSelf: 'flex-end',
    },

    newsAndFaqWrapper: {
      backgroundColor: colors.appWhite,
      width: wp('100%'),
      flex: 1,
      overflow: 'visible',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingVertical: hp('4%')
    },

    listItem: {
      width: '97%',
      paddingVertical: hp(2.5),
      left: '5%',
      marginVertical: hp('3%'),
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 7,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colors.appWhite,
    },

    newsAndFaqHeading: {
      fontSize: hp('3%'),
      textDecorationLine: 'none',
      color: colors.tabColor
      // fontWeight: 'normal'
    },

    infoText: {
      width: '85%', 
      paddingLeft: '5%', 
      fontWeight: 'bold',
      color: colors.darkText
    }
  })

  return (
    <Container>
      <Text style={styles.greeting}>{greeting}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableHighlight onPress={()=> navigation.navigate('Past questions')} style={styles.tabs} underlayColor={colors.underlayColor}>
            <View>
              <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="book" size={40} color={colors.iconColor} />
              <Text style={styles.tabTexts}>Past Questions</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("CBT test")} style={styles.tabs} underlayColor={colors.underlayColor}>
            <View>
              <MaterialIcons style={{alignSelf: 'center', marginVertical: hp('2%')}} name="computer" size={40} color={colors.iconColor} />
              <Text style={styles.tabTexts}>CBT test</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("Learning tools")} style={styles.tabs} underlayColor={colors.underlayColor}>
            <View>
              <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="tools" size={40} color={colors.iconColor} />
              <Text style={styles.tabTexts}>Learning Tools</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("GP Calculator")} style={styles.tabs} underlayColor={colors.underlayColor}>
            <View>
              <FontAwesome style={{alignSelf: 'center', marginVertical: hp('2%')}} name="calculator" size={40} color={colors.iconColor} />
              <Text style={styles.tabTexts}>GP Calculator</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.newsAndFaqWrapper}>
          <View>
            <Heading extraStyles={styles.newsAndFaqHeading}>News Feed</Heading>
            {newsData.length?
              newsData.map((item, index) => {
                return (
                  <TouchableHighlight key={index} onPress={()=> navigation.navigate('News', {data: item} )} underlayColor={colors.underlayColor}>
                    <View style={styles.listItem}>
                      <Text style={styles.infoText}>
                        {item.Topic.toUpperCase()}
                      </Text>
                      <AntDesign name="rightcircle" size={24} color={colors.appWhite} />
                    </View>
                  </TouchableHighlight>
                )
              })
              :
                <View style={[styles.tabs, {width: wp('85%'), elevation: 0}]}>
                  <Text style={{width: '100%', textAlign: 'center'}}>
                    No Information Here
                  </Text>
                  <MaterialCommunityIcons name="information-off-outline" style={{alignSelf: 'center', marginVertical: hp('2%')}} size={40} color={colors.appWhite} />
                </View>
            }
          </View>
          <View>
            <Heading extraStyles={styles.newsAndFaqHeading}>FAQs</Heading>

            <TouchableHighlight onPress={()=> navigation.navigate('FAQs', { screen: 'Faq2' })} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={styles.infoText}>
                  ABOUT JUPEB
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.appWhite} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('FAQs', { screen: 'Faq3' })} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={styles.infoText}>
                  THE LIST OF JUPEB CENTRES ACROSS NIGERIA
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.appWhite} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('FAQs', { screen: 'Faq4' })} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={styles.infoText}>
                  JUPEB SCORING GRADE ALLOCATION
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.appWhite} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('FAQs', { screen: 'FaqScreen' })} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={styles.infoText}>
                  More FAQs...
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.appWhite} />
              </View>
            </TouchableHighlight>
          </View>
        </View>

      </ScrollView>
    </Container>
  )
}

export default HomeScreen