import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
import * as React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.curve}>
        </View>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <FontAwesome5 style={{alignSelf: 'center', marginVertical: '15%'}} name="book" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>Past Questions</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <MaterialIcons style={{alignSelf: 'center', marginVertical: '15%'}} name="computer" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>CBT test</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <Entypo style={{alignSelf: 'center', marginVertical: '15%'}} name="news" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>Newsfeed</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <FontAwesome style={{alignSelf: 'center', marginVertical: '15%'}} name="calculator" size={40} color="#b4b42b" />
            <Text style={styles.tabTexts}>GP Calculator</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#1c1c74',
  },
  
  curve: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 2500,
    width: '100%',
    height: '70%',
    position: 'absolute'
  },

  tabs: {
    width: '40%',
    height: '30%', //use device height true useContext to define height
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
    alignSelf: 'flex-end',
    
  }
})

export default HomeScreen