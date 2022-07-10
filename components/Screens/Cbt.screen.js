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

const CbtScreen = () => {
  const colors = useContext(ColorContext)
  const [listOfCourses, set_listOfCourses] = useState([])
  const [selectedOptions, set_selectedOptions] = useState({
    time: null,
    courses: [],
  })
  const renderQuestions = useRef(false)
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
    console.log('randomQuestions', randomQuestions)
    displayQuestions(randomQuestions)
    runCountDown()
  }

  const displayQuestions = (dataToDisplay = questionData) => {
    renderQuestions.current = true
    set_questionData([... dataToDisplay])
  }

  const timerInterval  = useRef(null)
  const givingTime = useRef(0)
  const currentTime = useRef(0)
  const runCountDown = () => {
    givingTime.current = selectedOptions.time
    currentTime.current = givingTime.current
    timerInterval.current = setInterval(() => {
      console.log('called...')
      currentTime.current = currentTime.current<givingTime.current?
      (currentTime.current-1000):(givingTime.current-1000)
      set_selectedOptions({... selectedOptions})
    }, 1000);
  }

  const backFunc = () => {
    renderQuestions.current = false
    clearInterval(timerInterval.current)
    set_questionData([])
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
  })

  
  return (
    <Container>
      {!renderQuestions.current?
        (
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
        :(
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
                return (
                  <View style={styles.pqDataWrapper}>
                    <MathJax
                      html={
                          `
                              <head>
                                  <meta name="viewport"  content="width=device-width, initial-scale=1.0 maximum-scale=1.0">
                              </head>
                              <body>
                                  <style>
                                      * {
                                        -webkit-user-select: none;
                                        -moz-user-select: none;
                                        -ms-user-select: none;
                                        user-select: none;
                                        overflow-x: show;
                                        max-width: '100%'
                                      }
                                  </style>
                                  <div style="font-size: 1em; font-family: Roboto, sans-serif, san Francisco;">
                                      ${item?.data?.data?item.data.data.question.replace('max-width: 180px;', 'max-width: 90vw;'):`<h2 style="color: #777; text-align: center">Something Went Wrong!</h2>`}
                                  </div> 
                              </body>
                          
                          `
                      }
                      mathJaxOptions={{
                          messageStyle: "none",
                          extensions: ["tex2jax.js"],
                          jax: ["input/TeX", "output/HTML-CSS"],
                          showMathMenu: false,
                          tex2jax: {
                              inlineMath: [
                                  ["$", "$"],
                                  ["\\(", "\\)"],
                              ],
                              displayMath: [
                                  ["$$", "$$"],
                                  ["\\[", "\\]"],
                              ],
                              processEscapes: true,
                          },
                          TeX: {
                              extensions: [
                                  "AMSmath.js",
                                  "AMSsymbols.js",
                                  "noErrors.js",
                                  "noUndefined.js",
                              ],
                          },

                      }}
                      style={{width: '100%'}}
                    />
                    <View style={[styles.questOptionsContainer, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                      <TouchableHighlight underlayColor={colors.underlayColor} style={styles.questOptionsButn}>
                          <Text style={styles.questOptionsText}>A</Text>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.underlayColor} style={styles.questOptionsButn}>
                          <Text style={styles.questOptionsText}>B</Text>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.underlayColor} style={styles.questOptionsButn}>
                          <Text style={styles.questOptionsText}>C</Text>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.underlayColor} style={styles.questOptionsButn}>
                          <Text style={styles.questOptionsText}>D</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                )
              }}
              keyExtractor = {(item,index) => index.toString()}
            />
          </View>
        )
      }
    </Container>
  )
}
  
  
export default CbtScreen