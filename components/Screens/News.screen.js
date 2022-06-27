import {useContext} from 'react';
import MathJax from 'react-native-mathjax';
import ColorContext from '../context/Colors.context.js';
import Container from '../Reusable/Container.component.js';
import { Heading } from '../Reusable/CustomText.component.js';
import WriteupWrapper from '../Reusable/WriteupWrapper.component.js';

function News({route}) {
    const colors = useContext(ColorContext);
    const {data} = route.params
    return (
        <Container>
            <WriteupWrapper>
                <Heading extraStyles={{color: colors.tabColor}}>{data.Topic.toUpperCase()}</Heading>
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
                                    }
                                </style>
                                <div style="font-size: 1em; font-family: Roboto, sans-serif, san Francisco">
                                    ${data&&data.Body?data.Body.replace('max-width: 180px;', 'max-width: 90vw;'):''}
                                </div> 
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
                    style={{width: '100%'}}
                />
            </WriteupWrapper>
        </Container>
    )
}

export default News;