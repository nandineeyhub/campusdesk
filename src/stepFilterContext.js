import { createContext } from "react";
const initialState = {
    step:"",
    toggle : () => {}
}
const stepFilterContext = createContext(initialState)