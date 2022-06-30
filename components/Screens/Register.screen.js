import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';
import {useContext, useState, useRef} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome, Zocial, Entypo, FontAwesome5, Ionicons  } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import Container from '../Reusable/Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { ScrollView } from 'react-native-gesture-handler';
import { signIn, validateEmail, validatePhone, validatePswd } from '../../utils/register.util';

const RegisterScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [currentPath, set_currentPath] = useState('signIn')
  const [selectedCourses, set_selectedCourses] = useState([])
  const userData = useRef({})
  
  const next = (path) => {
    let inputsAreValid = false
    switch (currentPath) {
      case 'user details':
        const isValidPhone = validatePhone(userData.current.phone)
        !isValidPhone && Alert.alert('', 'Your phone number must be 13 characters and in the format +23480xxxxxxxx')
        const isValidName = userData.current.name?.length >= 3
        !isValidName && Alert.alert('', 'Full name should be at least 3 characters')
        const isValidSchool = userData.current.school?.length >= 3
        !isValidSchool && Alert.alert('', 'School name should be at least 3 characters')
        inputsAreValid = isValidPhone && isValidName && isValidSchool
        break;
      default:
        const isValidEmail = validateEmail(userData.current.email)
        const isValidPswd = validatePswd(userData.current.pswd)
        !isValidEmail && Alert.alert('', 'Invalid Email')
        !isValidPswd && Alert.alert('', 'Password must be up to 8 Characters')
        inputsAreValid = isValidEmail&&isValidPswd
        break;
    }
    inputsAreValid && set_currentPath(path)
  }

  const previous = () => {
    switch (currentPath) {
      case 'chose courses':
        set_currentPath('user details')    
        break;
      default:
        set_currentPath('signIn')
        break;
    }
  }

  const changeSelection = (value) => {
    set_selectedCourses(!selectedCourses.includes(value)? [... new Set(selectedCourses.concat(value))]: [... selectedCourses.filter(item=> item !== value)])
  }

  const signInAndPay = () => {
    if (selectedCourses.length) {
      signIn(userData.current, selectedCourses).then(uid => {
        
      }).catch(err=> console.log(err))
    } else {
      Alert.alert('', `You haven't selected any course yet`)
    }
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

    headingWrapper: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      alignContent: 'space-around',
      marginBottom: '10%',
      paddingHorizontal: '5%'
    },

    ads: {
      fontSize: hp('2%'),
      width: '90%',
      textAlign: 'center',
      marginBottom: '10%'
    },

    cardHeading: {
      textAlign: 'center',
      flex: 1,
      paddingVertical: '5%',
      textDecorationLine: 'none',
      fontSize: hp('3%'),
      color: colors.tabColor,
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
                    <View style={styles.headingWrapper}>
                      <TouchableHighlight onPress={previous}>
                        <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                      </TouchableHighlight>
                      <Heading extraStyles={styles.cardHeading}>Choose Your Courses</Heading>
                    </View>
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
                    <TouchableHighlight onPress={()=> signInAndPay()} style={styles.submitButn}>
                      <Text style={styles.butnText}>Pay ₦{selectedCourses.length*500}</Text>
                    </TouchableHighlight>
                  </>
                )
              case 'user details':
                return (
                  <>
                    <View style={styles.headingWrapper}>
                      <TouchableHighlight onPress={previous}>
                        <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                      </TouchableHighlight>
                      <Heading extraStyles={styles.cardHeading}>Enter Your Details</Heading>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <FontAwesome name="user" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          Full name 
                        </Text>
                      </View>
                      <TextInput key={'name'} defaultValue={userData.current.name&&userData.current.name} onChangeText={value=> userData.current.name = value} style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Entypo name="phone" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          Phone 
                        </Text>
                      </View>
                      <TextInput key={'phone'} defaultValue={userData.current.phone&&userData.current.phone} keyboardType='phone-pad' onChangeText={value=> userData.current.phone = value} style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <FontAwesome5 name="school" style={styles.icons} size={24} color={colors.tabColor} />
                        <Text style={styles.label}>
                          School
                        </Text>
                      </View>
                      <TextInput key={'school'} defaultValue={userData.current.school&&userData.current.school} onChangeText={value=> userData.current.school = value} style={styles.textInput}></TextInput>
                    </View>
                    <TouchableHighlight onPress={()=> next('chose courses')} style={styles.submitButn}>
                      <Text style={styles.butnText}>Next</Text>
                    </TouchableHighlight>
                  </>
                )
              default:
                return (
                  <>
                    <Heading extraStyles={styles.cardHeading}>Sign In</Heading>
                    <CText extraStyles={styles.ads}>
                      Sign In to enjoy all features of the app.
                      This includes 5 years of compiled past questions with detailed answers,
                      Acess to CBT tests to aid you with exam preparations and lots more.
                    </CText>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Zocial name="email" style={styles.icons} size={24} color={colors.tabColor}/>  
                        <Text style={styles.label}>
                          Email
                        </Text>
                      </View>
                      <TextInput defaultValue={userData.current.email&&userData.current.email} key={'email'} keyboardType='email-address' onChangeText={value=> userData.current.email = value} style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.inputField}>
                      <View style={styles.labelWrapper}>
                        <Entypo name="key" style={styles.icons} size={24} color={colors.tabColor}/>
                        <Text style={styles.label}>
                          Password
                        </Text>
                      </View>
                      <TextInput defaultValue={userData.current.pswd&&userData.current.pswd} key={'pswd'} secureTextEntry={true} onChangeText={value=> userData.current.pswd = value} style={styles.textInput}></TextInput>
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