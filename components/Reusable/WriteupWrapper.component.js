import { 
    StyleSheet, 
    View,
    ScrollView
} from 'react-native';

import {useContext} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ColorContext from '../../context/Colors.context';

const WriteupWrapper = ({children, contentListStyles, extraStyes}) => {
    const colors = useContext(ColorContext)

    const styles = StyleSheet.create({
        wraper: {
            width: wp('95%'),
            height: '100%',
            padding: 25,
            left: wp('2.5%'),
            overflow: 'scroll',
            backgroundColor: colors.backgroundColor,
        },
    })

    return (
        <View style={contentListStyles}>
            <ScrollView style={{...styles.wraper, ...extraStyes}}>
                {children}
            </ScrollView>
        </View>
    )
}


export default WriteupWrapper