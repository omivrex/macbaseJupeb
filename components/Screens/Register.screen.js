import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView,
  TextInput
} from 'react-native';
import {useContext, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome, Zocial, Entypo, FontAwesome5  } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import Container from '../Reusable/Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [currentPath, set_currentPath] = useState('signUp')
  const [selectedCourses, set_selectedCourses] = useState([])
  const next = (path) => {
    set_currentPath(path)
  }

  const changeSelection = (value) => {
    set_selectedCourses(!selectedCourses.includes(value)? [... new Set(selectedCourses.concat(value))]: [... selectedCourses.filter(item=> item !== value)])
  }

  const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      width: '90%',
      height: '85%',
      left: '5%',
      // top: '24%',
      justifyContent: 'center',
      alignContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 25,
      borderRadius: 25,
      backgroundColor: colors.backgroundColor
    },

    cardHeading: {
      // alignSelf: 'flex-start',
      textAlign: 'center',
      top: 0,
      paddingVertical: '5%',
      textDecorationLine: 'none',
      fontSize: hp('3%'),
      color: colors.tabColor,
      marginBottom: '10%',
      // backgroundColor: 'red',
      alignItems: 'center'
    },

    inputField: {
      width: '90%',
      left: '5%',
      marginVertical: '2%'
    },

    labelWrapper: {
      alignItems: 'baseline',
      flexDirection: 'row',
    },

    label: {
      color: colors.labelColor,
      fontSize: hp('2.5%'),
    },

    icons: {
      marginRight: '5%',
      alignSelf: 'flex-start'
    },

    textInput: {
      fontSize: hp('2.5%'),
      width: '95%',
      borderBottomColor: colors.tabColor,
      borderBottomWidth: 2,
      padding: '2%'
    },

    courseListWrapper: {
      width: '90%',
      overflow: 'scroll',
      left: '5%'
    },

    courseSelectionButn: {
      flexDirection: 'row',
      marginHorizontal: '5%',
      marginVertical: '5%',
      paddingVertical: '2%',
      paddingHorizontal: '5%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.backgroundColor,
      shadowColor: "#000",
      borderRadius: 10,
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 7,
    },

    courseSelectionButnText: {
      color: colors.defaultText,
      fontSize: hp('3%'),
    },

    submitButn: {
      backgroundColor: colors.tabColor,
      borderRadius: 50,
      height: '10%',
      width: '40%',
      marginVertical: '10%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },

    butnText: {
      color: colors.appWhite,
      fontSize: hp('2.5%'),
      textAlign: 'center',
    }
  })

  return (
    <Container>
      <View style={styles.wrapper}>
        {
          (() => {
            switch (currentPath) {
              case 'chose courses':
                return (
                  <>
                    <Heading extraStyles={styles.cardHeading}>Choose Your Courses</Heading>
                    <ScrollView style={styles.courseListWrapper}>
                      <TouchableHighlight style={{width: '90%',}} onPress = {()=> changeSelection('maths')}>
                        <View style={styles.courseSelectionButn}>
                          <CText style={styles.courseSelectionButnText}>maths</CText>
                          <CheckBox
                            value={selectedCourses.includes('maths')}
                            onValueChange={()=> changeSelection('maths')}
                            tintColors={{true: colors.appColor}}
                          />
                        </View>
                      </TouchableHighlight>

                      <TouchableHighlight style={{width: '90%',}} onPress = {()=> changeSelection('physics')}>
                        <View style={styles.courseSelectionButn}>
                          <CText style={styles.courseSelectionButnText}>physics</CText>
                          <CheckBox
                            value={selectedCourses.includes('physics')}
                            onValueChange={()=> changeSelection('physics')}
                            tintColors={{true: colors.appColor}}
                          />
                        </View>
                      </TouchableHighlight>
                      
                      <TouchableHighlight style={{width: '90%',}} onPress = {()=> changeSelection('chemistry')}>
                        <View style={styles.courseSelectionButn}>
                          <CText style={styles.courseSelectionButnText}>chemistry</CText>
                          <CheckBox
                            value={selectedCourses.includes('chemistry')}
                            onValueChange={()=> changeSelection('chemistry')}
                            tintColors={{true: colors.appColor}}
                          />
                        </View>
                      </TouchableHighlight>
                      
                      <TouchableHighlight style={{width: '90%',}} onPress = {()=> changeSelection('biology')}>
                        <View style={styles.courseSelectionButn}>
                          <CText style={styles.courseSelectionButnText}>biology</CText>
                          <CheckBox
                            value={selectedCourses.includes('biology')}
                            onValueChange={()=> changeSelection('biology')}
                            tintColors={{true: colors.appColor}}
                          />
                        </View>
                      </TouchableHighlight>
                    </ScrollView>
                    <TouchableHighlight onPress={()=> next('chose courses')} style={styles.submitButn}>
                      <Text style={styles.butnText}>Pay ₦{selectedCourses.length*500}</Text>
                    </TouchableHighlight>
                  </>
                )
              case 'user details':
                return (
                  <>
                    <Heading extraStyles={styles.cardHeading}>Enter Your Details</Heading>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <FontAwesome name="user" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          Full name 
                        </Text>
                      </View>
                      <TextInput style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Entypo name="phone" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          Phone 
                        </Text>
                      </View>
                      <TextInput keyboardType='phone-pad' style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <FontAwesome5 name="school" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          School 
                        </Text>
                      </View>
                      <TextInput keyboardType='phone-pad' style={styles.textInput}></TextInput>
                    </View>
                    <TouchableHighlight onPress={()=> next('chose courses')} style={styles.submitButn}>
                      <Text style={styles.butnText}>Next</Text>
                    </TouchableHighlight>
                  </>
                )
              default:
                return (
                  <>
                    <Heading extraStyles={styles.cardHeading}>SignUp</Heading>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Zocial name="email" style={styles.icons} size={24} color={colors.tabColor}/>  
                        <Text style={styles.label}>
                          Email
                        </Text>
                      </View>
                      <TextInput keyboardType='email-address' style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Entypo name="key" style={styles.icons} size={24} color={colors.tabColor}/>
                        <Text style={styles.label}>
                          Password
                        </Text>
                      </View>
                      <TextInput secureTextEntry={true} keyboardType='name-phone-pad' style={styles.textInput}></TextInput>
                    </View>
                    <TouchableHighlight onPress={()=> next('user details')} style={styles.submitButn}>
                      <Text style={styles.butnText}>Next</Text>
                    </TouchableHighlight>
                  </>
                )
            }
          })()
        }
      </View>
    </Container>
  )
}

  
export default RegisterScreen