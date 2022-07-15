import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ColorContext from "../context/Colors.context";


const LoadingComponent = ({children, extraStyles}) => {
    const colors = useContext(ColorContext)
    const styles = StyleSheet.create({
        animation: {
          width: '100%',
          height: '100%',
        },
        componentWrapper: {
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'center'
        },
    
        animationWrapper: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '20%',
        },
    
        loadingText: {
          fontSize: hp('2.9%'),
          textAlign: 'center',
          width: '100%',
          color: colors.appColor
        }
    });
    return (
      <View style={[styles.componentWrapper, extraStyles]}>
        <View style={styles.animationWrapper}>
          <LottieView
            source={require("../../assets/loading.json")}
            style={styles.animation}
            autoPlay
          />
          <Text style={styles.loadingText}>{children}</Text>
        </View>
      </View>
    );
}

export default LoadingComponent