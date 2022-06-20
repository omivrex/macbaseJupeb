import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {useEffect, useRef, useContext, useState} from 'react';
import Container from '../Reusable/Container.component';
import { getOnlineCollections } from '../../utils/pastquestions.utils';
import { ScrollView } from 'react-native-gesture-handler';
import ColorContext from '../context/Colors.context';
import { CText, Heading } from '../Reusable/CustomText.component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PqScreen = () => {
  const path = useRef('pastquestions')
  const colors = useContext(ColorContext)
  const [selected, set_selected] = useState(null)
  const [data, set_data] = useState([])

  useEffect(() => {
    getOnlineCollections(path.current).then((data) => {
      set_data([... data])
      console.log('pqData:', data)
    })
  }, [])

  const changeSelection = (key) => {
    set_selected(key)
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

    heading: {
      fontSize: hp('3%')
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
          <Heading extraStyles={styles.heading}>Select course</Heading>
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
            <TouchableHighlight style={styles.optionButns} underlayColor={colors.underlayColor}><Text style={{color: colors.defaultText, textAlign: 'center'}}>Cancel</Text></TouchableHighlight>
            <TouchableHighlight style={styles.optionButns} underlayColor={colors.underlayColor}><Text style={{color: colors.defaultText, textAlign: 'center'}}>Next</Text></TouchableHighlight>
          </View>
        </View>
      </View>
    </Container>
  )
}
  
  
  export default PqScreen