import { createContext } from "react";

const ColorContext = createContext({
    appColor: '#1c1c74',
    backgroundColor: '#fff',
    defaultText: '#eee'
})

export default ColorContext