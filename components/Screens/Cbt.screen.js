import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableHighlight,
  Alert,
  BackHandler,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import MathJax from 'react-native-mathjax';
import {useEffect, useRef, useContext, useState} from 'react';
import Container from '../Reusable/Container.component';
import { getAllQuestionsInCourse, loadAllSavedCourses, shuffleAndCutQuestions } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AnswerComponent from '../Reusable/Answer.component';
import QuestionComponent from '../Reusable/Question.component';

const CbtScreen = () => {
  const colors = useContext(ColorContext)
  const [listOfCourses, set_listOfCourses] = useState([])
  const [selectedOptions, set_selectedOptions] = useState({
    time: null,
    courses: [],
  })
  const shouldRenderQuestions = useRef(false)
  const shouldRenderResult = useRef(false)
  const [questionData, set_questionData] = useState([])

  useEffect(() => {
    getListOfCourses()
  }, [])

  const getListOfCourses = () => {
    loadAllSavedCourses().then(savedCourses => {
      renderCollectionData(savedCourses)
    }).catch((err) => {
      console.log(err)
    })
  }

  const renderCollectionData = collectionData => {
    set_listOfCourses([... collectionData])
  }

  const changeSelection = (value, type) => {
    switch (type) {
      case 'time':
        set_selectedOptions({... selectedOptions, time: value})
        break;
      default:
        set_selectedOptions({... selectedOptions, courses:  !selectedOptions.courses.includes(value)? [... new Set(selectedOptions.courses.concat(value))]: [... selectedOptions.courses.filter(item=> item !== value)]})
      break;
    }
  }

  const start = async () => {
    const {courses} = selectedOptions
    let questions = []
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      questions = [... questions, ...(await getAllQuestionsInCourse(course))]
    }
    const randomQuestions = shuffleAndCutQuestions([...questions.filter(Boolean)], 50)
    displayQuestions(randomQuestions)
    runCountDown()
  }

  const displayQuestions = (dataToDisplay = questionData) => {
    shouldRenderQuestions.current = true
    set_questionData([... dataToDisplay])
  }

  const timerInterval  = useRef(null)
  const givingTime = useRef(0)
  const currentTime = useRef(0)
  const runCountDown = () => {
    givingTime.current = selectedOptions.time
    currentTime.current = givingTime.current
    timerInterval.current = setInterval(() => {
      if (currentTime.current === 0) {
        submit()
      } else {
        currentTime.current = currentTime.current<givingTime.current?
        (currentTime.current-1000):(givingTime.current-1000)
        set_selectedOptions({... selectedOptions})
      }
    }, 1000);
  }

  const backFunc = () => {
    if (ansData !== '') {
      set_ansData('')
    } else {
      shouldRenderQuestions.current = false
      shouldRenderResult.current = false
      clearInterval(timerInterval.current)
      score.current = 0
      noOfQuestionsAttempted.current = 0
      set_questionData([... questionData])
    }
  }

  const submit = () => {
    backFunc()
    markTest()
    renderResult()
  }

  const score = useRef(0)
  const noOfQuestionsAttempted = useRef(0)
  const markTest = () => {
    questionData.forEach((question) => {
      if (question.data) {
        const {data} = question.data
        if (data.correctOption === data.userAns || data.correctOption === '' && data.userAns != '') { // if user got the answer or if there is no correct option but th user attempted the question
          score.current++
        }
        
        if (data.userAns) {
          noOfQuestionsAttempted.current++
        }
      }
    });
  }

  const renderResult = () => {
    Alert.alert('', `You Scored ${score.current} and Attempted ${noOfQuestionsAttempted.current}`)
    shouldRenderResult.current = true
  }

  const [ansData, set_ansData] = useState('')
  const showAns = (data) => {
    set_ansData(data)
  }

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
      backgroundColor: colors.backgroundColor,
    },

    headingWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignContent: 'space-around',
      width: '100%'
    },
    
    heading: {
      textDecorationLine: 'none',
      textAlign: 'center',
      flex: 1,
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
      backgroundColor: colors.appColor,
      color: colors.defaultText,
      marginBottom: '5%',
      height: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      borderRadius: 10,
      textAlign: 'center',
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
      backgroundColor: colors.appColor,
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
      borderColor: colors.appColor,
      borderBottomWidth: 2,
      width: '90%',
      marginVertical: hp('3%'),
      left: '5%',
      justifyContent: 'center'
    },

    questOptionsContainer: {
      width: '100%',
      flexDirection: 'row',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      justifyContent: 'space-around',
      backgroundColor: colors.appColor,
    },

    questOptionsButn: {
      // width: '17%',
      flex: 4,
      height: 40,
      alignItems: 'center',
      borderRightColor: colors.appWhite,
      borderLeftColor: colors.appWhite,
      borderWidth: 2,
      borderBottomWidth: 0,
      borderTopWidth: 0,
      borderStyle: 'solid',
      justifyContent: 'center',
    },

    questOptionsText: {
      color: colors.defaultText,
      fontSize: 25,
      width: '100%',
      textAlign: 'center',
    },

    ansButn: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      left: '35%',
      padding: 6,
      backgroundColor: colors.appColor,
      width: '30%',
    },

    ansButnText: {
      color: colors.defaultText,
      fontSize: hp('2.5%'),
      textAlign: 'center'
    },

    submitButn: {
      position: 'absolute',
      width: '40%',
      height: '10%',
      top: '90%',
      alignSelf: 'center',
      flexDirection: 'column',
      backgroundColor: colors.appColor,
      justifyContent: 'center',
    },
    
    submitButnText: {
      color: colors.defaultText,
      width: '100%',
      fontSize: hp('3.3%'),
      textAlign: 'center',
    },
  })

  return (
    <Container>
      {(()=> {
        switch (true) {
          case (shouldRenderResult.current):
            return (
              <View style={{width: '100%'}}>
                <View style={{...styles.headingWrapper, ...{width: '100%'}}}>
                  <TouchableHighlight onPress={backFunc}>
                    <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                  </TouchableHighlight>
                  <Heading extraStyles={{... styles.heading, ...{color: colors.defaultText}}}>
                    {`You Scored ${score.current} and Attempted ${noOfQuestionsAttempted.current}`}
                  </Heading>
                </View>
                <FlatList
                  data={questionData}
                  contentContainerStyle = {{width: '90%', left: '5%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
                  renderItem={({item}) => {
                    const dataToRender = item?.data?.data
                    if (dataToRender) {
                      // console.log('dataToRender', dataToRender.userAns, dataToRender.correctOption)
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
            )
          case (shouldRenderQuestions.current):
            return (
              <View style={{width: '100%'}}>
                <View style={{...styles.headingWrapper, ...{width: '100%'}}}>
                  <TouchableHighlight onPress={backFunc}>
                    <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                  </TouchableHighlight>
                  <Heading extraStyles={{... styles.heading, ...{color: colors.defaultText}}}>
                    {currentTime.current/3600000|0}:{(currentTime.current/60000|0)%60}:{(currentTime.current/1000|0)%60}
                  </Heading>
                </View>
                <FlatList
                  data={questionData}
                  contentContainerStyle = {{width: '90%', left: '5%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
                  renderItem={({item}) => {
                    const dataToRender = item?.data?.data
                    if (dataToRender) {
                      return (
                        <QuestionComponent dataToRender={dataToRender}>
                          <View style={[styles.questOptionsContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                            <TouchableHighlight onPress={()=> dataToRender.userAns = 'A'} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, dataToRender.userAns==='A'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
                                <Text style={styles.questOptionsText}>A</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=> dataToRender.userAns = 'B'} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, dataToRender.userAns==='B'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
                                <Text style={styles.questOptionsText}>B</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=> dataToRender.userAns = 'C'} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, dataToRender.userAns==='C'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
                                <Text style={styles.questOptionsText}>C</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=> dataToRender.userAns = 'D'} underlayColor={colors.underlayColor} style={[styles.questOptionsButn, dataToRender.userAns==='D'?{backgroundColor: colors.iconColor}:{backgroundColor: colors.appColor}]}>
                                <Text style={styles.questOptionsText}>D</Text>
                            </TouchableHighlight>
                          </View>
                        </QuestionComponent>
                      )
                    } else (<></>)
                  }}
                  keyExtractor = {(item,index) => index.toString()}
                />
                <TouchableHighlight style={styles.submitButn} underlayColor='rgba(52, 52, 52, 0)' onPress={submit}>
                  <Text style={styles.submitButnText}>Submit</Text>
                </TouchableHighlight>
              </View>
            )
          default:
          return  (
              <View style={styles.optionsWrapper}>
                <View style={styles.optionsCont}>
                  <ScrollView style={styles.optionsScroll}>
    
                    <View style={styles.optionsCartegory}>
                      <View style={styles.headingWrapper}>
                        <Heading extraStyles={styles.heading}>
                          Select Course
                        </Heading>
                      </View>
                      {listOfCourses.map((course, index)=> {
                        return (
                          <TouchableHighlight key={index} onPress = {()=> changeSelection(course, 'course')}>
                            <View style={styles.options}>
                              <CText style={styles.optionsText}>{course}</CText>
                              <CheckBox
                                value={selectedOptions.courses.includes(course)}
                                onValueChange={()=> changeSelection(course, 'course')}
                                tintColors={{true: colors.appColor}}
                              />
                            </View>
                          </TouchableHighlight>
                        )
                      })}
                    </View>
    
                    <View style={styles.optionsCartegory}>
                      <View style={styles.headingWrapper}>
                        <Heading extraStyles={styles.heading}>
                          Select Time
                        </Heading>
                      </View>
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
    
            )
          }
        })()
      }
      <AnswerComponent extraStyles={{display:ansData !== ''?'flex':'none'}} data={ansData} />
    </Container>
  )
}
  
  
export default CbtScreen