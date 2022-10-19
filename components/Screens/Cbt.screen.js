import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableHighlight,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {useRef, useContext, useState, useCallback, useEffect, useLayoutEffect} from 'react';
import Container from '../Reusable/Container.component';
import { capitalize1stLetter, getAllQuestionsInCourse, getBranchData, loadAllTestData, resetTestData, shuffleAndCutQuestions, storeTestResult } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AnswerComponent from '../Reusable/Answer.component';
import QuestionComponent from '../Reusable/Question.component';
import { useFocusEffect } from '@react-navigation/native';

const CbtScreen = ({navigation}) => {
  const colors = useContext(ColorContext)
  const [listOfCourses, set_listOfCourses] = useState([])
  const [selectedOptions, set_selectedOptions] = useState({
    time: null,
    course: null,
  })
  const shouldRenderQuestions = useRef(false)
  const shouldRenderResult = useRef(false)
  const [questionData, set_questionData] = useState([])
  const [testResults, set_testResults] = useState({})
  useFocusEffect(
    useCallback(() => {
      getAllTestResults()
      getListOfCourses()
    }, [])
  )
  
  useEffect(() => {
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', ()=> null)
    }
  }, [])
  

  const getListOfCourses = () => {
    getBranchData(0).then(savedCourses => {
      renderCollectionData(savedCourses.map(data=> data = data.course))
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const getAllTestResults = () => {
    loadAllTestData().then(testsData=> {
      set_testResults({...testsData})
    })
  }

  const renderCollectionData = collectionData => {
    set_listOfCourses([... collectionData])
  }

  const shouldDisplayTimeSettings = useRef(false)
  const changeSelection = (value, type) => {
    switch (type) {
      case 'time':
        set_selectedOptions({... selectedOptions, time: value})
        break;
      default:
        shouldDisplayTimeSettings.current = true
        set_selectedOptions({... selectedOptions, course: value})
      break;
    }
  }


  const start = () => {
    if (selectedOptions.course && selectedOptions.time) {
      const {course} = selectedOptions
      getAllQuestionsInCourse(course)
      .then(questions=> shuffleAndCutQuestions([...questions], 50))
      .then(displayQuestions)
      // .then(runCountDown)
    } else {
      ToastAndroid.show(`You Have Not Selected Any time Yet`, ToastAndroid.SHORT);
    }
  }

  const displayQuestions = (dataToDisplay = questionData) => {
    shouldRenderQuestions.current = true
    // console.log(dataToDisplay)
    set_questionData([... dataToDisplay])
  }

  const backFunc = () => {
    console.log('back handler', shouldRenderQuestions.current, shouldRenderResult.current, shouldDisplayTimeSettings.current)
    const shouldPreventDefaultBackAction = (shouldRenderQuestions.current || shouldRenderResult.current || shouldDisplayTimeSettings.current)
    if (ansData !== '') {
      set_ansData('')
    } else {
      shouldRenderQuestions.current = false
      shouldRenderResult.current = false
      shouldDisplayTimeSettings.current = false
      clearInterval(timerInterval)
      score.current = 0
      noOfQuestionsAttempted.current = 0
      set_questionData([... questionData])
    }
    return shouldPreventDefaultBackAction
  }

  const submit = () => {
    backFunc()
    markTest()
    renderResult()
    storeTestResult({courseName: selectedOptions.course, noOfQuestionsAttempted:noOfQuestionsAttempted.current, score: score.current}).then(getAllTestResults)
  }

  const score = useRef(0)
  const noOfQuestionsAttempted = useRef(0)
  const markTest = () => {
    questionData.forEach((question) => {
      if (question.data) {
        const {data} = question
        if (data.correctOption === data.userAns || data.correctOption === '' && data.userAns != '') { // if user got the answer or if there is no correct option but th user attempted the question
          score.current++
        }
        
        if (data.userAns) {
          noOfQuestionsAttempted.current++
        }
      }
    });
    Alert.alert('', `You Scored ${score.current}\n and Attempted ${noOfQuestionsAttempted.current}`)
  }

  const renderResult = () => {
    shouldRenderResult.current = true
  }

  const [ansData, set_ansData] = useState('')
  const showAns = (data) => {
    set_ansData(data)
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    try {
      return backFunc() && navigation.isFocused()
    }
    catch (err) {
      ToastAndroid.show(err, ToastAndroid.LONG);
      return false;
    }
  });

  const scrollViewRef = useRef()

  const styles = StyleSheet.create({
    optionsWrapper: {
      width: '100%',
      height: '100%',
      backgroundColor: '#77777794',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },

    optionsCont: {
      width: '85%',
      flex: 0.85,
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: colors.backgroundColor,
    },

    headingWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignContent: 'space-around',
      width: '97%',
      left: '1.5%'
    },
    
    heading: {
      textDecorationLine: 'none',
      alignSelf: 'auto',
      width: '100%'
    },

    optionsScroll: {
      width: '100%',
      height: '88%',
      marginVertical: '5%',
      overflow: 'scroll',
    },

    optionsCartegory: {
      width: '100%',
      marginBottom: hp('3%'),
    },

    options: {
      flexDirection: 'row',
      width: '90%',
      marginHorizontal: '5%',
      marginVertical: '5%',
      // flex: 1,
      paddingVertical: '2%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: '5%',
      backgroundColor: colors.backgroundColor,
      shadowColor: "#000",
      borderRadius: 10,
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 7,
    },

    optionsText: {
      color: colors.defaultText,
      fontSize: hp('3%'),
    },

    optionButnWrapper: {
      height: '12%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignContent: 'center',
      justifyContent: 'space-around',
    },

    optionButns: {
      backgroundColor: colors.tabColor,
      color: colors.defaultText,
      marginBottom: '5%',
      height: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      borderRadius: 10,
      textAlign: 'center',
    },

    graphWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
    },
    
    graphScroll: {
      width: '100%',
      // left: '5%',
      // alignItems: 'center',
      overflow: 'scroll',
      backgroundColor: colors.backgroundColor,
      height: '100%',
      paddingBottom: '20%'
    },
    
    graphContainer: {
      width: '90%',
      left: '5%',
      alignItems: 'center',
      marginVertical: '8%',
      height: hp('60%'),
      // flex: 1,
    },
    
    graph: {
      backgroundColor: '#2F3132',
      width: '97%',
      height: '100%',
      flexDirection: 'row',
      alignContent: 'space-around',
      overflow: 'scroll',
      // left: '5%',
    },
    
    barBody: {
      flexDirection: 'column',
      maxHeight: '93%',
      minHeight: '10%',
      height: '0%',
      marginHorizontal: wp('2%'),
      // width: '25%',
    },
    
    graphBars: {
      backgroundColor: colors.tabColor,
      flex: 1,
    },

    graphDetailsCont: {
      flexDirection: 'row',
      width: '100%',
      height: '20%',
      justifyContent: 'space-around',
      alignItems: 'center',
      // backgroundColor: 'red'
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 7,
    },

    graphDetails: {
      flex: 0.5,
      fontSize: hp('2.2%'),
      // paddingVertical: '50%',
      alignContent:'center',
      justifyContent:'center',
      alignItems: 'center',
      textAlign: 'center',
    },

    selectCourseButn: {
      height: '12%',
      width: '100%',
      borderRadius: 10,
      backgroundColor: colors.tabColor,
    },

    startButnWrapper: {
      height: '12%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignContent: 'center',
      justifyContent: 'space-around',
    },

    startButnText: {
      backgroundColor: colors.tabColor,
      color: colors.defaultText,
      marginBottom: '5%',
      height: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      borderRadius: 10,
      textAlign: 'center',
    },

    pqDataWrapper: {
      borderColor: colors.tabColor,
      borderBottomWidth: 2,
      width: '90%',
      marginVertical: hp('3%'),
      left: '5%',
      justifyContent: 'center'
    },

    flatlistWrapper: {
      // height: '80%',
      width: '90%',
      left: '5%'
    },

    questOptionsContainer: {
      width: '100%',
      flexDirection: 'row',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: colors.appColor,
      height: hp('5%'),
    },

    questOptionsButn: {
      flex: 4,
      height: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },

    questOptionsText: {
      color: colors.defaultText,
      textAlign: 'center',
    },

    ansButn: {
      left: '25%',
      padding: 6,
      backgroundColor: colors.appColor,
      width: '50%',
    },

    ansButnText: {
      color: colors.defaultText,
      textAlign: 'center'
    },

    submitButn: {
      position: 'absolute',
      width: '100%',
      height: '8%',
      top: '92%',
      backgroundColor: colors.appWhite,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    
    submitButnText: {
      alignSelf: 'center',
      borderRadius: 10,
      height: '100%',
      backgroundColor: colors.tabColor,
      color: colors.defaultText,
      // width: '100%',
      paddingHorizontal: '10%',
      textAlignVertical: 'center',
      fontSize: hp('2.3%'),
      textAlign: 'center',
    },
  })
  
  switch (true) {
    case (shouldRenderResult.current):
      return (
        <Container>
          <View style={{width: '100%'}}>
            <View style={{...styles.headingWrapper, ...{width: '100%'}}}>
              <TouchableHighlight onPress={backFunc}>
                <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
              </TouchableHighlight>
              <Heading extraStyles={{... styles.heading, color: colors.defaultText, flexDirection: 'row'}}>
                {`Score ${score.current}/${questionData.length}`}
              </Heading>
            </View>
            <FlatList
              data={questionData}
              contentContainerStyle = {{width: '100%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
              renderItem={({item}) => {
                const dataToRender = item.data
                if (dataToRender) {
                  return (
                    <QuestionComponent dataToRender={dataToRender}>
                      <TouchableHighlight underlayColor={colors.underlayColor} style={styles.ansButn} onPress={()=> {
                        dataToRender.correctOption?
                            Alert.alert(`Answer: ${dataToRender? dataToRender.correctOption:''}`, '', [
                              {
                                text: 'Solution',
                                onPress: ()=> showAns(dataToRender? {answer: dataToRender.answer, correctAnswer: dataToRender.correctOption}:'')
                              },

                              {
                                text: 'Cancel',
                                onPress: () => ''
                              }
                            ], {cancelable: true})
                        : showAns(dataToRender? {answer: dataToRender.answer, correctAnswer: dataToRender.correctOption}:'no answwer')
                      }}>
                        <Text style = {styles.ansButnText}>ANSWER</Text>
                      </TouchableHighlight>
                      <View style={[styles.questOptionsContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                        <View style={[styles.questOptionsButn, dataToRender.userAns === 'A'?dataToRender.userAns===dataToRender.correctOption?{backgroundColor: colors.tabColor}:{backgroundColor: 'red'}:{backgroundColor: colors.appColor}]}>
                            <Text style={styles.questOptionsText}>A</Text>
                        </View>
                        <View style={[styles.questOptionsButn, dataToRender.userAns === 'B'?dataToRender.userAns===dataToRender.correctOption?{backgroundColor: colors.tabColor}:{backgroundColor: 'red'}:{backgroundColor: colors.appColor}]}>
                            <Text style={styles.questOptionsText}>B</Text>
                        </View>
                        <View style={[styles.questOptionsButn, dataToRender.userAns === 'C'?dataToRender.userAns===dataToRender.correctOption?{backgroundColor: colors.tabColor}:{backgroundColor: 'red'}:{backgroundColor: colors.appColor}]}>
                            <Text style={styles.questOptionsText}>C</Text>
                        </View>
                        <View style={[styles.questOptionsButn, dataToRender.userAns === 'D'?dataToRender.userAns===dataToRender.correctOption?{backgroundColor: colors.tabColor}:{backgroundColor: 'red'}:{backgroundColor: colors.appColor}]}>
                            <Text style={styles.questOptionsText}>D</Text>
                        </View>
                      </View>
                    </QuestionComponent>
                  )
                } else (<></>)
              }}
              keyExtractor = {(item,index) => index.toString()}
            />
          </View>
          <AnswerComponent extraStyles={{display:ansData !== ''?'flex':'none'}} data={ansData} />
        </Container>
      )
    case (shouldRenderQuestions.current):
      return (
        <Container>
          <View style={{width: '100%'}}>
            <View style={{...styles.headingWrapper, ...{width: '100%'}}}>
              <TouchableHighlight onPress={backFunc}>
                <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
              </TouchableHighlight>
              <TimerComponent selectedTime={selectedOptions.time} submitFunc={submit}/>
            </View>
            <FlatList
              data={questionData}
              style={{width: '100%', overflow: 'scroll', marginBottom: '10%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
              contentContainerStyle = {{}}
              renderItem={({item}) => {
                const dataToRender = item.data
                if (dataToRender) {
                  return (
                    <QuestionComponent dataToRender={dataToRender}>
                      <OptionsComponent data={dataToRender} colors={colors} styles={{questOptionsContainer: styles.questOptionsContainer, questOptionsButn: styles.questOptionsButn, questOptionsText: styles.questOptionsText}}/>
                    </QuestionComponent>
                  )
                } else (<></>)
              }}
              keyExtractor = {(item,index) => index}
            />
            <TouchableHighlight style={styles.submitButn} underlayColor='rgba(52, 52, 52, 0)' onPress={submit}>
              <Text style={styles.submitButnText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </Container>
      )
    case (shouldDisplayTimeSettings.current):
      return  (
        <Container>
          <View style={styles.optionsWrapper}>
            <View style={styles.optionsCont}>
              <View style={styles.headingWrapper}>
                <TouchableHighlight onPress={backFunc}>
                  <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                </TouchableHighlight>
                <Heading extraStyles={styles.heading}>
                  Select Time
                </Heading>
              </View>
              <ScrollView style={styles.optionsScroll}>
                <View style={styles.optionsCartegory}>
                  <TouchableHighlight onPress = {()=> changeSelection(1000*60*15, 'time')}>
                    <View style={styles.options}>
                      <CText style={styles.optionsText}>15mins</CText>
                      <CheckBox
                        value={selectedOptions.time === 1000*60*15}
                        onValueChange={()=> changeSelection(1000*60*15, 'time')}
                        tintColors={{true: colors.appColor}}
                      />
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress = {()=> changeSelection(1000*60*30, 'time')}>
                    <View style={styles.options}>
                      <CText style={styles.optionsText}>30mins</CText>
                      <CheckBox
                        value={selectedOptions.time === 1000*60*30}
                        onValueChange={()=> changeSelection(1000*60*30, 'time')}
                        tintColors={{true: colors.appColor}}
                      />
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress = {()=> changeSelection(1000*60*60, 'time')}>
                    <View style={styles.options}>
                      <CText style={styles.optionsText}>1hr</CText>
                      <CheckBox
                        value={selectedOptions.time === 1000*60*60}
                        onValueChange={()=> changeSelection(1000*60*60, 'time')}
                        tintColors={{true: colors.appColor}}
                      />
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress = {()=> changeSelection(1000*60*90, 'time')}>
                    <View style={styles.options}>
                      <CText style={styles.optionsText}>1hr 30mins</CText>
                      <CheckBox
                        value={selectedOptions.time === 1000*60*90}
                        onValueChange={()=> changeSelection(1000*60*90, 'time')}
                        tintColors={{true: colors.appColor}}
                      />
                    </View>
                  </TouchableHighlight><TouchableHighlight onPress = {()=> changeSelection(1000*60*60*2, 'time')}>
                    <View style={styles.options}>
                      <CText style={styles.optionsText}>2hrs</CText>
                      <CheckBox
                        value={selectedOptions.time === 1000*60*60*2}
                        onValueChange={()=> changeSelection(1000*60*60*2, 'time')}
                        tintColors={{true: colors.appColor}}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </ScrollView>
                <View style={styles.startButnWrapper}>
                <TouchableHighlight style={styles.startButnText} onPress={start} underlayColor={colors.underlayColor}><Text style={{color: colors.defaultText, textAlign: 'center'}}>Start</Text></TouchableHighlight>
              </View>
            </View>
          </View>
        </Container>
      )
      
    default:
      // console.log('testResults', testResults)
      return(
        <Container>
          <View style={styles.graphWrapper}>
            <ScrollView style={styles.graphScroll}>
              {listOfCourses.map(courseName=> {
                const testResult = testResults[courseName];
                if (testResult) {
                  let totalScore = 0
                  return  (
                    <View key={courseName} style={styles.graphContainer}>
                      <View style={styles.headingWrapper}>
                        <Heading extraStyles={styles.heading}>
                          Your Performance In {capitalize1stLetter(courseName)}
                        </Heading>
                      </View>
                      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} style={styles.graph} contentContainerStyle={{alignItems: 'flex-end', justifyContent: 'space-around'}} horizontal={true}>
                        {testResult.map((test, index)=> {
                          totalScore+= test.score
                          let barHeight = Math.round((test.score/test.noOfQuestionsAttempted)*100)
                          console.log('barHeight', barHeight)
                          barHeight = isNaN(barHeight)?0:barHeight
                          return (
                            <View key={index} style={[styles.barBody, {height: `${barHeight}%`}]}>
                              <View style={styles.graphBars}>
                              </View>
                              <Text style={{color: colors.defaultText}}>{barHeight}%</Text>
                            </View>
                          )
                        })}
                      </ScrollView>
                      <View style={styles.graphDetailsCont}>
                        <CText extraStyles={styles.graphDetails}>Ave. Score {'\n'+(totalScore>0?Math.ceil(totalScore/testResult.length):0)}</CText>
                        <CText extraStyles={styles.graphDetails}>Tests Taken {'\n'+testResult.length}</CText>
                      </View>
                      <View style={[styles.selectCourseButn, {marginBottom: '5%', height: '10%'}]}>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> changeSelection(courseName, 'course')} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Take Test</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> resetTestData(courseName).then(getAllTestResults)} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Reset</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={[styles.selectCourseButn, {marginBottom: '5%', height: '10%'}]}>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> resetTestData(courseName).then(getAllTestResults)} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Reset</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  )
                } else {
                  return  (
                    <View key={courseName} style={styles.graphContainer}>
                      <View style={styles.headingWrapper}>
                        <Heading extraStyles={styles.heading}>
                          Your Performance In {capitalize1stLetter(courseName)}
                        </Heading>
                      </View>
                      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} style={styles.graph} contentContainerStyle={{alignItems: 'flex-end', justifyContent: 'space-around'}} horizontal={true}>
                        <View style={styles.barBody}>
                          <View style={styles.graphBars}>
                          </View>
                          {/* <Text style={{color: colors.defaultText}}>0/0</Text> */}
                        </View>
                      </ScrollView>
                      <View style={styles.graphDetailsCont}>
                        <CText extraStyles={styles.graphDetails}>Ave. Score {'\n'+0}</CText>
                        <CText extraStyles={styles.graphDetails}>Tests Taken {'\n'+0}</CText>
                      </View>
                      <View style={[styles.selectCourseButn, {marginBottom: '5%', height: '10%'}]}>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> changeSelection(courseName, 'course')} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Take Test</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> resetTestData(courseName).then(getAllTestResults)} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Reset</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={[styles.selectCourseButn, {marginBottom: '5%', height: '10%'}]}>
                        <TouchableHighlight style={[styles.startButnText, {width: '100%', paddingHorizontal: '5%'}]} onPress={()=> resetTestData(courseName).then(getAllTestResults)} underlayColor={colors.underlayColor}>
                          <Text style={{color: colors.defaultText, textAlign: 'center'}}>Reset</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  )
                }
              })}
            </ScrollView>
          </View>
        </Container>
      )
    }
}

