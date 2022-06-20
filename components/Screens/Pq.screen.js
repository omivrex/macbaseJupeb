import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {useEffect, useRef, useContext, useState} from 'react';
import Container from '../Reusable/Container.component';
import { getOnlineCollections } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const PqScreen = () => {
  const path = useRef('pastquestions')
  const colors = useContext(ColorContext)
  const [selected, set_selected] = useState(null)
  const [data, set_data] = useState([])
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
    returnedData = [... returnedData.flatMap(i => [i,i, i,i, i,i])]
    const extractedLabel = Object.keys(returnedData[0])[0]
    label.current = extractedLabel !== 'courseName' ? capitalize1stLetter(extractedLabel): capitalize1stLetter(label.current)
    console.log('pqData:', returnedData)
    set_data([... returnedData])
    set_selected(null)
  }

  const capitalize1stLetter = ([first, ...rest]) =>{
    console.log('test', first, rest)
    return first.toUpperCase() + rest.join("").toLowerCase()
  }; 

  const changeSelection = (key) => {
    console.log(label)
    set_selected(key)
  }
  
  const next = () => {
    if (selected !== null) {
      selection.current.push(selected)
      const [selectedItem] = Object.values(data[selected])
      path.current += `/${selectedItem}/${selectedItem}`
      getOnlineCollections(path.current).then(renderCollectionData).catch((err) => {
        console.log(err)
      })
    } else {
      Alert.alert('', `You Have Not Selected Any ${label.current} Yet`)
    }  
  }

  const previous = () => {
    if (selection.current.length) {
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
    }
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
      width: '75%',
      height: '80%',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
    },

    headingWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignContent: 'space-between',
      width: '100%'
    },
    
    heading: {
      fontSize: hp('3%'),
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

    options: {
      flexDirection: 'row',
      width: '90%',
      marginHorizontal: '5%',
      marginVertical: '5%',
      flex: 1,
      paddingVertical: '2%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-around',
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
      // flex: 1,
      height: '12%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignContent: 'center',
      // backgroundColor: 'red',
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
    }

  })
  
  return (
    <Container>
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
              {data.map((item, index)=> {
                return (
                  <View key={index.toString()} style={styles.options}>
                    <CText style={styles.optionsText}>{Object.values(item)[0].toUpperCase()}</CText>
                    <CheckBox
                      value={selected === index? true:false}
                      onValueChange={()=> changeSelection(index)}
                      tintColors={{true: colors.appColor}}
                    />
                  </View>
                )
              })}
          </ScrollView>
          <View style={styles.optionButnWrapper}>
            <TouchableHighlight style={styles.optionButns} onPress={next} underlayColor={colors.underlayColor}><Text style={{color: colors.defaultText, textAlign: 'center'}}>Next</Text></TouchableHighlight>
          </View>
        </View>
      </View>
    </Container>
  )
}
  
  
  export default PqScreen