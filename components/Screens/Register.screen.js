import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  SafeAreaView,
  TextInput
} from 'react-native';
import {useContext, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome, Zocial, Entypo  } from '@expo/vector-icons';

import Container from '../Reusable/Container.component';
import NavigationContext from '../context/Nav.context';
import ColorContext from '../context/Colors.context';
import { Heading } from '../Reusable/CustomText.component';

const RegisterScreen = () => {
  const navigation = useContext(NavigationContext);
  const colors = useContext(ColorContext);
  const [currentPath, set_currentPath] = useState('signUp')
  const next = (path) => {
    set_currentPath(path)
  }

  const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      width: '90%',
      height: '85%',
      left: '5%',
      // top: '24%',
      justifyContent: 'center',
      alignContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 25,
      borderRadius: 25,
      backgroundColor: colors.backgroundColor
    },

    cardHeading: {
      // alignSelf: 'flex-start',
      textAlign: 'center',
      top: 0,
      paddingVertical: '5%',
      textDecorationLine: 'none',
      fontSize: hp('3%'),
      color: colors.tabColor,
      marginBottom: '10%',
      // backgroundColor: 'red',
      alignItems: 'center'
    },

    inputField: {
      width: '90%',
      left: '5%',
      marginVertical: '2%'
    },

    labelWrapper: {
      alignItems: 'baseline',
      flexDirection: 'row',
    },

    label: {
      color: colors.labelColor,
      fontSize: hp('2.5%'),
    },

    icons: {
      marginRight: '5%',
      alignSelf: 'flex-start'
    },

    textInput: {
      fontSize: hp('2.5%'),
      width: '95%',
      borderBottomColor: colors.tabColor,
      borderBottomWidth: 2,
      padding: '2%'
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
      fontSize: hp('2.5%'),
      textAlign: 'center',
    }
  })

  return (
    <Container>
      <View style={styles.wrapper}>
        <Heading extraStyles={styles.cardHeading}>SignUp</Heading>
        <View style={styles.inputField}>
          <View style={styles.labelWrapper}>
            <FontAwesome name="user" style={styles.icons} size={24} color={colors.tabColor} />
            <Text style={styles.label}>
              Username 
            </Text>
          </View>
          <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.inputField}>
          <View style={styles.labelWrapper}>
            <Zocial name="email" style={styles.icons} size={24} color={colors.tabColor}/>  
            <Text style={styles.label}>
              Email
            </Text>
          </View>
          <TextInput keyboardType='email-address' style={styles.textInput}></TextInput>
        </View>
        <View style={styles.inputField}>
          <View style={styles.labelWrapper}>
            <Entypo name="key" style={styles.icons} size={24} color={colors.tabColor}/>
            <Text style={styles.label}>
              Password
            </Text>
          </View>
          <TextInput secureTextEntry={true} style={styles.textInput}></TextInput>
        </View>
        <TouchableHighlight style={styles.submitButn}>
          <Text style={styles.butnText}>Next</Text>
        </TouchableHighlight>
      </View>
    </Container>
  )
}

  
export default RegisterScreen