import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
} from 'react-native';
import {useContext} from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
import { AntDesign } from '@expo/vector-icons';  
import NavigationContext from '../context/Nav.context';
import Container from './Reusable/Container.component';
import WriteupWrapper from './Reusable/WriteupWrapper.component';

const FaqScreen = () => {
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
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colors.backgroundColor,
    },

    wrapper: {
      width: '100%',
      height: '100%',
      padding: 0,
      left: '0%',
      overflow: 'scroll',
      backgroundColor: 'transparent',
    }
  
  })

  return (
    <Container>
      <WriteupWrapper contentListStyles={styles.contentList} extraStyes={styles.wrapper}>
        <TouchableHighlight onPress={()=> navigation.navigate('Faq1')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              Will ASUU Strike Affect JAMB? IJMB? or JUPEB?
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq2')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              ABOUT JUPEB
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq3')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              THE LIST OF JUPEB CENTRES ACROSS NIGERIA
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq4')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB SCORING GRADE ALLOCATION
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq5')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB EXAMINATION COURSES AND CODES FOR MEDICAL SCIENCE AND ENGINEERING
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq6')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB Subjects Combinations for Sciences
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq7')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB Subjects Combinations For ART, management & social science All Courses 
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq8')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB Result
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq9')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              JUPEB  Affiliated Universities In Abroad
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> navigation.navigate('Faq10')} underlayColor={colors.underlayColor}>
          <View style={styles.listItem}>
            <Text style={{width: '85%', paddingLeft: '5%', fontWeight: 'bold'}}>
              Study Tips
            </Text>
            <AntDesign name="rightcircle" size={24} color={colors.iconColor} />
          </View>
        </TouchableHighlight>
      </WriteupWrapper>
    </Container>
  )
}


export default FaqScreen