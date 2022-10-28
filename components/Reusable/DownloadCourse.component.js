import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ToastAndroid,
  BackHandler
} from 'react-native';
import {useContext, useState, useRef, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome, Zocial, Entypo, FontAwesome5, Ionicons  } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import {PayWithFlutterwave} from 'flutterwave-react-native';

import Container from './Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from './CustomText.component';
import { ScrollView } from 'react-native-gesture-handler';
import { 
  updateOnlineUserData,
  generateTransactionRef,
  getUserDetails,
  saveUserDataLocally
} from '../../utils/register.util';
import { updateCourseData, getOnlineCollections } from '../../utils/pastquestions.utils';
import LoadingComponent from './Loading.component';
import DownloadContext from '../context/Download.context';

const DownloadCourseComponent = () => {
  const colors = useContext(ColorContext);
  const [loadingValue, set_loadingValue] = useState('')
  const [selectedCourses, set_selectedCourses] = useState([])
  const corusesInDb = useRef([])
  const userData = useRef({})
  const userId = useRef('')
  const price = useRef(0)
  const toggleDownloadComponent = useContext(DownloadContext)

  
  useEffect(() => {
    getUserDetails().then((userDetails)=> {
      const {selectedCourses, uid, ...everythingElse} = userDetails
      userId.current = uid
      userData.current = {... everythingElse}
      getCoursesFromDB()
      selectedCourses && set_selectedCourses([... selectedCourses]) 
      ToastAndroid.showWithGravity(`You have Already Registered.`, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }).catch(err=> console.log(err))
    return BackHandler.removeEventListener('hardwareBackPress', () => null)
  }, [])

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
      .catch(()=> handleErr('Network Error!', getCoursesFromDB, path))
  }

  const handleErr = (err, callback, arg) => {
    typeof err === 'string' && ToastAndroid.showWithGravity(err, ToastAndroid.SHORT)
    callback && navigation.isFocused() && callback(arg)
  }

  const changeSelection = (courseName) => {
    const [course] = selectedCourses.filter(item=> item.courseName === courseName)
    if (!course) {
      set_selectedCourses([])
      set_selectedCourses([... new Set(selectedCourses.concat({courseName, paid: false}))])
      price.current++
    } else {
      if (course.paid) {
        ToastAndroid.showWithGravity(`You Have Already Paid For This Course.`, ToastAndroid.LONG, ToastAndroid.CENTER)
      } else {
        set_selectedCourses([])
        set_selectedCourses([... selectedCourses.filter(item=> item.courseName !== courseName)])
        price.current--
      }
    }
  }

  const paymentResponseHandler = (isUpdate) => {
    updateOnlineUserData({selectedCourses, ...userData.current}, userId.current).then(() => {
      saveUserDataLocally(userId.current)
      .then(async ({selectedCourses}) => {
        for await (const course of selectedCourses) {
          set_loadingValue(isUpdate?'Updating Paid Courses':'Downloading Courses...')
          updateCourseData(course.courseName).finally(()=> {
            set_loadingValue('')
            toggleDownloadComponent()
          })
        }
      }).catch(handleErr)
    }).catch(handleErr)
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    try {
      return loadingValue === ''? toggleDownloadComponent():true
    }
    catch (err) {
      ToastAndroid.show(err, ToastAndroid.LONG);
      return false;
    }
  });

  const styles = StyleSheet.create({
      wrapper: {
        position: 'absolute',
        width: '90%',
        height: hp('75%'),
        left: '5%',
        top: hp('12.5%'),
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
  
      cardHeading: {
        textAlign: 'center',
        flex: 1,
        paddingVertical: '5%',
        textDecorationLine: 'none',
        fontSize: hp('3%'),
        color: colors.tabColor,
        alignItems: 'center'
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
        textAlign: 'center',
      }
  })
  
  return (
      <Container>
          <View style={styles.wrapper}>
              <View style={styles.headingWrapper}>
                  <Heading extraStyles={styles.cardHeading}>Choose Your Courses</Heading>
              </View>
              <View style={{display: loadingValue?'flex':'none', zIndex: 7, height: '95%', width: '95%', position: 'absolute', backgroundColor: colors.appWhite}}>
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
                    amount: price.current*500
                }}
                customButton= {props=> {
                {/*change the onPress func for the custom butn back to this b4 production ()=> selectedCourses.filter(course => course.paid === false).length || !selectedCourses.length? props.onPress():paymentResponseHandler()*/}
                    return (
                        <TouchableHighlight style={styles.submitButn} onPress= {()=> selectedCourses.filter(course => course.paid === false).length || !selectedCourses.length? props.onPress():paymentResponseHandler()}>
                            <Text style={styles.butnText}>{selectedCourses.filter(course => course.paid === false).length || !selectedCourses.length?`Pay ₦${price.current*500}`:'Update Courses'}</Text>
                        </TouchableHighlight>
                    )
                }}
              />

          </View>
      </Container>
  )
}

export default DownloadCourseComponent