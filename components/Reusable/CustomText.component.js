import { useContext } from 'react';
import { 
    StyleSheet, 
    Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
const styles = StyleSheet.create({
    text: {
        margin: '2.5%'
    },

    bolded: {
        fontWeight: '800'
    },

    heading: {
        textAlign: 'center',
        flex: 1,
        // paddingVertical: '5%',
        textDecorationLine: 'none',
        fontSize: hp('3%'),
        alignItems: 'center'
    },
})

export const CText = ({children, extraStyles}) => {
  return (
    <Text style={{...styles.text, ...extraStyles}}>
        {children}
    </Text>
  )
}

export const BoldedText = ({children, extraStyles}) => {
    return (
        <Text style={{...styles.bolded, ...extraStyles}}>
            {children}
        </Text>
    )
}

export const Heading = ({children, extraStyles}) => {
    const colors = useContext(ColorContext)

    return (
        <Text style={{...styles.heading, ...extraStyles, ...{color: colors.tabColor}}}>
            {children}
        </Text>
    )
}


