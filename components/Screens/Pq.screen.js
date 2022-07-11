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
import MathJax from 'react-native-mathjax';
import {useEffect, useRef, useContext, useState} from 'react';
import Container from '../Reusable/Container.component';
import { getOfflineCollections, getSectionsLocalQuestions, loadAllSavedCourses, loadCourseData } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AnswerComponent from '../Reusable/Answer.component';
import NavigationContext from '../context/Nav.context';
import QuestionComponent from '../Reusable/Question.component';

const PqScreen = ({navigation}) => {
  /** below is th the form {
    course: {value: string, index: number},
    ...
  } */
  const path = useRef({
    course: null, 
    year: null,
    subject: null,
    section: null
  })
  
  const colors = useContext(ColorContext)
  // const navigation = useContext(NavigationContext)
  const [selected, set_selected] = useState(null)
  const [data, set_data] = useState([])
  const [ansData, set_ansData] = useState('')
  const renderQuestionData = useRef(false)
  const label = useRef('Course')
  const subCollectionData = useRef({})
  const selectedCourseData = useRef([])

  useEffect(() => {
    getListOfCourses()
  }, [])

  const getListOfCourses = () => {
    loadAllSavedCourses().then(savedCourses => {
      const tempArr = [... savedCourses]
      for (let index = 0; index < savedCourses.length; index++) {
        const course = savedCourses[index];
        tempArr[index] = {courseName: course}
      }
      renderCollectionData(tempArr)
    }).catch((err) => {
      console.log(err)
    })
  }

  const renderCollectionData = collectionData => {
    const [extractedLabel] = Object.keys(collectionData[0])
    label.current = extractedLabel !== 'courseName' ? capitalize1stLetter(extractedLabel): 'Course'
    set_data([... collectionData])
  }

  const capitalize1stLetter = ([first, ...rest]) =>{
    return first.toUpperCase() + rest.join("").toLowerCase()
  }; 

  const changeSelection = (key) => {
    set_selected(key)
  }

  const getCourseData = (courseName) => {
    return new Promise((resolve, reject) => { 
      loadCourseData(courseName).then(data => {
        selectedCourseData.current = [...data]
        subCollectionData.current = {data: [... extractSubCollections(data)]}
        resolve(subCollectionData.current.data)
      }).catch(err=> reject(err))
    })
  }

  const extractSubCollections = (ItemData) => {
    const subCollections = []
    ItemData.forEach(subCollection => {
      const {data, ...label} = subCollection
      subCollections.push({...label})
    });
    return subCollections
  }
  
  const next = () => {
    if (selected !== null) {
      if (data[selected]) {
        const [selectedItem] = Object.values(data[selected])
        switch (label.current) {
          case "Course":
            path.current[label.current.toLowerCase()] = {value: selectedItem, index: selected}
            getCourseData(selectedItem)
            .then(renderCollectionData)
          break;
          case "Section":
            const listOfQuestions = getOfflineCollections(path.current, selectedCourseData.current)
            path.current[label.current.toLowerCase()] = {value: selectedItem,index: selected}
            const tempArray = []
            listOfQuestions.forEach(question => {
              tempArray.push({data: getSectionsLocalQuestions(path.current, question, selectedCourseData.current)})
            });
            renderQuestionData.current = true
            tempArray.length?set_data([...tempArray]):null
          break;  
          default:
            path.current[label.current.toLowerCase()] = {value: selectedItem,index: selected}
            const {course, ...pathToUse} = path.current
            const returnedData = getOfflineCollections(pathToUse, selectedCourseData.current)
            renderCollectionData(returnedData)
            break;
        }
      }
    } else {
      ToastAndroid.show(`You Have Not Selected Any ${label.current} Yet`, ToastAndroid.LONG);
    } 
    set_selected(null)
  }

  const previous = () => {
    const previousLabel = label.current
    if (ansData !== '') {
      set_ansData('')
      return true
    } else {
      if (renderQuestionData.current) {
        renderQuestionData.current = false
      }
      console.log('test previous', Object.values(path.current).filter(Boolean))
      if (Object.values(path.current).filter(Boolean).length > 0) {
        const keys = Object.keys(path.current)
        let index = keys.length - 1
        while (path.current[keys[index]] === null && index>0) { /** start with the last property if its null move to the next untill you reach the final property where the index is 0*/
          index--
        }
        path.current[keys[index]] = null
        console.log('previous test', Object.values(path.current))
        if (previousLabel === 'Year') {
          getListOfCourses() 
        } else {
          const collectionData = getOfflineCollections(path.current, selectedCourseData.current)
          renderCollectionData(collectionData)
        }
        label.current === 'Questionnumber'?previous():null
        return true
      } else {
        getListOfCourses()
      }
      return false
    }
  }

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   try {
  //     // console.log('Test alpha', Object.values(path.current).filter(Boolean).length && navigation.isFocused())
  //     return previous() && navigation.isFocused()
  //   }
  //   catch (err) {
  //     ToastAndroid.show(err, ToastAndroid.LONG);
  //     return true;
  //   }
  // });

  const showAns = (data) => {
    set_ansData(data)
    console.log('ansData', ansData)
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
      fontSize: hp('2.5%'),
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
                  {data.length?
                    data.map((item, index)=> {
                      return (
                        <View key={index}>
                          <TouchableHighlight underlayColor={colors.underlayColor} style={styles.options} key={index.toString()} onPress = {()=> changeSelection(index)}>
                            <>
                              <CText style={styles.optionsText}>{Object.values(item)[0].toUpperCase()}</CText>
                              <CheckBox
                                value={selected === index? true:false}
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
                      <CText extraStyles={styles.loadingText}>Loading...</CText>
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
              {/* <Heading extraStyles={{... styles.heading, ...{color: colors.defaultText}}}>
                {([... Object.values(path.current)]).filter(item=> item&&item.value !== undefined).join(' > ')}
              </Heading> */}
            </View>
            <FlatList
              data={data}
              contentContainerStyle = {{width: '90%', left: '5%', alignContent: 'space-around', backgroundColor: colors.backgroundColor}}
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