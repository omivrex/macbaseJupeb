import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {useContext} from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
import { AntDesign } from '@expo/vector-icons';  

const FaqScreen = () => {
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
  
    contentList: {
      width: wp('100%'),
      height: '100%',
      overflow: 'scroll',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    listItem: {
      width: '95%',
      paddingVertical: hp(2.5),
      left: '2.5%',
      marginVertical: hp('3%'),
      // paddingHorizontal: '10%',
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 27,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: colors.backgroundColor,
    }
  
  })

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.curve}>
        </View>
          <View style={styles.contentList}>
            <ScrollView>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <Text style={{width: '90%', fontWeight: 'bold'}}>
                    Will ASUU Strike Affect JAMB? IJMB? or JUPEB?
                  </Text>
                  <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <Text style={{width: '90%', fontWeight: 'bold'}}>
                    What does this app contain?
                  </Text>
                  <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <Text style={{width: '90%', fontWeight: 'bold'}}>
                    How do I keep track of my Progress?
                  </Text>
                  <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <Text style={{width: '90%', fontWeight: 'bold'}}>
                    Can I access this app on multiple devices?
                  </Text>
                  <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <Text style={{width: '90%', fontWeight: 'bold'}}>
                    Do I need Internet access to use the app?
                  </Text>
                  <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
                </View>
              </TouchableHighlight>
            </ScrollView>
          </View>
      </View>
    </SafeAreaView>
  )
}


export default FaqScreen