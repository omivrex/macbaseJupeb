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
        <TouchableHighlight style={styles.tabs}>
          <View>
            <FontAwesome5 style={{alignSelf: 'center'}} name="book" size={40} color="black" />
            <Text style={styles.tabTexts}>Past Questions</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <MaterialIcons style={{alignSelf: 'center'}} name="computer" size={40} color="black" />
            <Text style={styles.tabTexts}>CBT test</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <Entypo style={{alignSelf: 'center'}} name="news" size={40} color="black" />
            <Text style={styles.tabTexts}>Newsfeed</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabs}>
          <View>
            <FontAwesome style={{alignSelf: 'center'}} name="calculator" size={40} color="black" />
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
    flexWrap: 'wrap'
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
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
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