import { useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import MathJax from "react-native-mathjax"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import ColorContext from "../context/Colors.context"

const QuestionComponent = ({dataToRender, children}) => {
  const colors = useContext(ColorContext)
  const [displayData, setdisplayData] = useState(null)
  const styles = StyleSheet.create({
    pqDataWrapper: {
      borderColor: colors.appColor,
      borderBottomWidth: 2,
      width: '90%',
      marginVertical: hp('3%'),
      left: '5%',
      justifyContent: 'center'
    },
  })



  useEffect(() => {
    setdisplayData({...dataToRender})
  }, [])
  

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
                    ${displayData?displayData.question.replace('max-width: 180px;', 'max-width: 90vw;'):`<h2 style="color: #777; text-align: center">Something Went Wrong!</h2>`}
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
        {children}
    </View>
  )
}

export default QuestionComponent