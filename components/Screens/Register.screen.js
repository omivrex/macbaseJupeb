import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  TextInput,
  Alert,
  ToastAndroid
} from 'react-native';
import {useContext, useState, useRef, useEffect, useCallback} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome, Zocial, Entypo, FontAwesome5, Ionicons  } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import {PayWithFlutterwave} from 'flutterwave-react-native';

import Container from '../Reusable/Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { ScrollView } from 'react-native-gesture-handler';
import { 
  updateOnlineUserData,
  generateTransactionRef,
  getUserDetails,
  saveUserDetails,
  signIn,
  validateEmail,
  validatePhone,
  validatePswd,
  updateLocalUserData 
} from '../../utils/register.util';
import { updateCourseData, getOnlineCollections } from '../../utils/pastquestions.utils';
import LoadingComponent from '../Reusable/Loading.component';
import { useFocusEffect } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [currentPath, set_currentPath] = useState('Sign In')
  const [selectedCourses, set_selectedCourses] = useState([])
  const userData = useRef({})
  const displayBackButn = useRef(true)
  const price = useRef(0)
  const userExists = useRef(false)
  const userId = useRef('')
  const corusesInDb = useRef([])
  const [loadingValue, set_loadingValue] = useState('')

  
  useFocusEffect(
    useCallback(() => {
      getUserDetails().then((userDetails)=> {
        if (userDetails !== null) {
          console.log('userDetails', userDetails)
          userExists.current = true
          const {selectedCourses, uid, ...everythingElse} = userDetails
          userId.current = uid
          userData.current = {... everythingElse}
          displayBackButn.current = false
          getCoursesFromDB()
          // userDetails.selectedCourses.map(course=> course.paid=true)
          set_selectedCourses([... selectedCourses]) 
          ToastAndroid.showWithGravity(`You have Already Registered.`, ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
          userExists.current = false
          set_currentPath('Sign In')
        }
      }).catch(err=> console.log(err))
      return ()=> null
    }, [])
  );

  const next = (path) => {
    let inputsAreValid = false
    switch (currentPath) {
      case 'Enter Your Details':
        const isValidPhone = validatePhone(userData.current.phone)
        !isValidPhone && ToastAndroid.showWithGravity('Your phone number must be 13 characters and in the format +23480xxxxxxxx', 5000, ToastAndroid.CENTER)
        const isValidName = userData.current.name?.length >= 3
        !isValidName && ToastAndroid.showWithGravity('Full name should be at least 3 characters', 5000, ToastAndroid.CENTER)
        const isValidSchool = userData.current.school?.length >= 3
        !isValidSchool && ToastAndroid.showWithGravity('School name should be at least 3 characters', 5000, ToastAndroid.CENTER)
        inputsAreValid = isValidPhone && isValidName && isValidSchool
        break;
      default:
        const isValidEmail = validateEmail(userData.current.email)
        const isValidPswd = validatePswd(userData.current.pswd)
        !isValidEmail && ToastAndroid.showWithGravity('Invalid Email', 5000, ToastAndroid.CENTER)
        !isValidPswd && ToastAndroid.showWithGravity('Password must be up to 8 Characters', 5000, ToastAndroid.CENTER)
        inputsAreValid = isValidEmail&&isValidPswd
        break;
    }
    if (inputsAreValid) {
      path === 'Choose Your Courses'? getCoursesFromDB(path)
      :set_currentPath(path)
    }
  }

  const getCoursesFromDB = (path) => {
    set_loadingValue('Getting Courses...')
    getOnlineCollections()
    .then(returnedData=> {
      if (returnedData.length) {
        corusesInDb.current = [... returnedData]
        set_loadingValue('')
      } else {
        console.log('returnedData', returnedData, path)
        handleErr(getCoursesFromDB, path)
      }
    })
    .then(()=> set_currentPath(path||'Choose Your Courses'))
    .catch(()=> handleErr(getCoursesFromDB, path))
  }

  const handleErr = (callback, arg) => {
    ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.CENTER)
    navigation.isFocused()&& callback(arg)
  }

  const previous = () => {  
    switch (currentPath) {
      case 'Choose Your Courses':
        set_currentPath('Enter Your Details')    
        break;
      default:
        set_currentPath('Sign In')
        break;
    }
  }

  
  const changeSelection = (courseName) => {
    const [course] = selectedCourses.filter(item=> item.courseName === courseName)
    set_selectedCourses([])
    if (!course) {
      set_selectedCourses([... new Set(selectedCourses.concat({courseName, paid: false}))])
    } else {
      course.paid? ToastAndroid.showWithGravity(`You Have Already Paid For This Course.`, ToastAndroid.LONG, ToastAndroid.CENTER)
      :set_selectedCourses([... selectedCourses.filter(item=> item.courseName !== courseName)])
    }
  }

  const signInAndPay = (userExists, paymentCallBack) => {
    if (selectedCourses.filter(course => course.paid === false).length) { /** select only courses which haven't been purchased */
      set_loadingValue('Signing In...')
      signIn(userData.current, selectedCourses, userExists).then((userDetails) => {
        if (userDetails) {
          !userExists?saveUserDetails(userDetails):null
          setTimeout(() => {
            set_loadingValue('')
          }, 1000);
          paymentCallBack()
        }
      }).catch(err=> {
        console.log('signInAndPay Error', typeof err, err)
        ToastAndroid.show(err, ToastAndroid.SHORT)
      })
    } else if (selectedCourses.length) {
      paymentResponseHandler(true)
    } else {
      ToastAndroid.showWithGravity(`You haven't selected any course yet`, ToastAndroid.LONG, ToastAndroid.CENTER)
    }
  }

  const paymentResponseHandler = (isUpdate) => {
    updateOnlineUserData(selectedCourses, userId.current).then(updatedSelectedCourses => {
      updateLocalUserData(updatedSelectedCourses, userId.current, userData.current).then(async updatedUserData => {
        for await (const course of updatedSelectedCourses) {
          set_loadingValue(isUpdate?'Updating Paid Courses':'Downloading Courses...')
          updateCourseData(course.courseName, ()=> set_loadingValue(''))
        }
      })
    }).catch(err=> ToastAndroid.show(err, ToastAndroid.SHORT))
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
      // left: '5%',
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
        <View style={styles.headingWrapper}>
          {
            displayBackButn.current?
            <TouchableHighlight onPress={previous}>
              <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
            </TouchableHighlight>
            :<></>
          }
          <Heading extraStyles={styles.cardHeading}>{currentPath}</Heading>
        </View>
        {
          (() => {
            price.current = selectedCourses.filter(course=> course.paid===false).length*500
            switch (currentPath) {
              case 'Choose Your Courses':
                return (
                  <>
                    <View style={{display: loadingValue?'flex':'none', zIndex: 7, height: '60%'}}>
                      <LoadingComponent>{loadingValue}</LoadingComponent>
                    </View>
                    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} style={styles.courseListWrapper}>
                      {
                        corusesInDb.current.map(({courseName}, index) => {
                          return (
                            <TouchableHighlight key={index} style={{width: '90%'}} onPress = {()=> changeSelection(courseName)}>
                              <View style={styles.courseSelectionButn}>
                                <CText style={styles.courseSelectionButnText}>{courseName}</CText>
                                <CheckBox
                                  value={selectedCourses.filter(item=> item.courseName === courseName).length>0}
                                  onValueChange={()=> changeSelection(courseName)}
                                  tintColors={{true: colors.appColor}}
                                />
                              </View>
                            </TouchableHighlight>
                          )
                        })
                      }
                    </ScrollView>

                    <PayWithFlutterwave
                      onRedirect={transactionResult=> transactionResult.status === 'successful' && paymentResponseHandler()}
                      options={{
                        tx_ref: generateTransactionRef(10),
                        authorization: 'FLWPUBK_TEST-c192c6d83589da7000897046bdc51dd2-X',
                        currency: 'NGN',
                        integrity_harsh: 'FLWSECK_TEST5423d01f66cf',
                        payment_options: 'card',
                        handleOnRedirect: 'google.com',
                        customer: {email: 'macbasejupeb@gmail.com', phonenumber: '+2348165541591', name: 'Macbase' },
                        meta: {...userData},
                        amount: price.current
                      }}
                      customButton= {props=> {
                        {/*change back to this b4 production props.onPress()*/}
                        return (
                          <TouchableHighlight style={styles.submitButn} onPress= {()=> signInAndPay(userExists.current, ()=>paymentResponseHandler())}>
                            <Text style={styles.butnText}>{selectedCourses.filter(course => course.paid === false).length || !selectedCourses.length?`Pay ₦${price.current}`:'Update Courses'}</Text>
                          </TouchableHighlight>
                        )
                      }}
                    />
                  </>
                )
              case 'Enter Your Details':
                return (
                  <>
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
                    <TouchableHighlight onPress={()=> next('Choose Your Courses')} style={styles.submitButn}>
                      <Text style={styles.butnText}>Next</Text>
                    </TouchableHighlight>
                  </>
                )
              default:
                return (
                  <>
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
                    <TouchableHighlight onPress={()=> next('Enter Your Details')} style={styles.submitButn}>
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