let timerInterval  = null
const TimerComponent = ({selectedTime, submitFunc}) => {
  const colors = useContext(ColorContext)
  const givingTime = useRef(0)
  const currentTime = useRef(0)
  const [displayedTime, setdisplayedTime] = useState('')
  const startCountDown = () => {
    givingTime.current = selectedTime
    currentTime.current = givingTime.current
    timerInterval = setInterval(() => {
      if (currentTime.current === 0) {
        submitFunc()
      } else {
        currentTime.current = currentTime.current<givingTime.current?
        (currentTime.current-1000):(givingTime.current-1000)
        setdisplayedTime(`${currentTime.current/3600000|0}:${(currentTime.current/60000|0)%60}:${(currentTime.current/1000|0)%60}`)
      }
    }, 1000);
  }

  useEffect(() => {
    startCountDown()
    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const styles = StyleSheet.create({
    heading: {
      textDecorationLine: 'none',
      alignSelf: 'auto',
      width: '100%'
    }
  })
  
  return (
    <Heading extraStyles={{... styles.heading, color: colors.darkText}}>
      {displayedTime}
    </Heading>
  )
  
}

const OptionsComponent = ({styles, data, colors}) => {
  const [displayData, setdisplayData] = useState({...data})

  return (
    <View style={[styles.questOptionsContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
      <TouchableHighlight onPress={()=> {
        data.userAns = 'A'
        setdisplayData({...data})
      }} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, displayData.userAns==='A'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
        <Text style={styles.questOptionsText}>A</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> {
        data.userAns = 'B'
        setdisplayData({...data})
      }} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, displayData.userAns==='B'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
        <Text style={styles.questOptionsText}>B</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> {
        data.userAns = 'C'
        setdisplayData({...data})
      }} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, displayData.userAns==='C'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
        <Text style={styles.questOptionsText}>C</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=> {
        data.userAns = 'D'
        setdisplayData({...data})
      }} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, displayData.userAns==='D'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
        <Text style={styles.questOptionsText}>D</Text>
      </TouchableHighlight>
    </View>
  )
}
  
export default CbtScreen