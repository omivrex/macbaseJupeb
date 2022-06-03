import { 
    StyleSheet, 
    View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    p: {
        width: '100%',
        // paddingBottom: '5%',
        marginBottom: hp('5%')
    },
})

const P = ({children, extraStyles}) => {

  return (
    <View style={{...styles.p, ...extraStyles}}>
        {children}
    </View>
  )
}

export default P