import MathJax from 'react-native-mathjax';
import {useContext} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorContext from '../context/Colors.context';
import { Heading } from './CustomText.component';

export default function ({data, extraStyles}) {
    const colors = useContext(ColorContext)
    const styles = StyleSheet.create({
        answerCardWrapper: {
            position: 'absolute',
            width: '95%',
            height: '100%',
            left: '2.5%',
            top: '24%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: colors.backgroundColor
        },
        
        answerCard: {
            borderColor: colors.appColor,
            borderWidth: 3,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
            width: '90%',
            backgroundColor: colors.bodyBackground,
        },
        
        answerCardObj: {
            top: '60%',
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
        },
    
        correctAnswerComponent: {
            color: '#eee',
            fontSize: hp('3%'),
            backgroundColor: colors.appColor,
            width: '50%',
            flex: 0.1,
            textAlign: 'center',
            justifyContent: 'center',
            paddingTop: '2%',
        },
    
        fullSoln: {
            backgroundColor: colors.orange,
            width: '50%',
            borderRadius: 25,
            flex: 0.1,
            marginTop: '5%'
        },
        
        fullSolnText: {
            color: '#eee',
            width: '100%',
            textAlign: 'center',
            fontSize: hp('2.5%'),
        },
    })
    return (
        <View style={{...styles.answerCardWrapper, ...extraStyles}}>
            <Heading>SOLUTION</Heading>
            <View style={styles.answerCard}>
                <MathJax
                    html={
                        `   <head>
                                <meta name="viewport"  content="width=device-width, initial-scale=1.0 maximum-scale=1.0">
                            </head>
                            <body>
                                <style>
                                    * {
                                        -webkit-user-select: none;
                                        -moz-user-select: none;
                                        -ms-user-select: none;
                                        user-select: none;
                                    }
                                </style>
                                <div style="font-size: 1em;
                                    font-family: Roboto, sans-serif, san Francisco;
                                    width: 90%;
                                    overflow-x: show;
                                    margin: auto;
                                    min-height: 50rem;
                                ">
                                    ${data&&data.answer?data.answer.replace('max-width: 180px;', 'max-width: 90vw;'):'<h2 style="color: red;">Network Error!</h2>'}
                                </div>
                                <div style="height: 50%"></div>
                            </body>
                        
                        `
                    }
                    mathJaxOptions={{ 
                        showMathMenu: false,
                        messageStyle: "none",
                        extensions: ["tex2jax.js"],
                        jax: ["input/TeX", "output/HTML-CSS"],
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
                    style={{width: '98%', flex:2, marginTop: '5%', left: '1%'}}
                />
            </View>
        </View>
    )
}