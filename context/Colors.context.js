import { createContext } from "react";

const ColorContext = createContext({
    appColor: '#1c1c74',
    backgroundColor: '#fff',
    defaultText: '#eee',
    darkText: '#000',
    iconColor: '#b4b42b',
    underlayColor: '#00000045'
})

export default ColorContext