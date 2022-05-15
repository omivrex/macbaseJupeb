import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView,
  ScrollView
} from 'react-native';
import * as React from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.curve}>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.tabContainer}>
            <TouchableHighlight style={styles.tabs}>
              <View>
                <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="book" size={40} color="#b4b42b" />
                <Text style={styles.tabTexts}>Past Questions</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabs}>
              <View>
                <MaterialIcons style={{alignSelf: 'center', marginVertical: hp('2%')}} name="computer" size={40} color="#b4b42b" />
                <Text style={styles.tabTexts}>CBT test</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabs}>
              <View>
                <FontAwesome5 style={{alignSelf: 'center', marginVertical: hp('2%')}} name="tools" size={40} color="#b4b42b" />
                <Text style={styles.tabTexts}>Learning Tools</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tabs}>
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
          <TouchableHighlight style={[styles.tabs, {width: wp('85%')}]}>
            <View>
              <MaterialCommunityIcons style={{alignSelf: 'center', marginVertical: hp('2%')}} name="frequently-asked-questions" size={40} color="#b4b42b" />
              <Text style={styles.tabTexts}>Freqeuntly Asked Questions</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c74',
  },
  
  curve: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 2500,
    width: '100%',
    height: '70%',
    position: 'absolute'
  },

  scrollView: {
    overflow: 'scroll',
    width: '100%',
    height: '100%'
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

export default HomeScreen