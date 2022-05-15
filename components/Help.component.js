import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight,
    SafeAreaView
  } from 'react-native';
  import * as React from 'react';
  
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { FontAwesome5 } from '@expo/vector-icons';
  import { MaterialIcons } from '@expo/vector-icons';
  import { FontAwesome } from '@expo/vector-icons';
  import { Entypo } from '@expo/vector-icons';
  const HelpScreen = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.curve}>
          </View>
          
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
  
  })
  
  export default HelpScreen