import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight,
    ScrollView,
  } from 'react-native';
  import {useContext} from 'react';
  
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import ColorContext from '../../context/Colors.context';
  import { AntDesign } from '@expo/vector-icons';  
  import NavigationContext from '../../context/Nav.context';
import Container from '../../Reusable/Container.component';


  const HelpScreen = () => {
    const colors = useContext(ColorContext)
    const navigation = useContext(NavigationContext);

    const styles = StyleSheet.create({
      contentList: {
        width: wp('100%'),
        height: '100%',
        overflow: 'scroll',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
        elevation: 27,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: colors.backgroundColor,
      }
    
    })

    return (
      <Container>
        <View style={styles.contentList}>
          <ScrollView>
            <TouchableHighlight onPress={()=> navigation.navigate('Hep1')} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
                  What does this app contain?
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('Hep2')} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
                  How do I keep track of my Progress?
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('Hep3')} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
                  Can I access this app on multiple devices?
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> navigation.navigate('Hep4')} underlayColor={colors.underlayColor}>
              <View style={styles.listItem}>
                <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
                  Do I need Internet access to use the app?
                </Text>
                <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </Container>
    )
  }
  
  export default HelpScreen