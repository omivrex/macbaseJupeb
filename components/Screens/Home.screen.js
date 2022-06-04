import {useContext, useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationContext from '../context/Nav.context';
import Container from '../Reusable/Container.component';
import ColorContext from '../context/Colors.context';
const HomeScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [greeting, setgreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour<= 12) {
      setgreeting('Good Morning!')
    } else if (hour>=12 && hour<=16) {
      setgreeting('Good Afternoon!')
    } else {
      setgreeting('Good Evening!')
    }
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
      backgroundColor: colors.backgroundColor,
      height: hp('25%'),
      marginHorizontal: '5%',
      marginVertical: '10%',
      backgroundColor: '#fff',
      borderRadius: 28,
      flexDirection: 'column',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 27,
    },
  
    tabTexts: {
      width: '100%',
      textAlign: 'center',
      // alignSelf: 'flex-end',
      
    }
  })

  return (
    <Container>
      <Text style={styles.greeting}>{greeting}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableHighlight onPress={()=> navigation.navigate('Past questions')} style={styles.tabs}>
            <View>
              <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="book" size={40} color="#b4b42b" />
              <Text style={styles.tabTexts}>Past Questions</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("CBT test")} style={styles.tabs}>
            <View>
              <MaterialIcons style={{alignSelf: 'center', marginVertical: hp('2%')}} name="computer" size={40} color="#b4b42b" />
              <Text style={styles.tabTexts}>CBT test</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("Learning tools")} style={styles.tabs}>
            <View>
              <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="tools" size={40} color="#b4b42b" />
              <Text style={styles.tabTexts}>Learning Tools</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> navigation.navigate("GP Calculator")} style={styles.tabs}>
            <View>
              <FontAwesome style={{alignSelf: 'center', marginVertical: hp('2%')}} name="calculator" size={40} color="#b4b42b" />
              <Text style={styles.tabTexts}>GP Calculator</Text>
            </View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight style={[styles.tabs, {width: wp('85%')}]}>
          <View>
            <Entypo style={{alignSelf: 'center', marginVertical: hp('2%')}} name="news" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>Newsfeed</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate("FAQs")} style={[styles.tabs, {width: wp('85%')}]}>
          <View>
            <MaterialCommunityIcons style={{alignSelf: 'center', marginVertical: hp('2%')}} name="frequently-asked-questions" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>FAQs</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </Container>
  )
}

export default HomeScreen