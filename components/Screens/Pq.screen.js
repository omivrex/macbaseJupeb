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
import {useEffect, useRef, useContext, useState, useCallback} from 'react';
import Container from '../Reusable/Container.component';
import { 
  getBranchData,
  capitalize1stLetter,
  getQuestionSelection,
} from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AnswerComponent from '../Reusable/Answer.component';
import NavigationContext from '../context/Nav.context';
import QuestionComponent from '../Reusable/Question.component';
import { useFocusEffect } from '@react-navigation/native';

const PqScreen = ({navigation}) => {
  /** below is to be Rendered in the form {
    course: {value: string, index: number},
    ...
  } */
  const path = useRef({
    course: null, 
    year: null,
    section: null
  })
  
  const colors = useContext(ColorContext)
  const [indexOfSelectedItem, set_indexOfSelectedItem] = useState(null)
  const [dataToRender, set_dataToRender] = useState([])
  const [ansData, set_ansData] = useState('')
  const renderQuestionData = useRef(false)
  const label = useRef('Course')
  const subCollectionData = useRef({})
  const selectedCourse = useRef('')

  useFocusEffect(
    useCallback(() => {
      getListOfCourses()
      return BackHandler.removeEventListener('hardwareBackPress', ()=> console.log('backhandler removed'))
    }, [])
  )

  const getListOfCourses = () => {
    getBranchData(0).then(savedCourses => {
      renderCollectionData(savedCourses)
    }).catch((err) => {
      console.log(err)
    })
  }

  const renderCollectionData = (collectionData) => {
    const [extractedLabel] = Object.keys(collectionData[0])
    label.current = capitalize1stLetter(extractedLabel)
    set_dataToRender([... collectionData])
  }

  const changeSelection = (key) => {
    selectedCourse.current =  label.current === 'Course'?dataToRender[key].course:selectedCourse.current
    set_indexOfSelectedItem(key)
  }

  const getCourseData = (level, courseName = selectedCourse.current) => {
    return new Promise((resolve, reject) => { 
      getBranchData(level, courseName).then(dataToRender => {
        subCollectionData.current = [... dataToRender]
        resolve(subCollectionData.current)
      }).catch(err=> reject(err))
    })
  }

  const next = () => {
    if (indexOfSelectedItem !== null) {
      if (dataToRender[indexOfSelectedItem]) {
        const [selectedItemValue] = Object.values(dataToRender[indexOfSelectedItem])
        path.current[label.current.toLowerCase()] = {value: selectedItemValue, index: indexOfSelectedItem}
        switch (label.current) {
          case "Course":
            getCourseData(1)
            .then(renderCollectionData)
          break;
          case "Section":
            getQuestionSelection(path.current)
            .then(questions=> {
              renderQuestionData.current = true
              questions?.length?set_dataToRender([...questions]):null
            })
          break;  
          default:
            getCourseData(2)
            .then(renderCollectionData)
            break;
        }
      }
    } else {
      ToastAndroid.show(`You Have Not Selected Any ${label.current} Yet`, ToastAndroid.LONG);
    } 
    set_indexOfSelectedItem(null)
  }

  const previous = () => {
    let level = Object.values(path.current).filter(Boolean).length
    level = level === 0?-1:level
    if (level>-1) {
      if (ansData !== '') {
        set_ansData('')
        // return true
      } else {
        if (renderQuestionData.current) {
          renderQuestionData.current = false
        }
        const keys = Object.keys(path.current)
        let index = keys.length - 1
        while (path.current[keys[index]] === null && index>0) { /** start with the last property if its null move to the next untill you reach the final property where the index is 0*/
          index--
        }
        path.current[keys[index]] = null
        level = Object.values(path.current).filter(Boolean).length
        getCourseData(level)
        .then(renderCollectionData)
      }
    }
    selectedCourse.current = level === 1? '':selectedCourse.current
    return level>-1
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    try {
      return previous() && navigation.isFocused()
    }
    catch (err) {
      ToastAndroid.show(err, ToastAndroid.LONG);
      return false;
    }
  });

  const showAns = (dataToRender) => {
    set_ansData(dataToRender)
  }

  const styles = StyleSheet.create({
    optionsWrapper: {
      width: '100%',
      height: '100%',
      // backgroundColor: '#77777794',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },

    optionsCont: {
      width: '85%',
      flex: 0.8,
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: colors.backgroundColor,
    },

    headingWrapper: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      alignContent: 'space-around',
      marginBottom: '10%',
      paddingHorizontal: '5%'
    },
    
    heading: {
      textAlign: 'center',
      flex: 1,
      paddingVertical: '5%',
      textDecorationLine: 'none',
      fontSize: hp('3%'),
      color: colors.tabColor,
      alignItems: 'center'
    },

    optionsScroll: {
      width: '100%',
      height: '88%',
      marginVertical: '5%',
      overflow: 'scroll',
    },

    options: {
      flexDirection: 'row',
      width: '90%',
      marginHorizontal: '5%',
      marginVertical: '5%',
      flex: 1,
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
      fontSize: hp('3%')
    },

    optionButnWrapper: {
      backgroundColor: colors.tabColor,
      borderRadius: 50,
      height: '10%',
      width: '40%',
      marginVertical: '10%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },

    optionButns: {
      color: colors.appWhite,
      textAlign: 'center',
      width: '100%',
      height: '100%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
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

    pqDataWrapper: {
      borderColor: colors.appColor,
      borderBottomWidth: 2,
      width: '90%',
      marginVertical: hp('3%'),
      left: '5%',
      justifyContent: 'center'
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
      // fontSize: hp('2.5%'),
      textAlign: 'center'
    },
  })
  
  return (
    <Container>
      {!renderQuestionData.current? 
        (
          <View style={styles.optionsWrapper}>
            <View style={styles.optionsCont}>
              <View style={styles.headingWrapper}>
                <TouchableHighlight onPress={previous}>
                  <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
                </TouchableHighlight>
                <Heading extraStyles={styles.heading}>
                  Select {label.current}
                </Heading>
              </View>
              <ScrollView style={styles.optionsScroll}>
                  {dataToRender.length?
                    dataToRender.map((item, index)=> {
                      return (
                        <View key={index}>
                          <TouchableHighlight underlayColor={colors.underlayColor} style={styles.options} key={index.toString()} onPress = {()=> changeSelection(index)}>
                            <>
                              <CText style={styles.optionsText}>{Object.values(item)[0].toUpperCase()}</CText>
                              <CheckBox
                                value={indexOfSelectedItem === index? true:false}
                                onValueChange={()=> changeSelection(index)}
                                tintColors={{true: colors.appColor}}
                              />
                            </>
                          </TouchableHighlight>
                        </View>
                      )
                    })
                  : 
                    <View style={styles.loadingBox}>
                      <CText extraStyles={{textAlign: 'center'}}>You Haven't Downloaded Any Course Yet!</CText>
                    </View>
                  }
              </ScrollView>
              <View style={styles.optionButnWrapper}>
                <TouchableHighlight style={styles.optionButns} onPress={next} underlayColor={colors.underlayColor}><Text style={{color: colors.defaultText, textAlign: 'center', fontSize: hp('2.5%')}}>Next</Text></TouchableHighlight>
              </View>
            </View>
          </View>
        )
      :
        (
          <View style={{width: '100%'}}>
            <View style={{...styles.headingWrapper, ...{width: '100%'}}}>
              <TouchableHighlight onPress={previous}>
                <Ionicons name="ios-arrow-back" size={40} color={colors.iconColor} />
              </TouchableHighlight>
            </View>
            <FlatList
              data={dataToRender}
              contentContainerStyle = {{width: '100%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
              renderItem={({item}) => {
                const {data} = item
                return (
                  <QuestionComponent dataToRender={data}>
                    <TouchableHighlight underlayColor={colors.underlayColor} style={styles.ansButn} onPress={()=> {
                      item?.data?.correctOption?
                          Alert.alert(`Answer: ${item?.data? item.data.correctOption:''}`, '', [
                            {
                              text: 'Solution',
                              onPress: ()=> showAns(item?.data? {answer: item.data.answer, correctAnswer: item.data.correctOption}:'')
                            },

                            {
                              text: 'Cancel',
                              onPress: () => ''
                            }
                          ], {cancelable: true})
                      : showAns(item?.data? {answer: item.data.answer, correctAnswer: item.data.correctOption}:'no answwer')
                    }}>
                      <Text style = {styles.ansButnText}>ANSWER</Text>
                    </TouchableHighlight>
                  </QuestionComponent>
                )
              }}
              keyExtractor = {(item,index) => index.toString()}
            />
          </View>
        )
      }
      <AnswerComponent extraStyles={{display:ansData !== ''?'flex':'none'}} data={ansData} />
    </Container>
  )
}
  
  
  export default PqScreen