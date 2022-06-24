import { 
    StyleSheet, 
    Text,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    text: {
        margin: '2.5%'
    },

    bolded: {
        fontWeight: '800'
    },

    heading: {
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        textDecorationLine: 'underline',
        textAlign: 'center'
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
    return (
        <Text style={{...styles.heading, ...extraStyles}}>
            {children}
        </Text>
    )
}


