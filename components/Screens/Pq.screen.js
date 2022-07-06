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
import { getOnlineCollections } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AnswerComponent from '../Reusable/Answer.component';

const PqScreen = () => {
  const path = useRef('pastquestions')
  const colors = useContext(ColorContext)
  const [selected, set_selected] = useState(null)
  const [data, set_data] = useState([])
  const [ansData, set_ansData] = useState('')
  const renderQuestionData = useRef(false)
  const label = useRef('Course')
  const selection = useRef([])

  useEffect(() => {
    getOnlineCollections(path.current).then((returnedData) => {
      renderCollectionData(returnedData)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  
  const renderCollectionData = (returnedData) => {
    if (returnedData.length) {
      const extractedLabel = Object.keys(returnedData[0])[0]
      // returnedData = [... returnedData.flatMap(i => [i,i, i,i, i,i])]
      if (extractedLabel === 'questionNumber') {
        let tempArr = []
        returnedData.forEach((question, index) => {
          const [questionNumber] = Object.values(question)
          getOnlineCollections(path.current+`/${questionNumber}/${questionNumber}`)
          .then(questionData=>tempArr.push(questionData)).then(()=> {
            if (index===returnedData.length-1) {
              renderQuestionData.current = true
              tempArr = [... tempArr.flat()]
              set_data([... tempArr])
            }
          }).catch(err=> console.log(err))
        });
      } else {
        label.current = extractedLabel !== 'courseName' ? capitalize1stLetter(extractedLabel): 'Course'
        set_data([... returnedData])
        set_selected(null)
      }
    }
  }

  const capitalize1stLetter = ([first, ...rest]) =>{
    return first.toUpperCase() + rest.join("").toLowerCase()
  }; 

  const changeSelection = (key) => {
    console.log(label)
    set_selected(key)
  }
  
  const next = () => {
    if (selected !== null) {
      selection.current.push(selected)
      if (data[selected]) {
        const [selectedItem] = Object.values(data[selected])
        path.current += `/${selectedItem}/${selectedItem}`
        set_data([])
        getOnlineCollections(path.current).then(renderCollectionData).catch((err) => {
          console.log(err)
        })
      }
    } else {
      Alert.alert('', `You Have Not Selected Any ${label.current} Yet`)
    }  
  }

  const previous = () => {
    if (ansData !== '') {
      set_ansData('')
      return true
    } else {
      if (renderQuestionData.current) {
        renderQuestionData.current = false
      }
      if (selection.current.length > 0) {
        set_data([])
        const pathArr = path.current.split('/')
        pathArr.pop()
        pathArr.pop()
        path.current = pathArr.join('/')
        const lastKey = selection.current[selection.current.length-1]
        getOnlineCollections(path.current).then(renderCollectionData).then(() => {
          set_selected(lastKey)
          selection.current.pop()
        }).catch((err) => {
          console.log(err)
        })
        return true
      }
      return false
    }
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    previous()
    return selection.current.length>0
  });

  const showAns = (data) => {
    console.log('called...')
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
              <Heading extraStyles={{... styles.heading, ...{color: colors.defaultText}}}>
                {([... new Set(path.current.replace('pastquestions/', '').toUpperCase().split('/'))]).join(' > ')}
              </Heading>
            </View>
            <FlatList
              data={data}
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
                                            ${item&&item.Data?item.Data.question.replace('max-width: 180px;', 'max-width: 90vw;'):'<h2 style="color: red;">Network Error!</h2>'}
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
                        <TouchableHighlight underlayColor={colors.underlayColor} style={styles.ansButn} onPress={()=> {
                            item?.Data?.correctOption?
                                Alert.alert(`Answer: ${item?.Data? item.Data.correctOption:''}`, '', [
                                  {
                                    text: 'Solution',
                                    onPress: ()=> showAns(item?.Data? {answer: item.Data.answer, correctAnswer: item.Data.correctOption}:'')
                                  },

                                  {
                                    text: 'Cancel',
                                    onPress: () => ''
                                  }
                                ], {cancelable: true})
                            : showAns(item?.Data? {answer: item.Data.answer, correctAnswer: item.Data.correctOption}:'no answwer')
                        }}>
                            <Text style = {styles.ansButnText}>ANSWER</Text>
                        </TouchableHighlight>
                    </View>
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