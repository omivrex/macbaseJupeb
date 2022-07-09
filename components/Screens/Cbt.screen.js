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

  console.log(selectedOptions)
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

  const start = () => {
    getAllQuestionsInCourse(...selectedOptions.courses)
    .then(questions => {
      const randomQuestions = shuffleAndCutQuestions([...questions], 50)
      console.log('randomQuestions', randomQuestions)
    }).catch(err=> console.log(err))
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

    loadingBox: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },

    loadingText: {
      fontSize: hp('2.5%'),
      textAlign: 'center'
    },
  })

  return (
    <Container>
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
              <TouchableHighlight onPress = {()=> changeSelection('15mins', 'time')}>
                <View style={styles.options}>
                  <CText style={styles.optionsText}>15mins</CText>
                  <CheckBox
                    value={selectedOptions.time === '15mins'}
                    onValueChange={()=> changeSelection('15mins', 'time')}
                    tintColors={{true: colors.appColor}}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress = {()=> changeSelection('30mins', 'time')}>
                <View style={styles.options}>
                  <CText style={styles.optionsText}>30mins</CText>
                  <CheckBox
                    value={selectedOptions.time === '30mins'}
                    onValueChange={()=> changeSelection('30mins', 'time')}
                    tintColors={{true: colors.appColor}}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress = {()=> changeSelection('1hr', 'time')}>
                <View style={styles.options}>
                  <CText style={styles.optionsText}>1hr</CText>
                  <CheckBox
                    value={selectedOptions.time === '1hr'}
                    onValueChange={()=> changeSelection('1hr', 'time')}
                    tintColors={{true: colors.appColor}}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress = {()=> changeSelection('1hr 30mins', 'time')}>
                <View style={styles.options}>
                  <CText style={styles.optionsText}>1hr 30mins</CText>
                  <CheckBox
                    value={selectedOptions.time === '1hr 30mins'}
                    onValueChange={()=> changeSelection('1hr 30mins', 'time')}
                    tintColors={{true: colors.appColor}}
                  />
                </View>
              </TouchableHighlight><TouchableHighlight onPress = {()=> changeSelection('2hrs', 'time')}>
                <View style={styles.options}>
                  <CText style={styles.optionsText}>2hrs</CText>
                  <CheckBox
                    value={selectedOptions.time === '2hrs'}
                    onValueChange={()=> changeSelection('2hrs', 'time')}
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
}
  
  
export default CbtScreen