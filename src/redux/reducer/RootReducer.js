import {combineReducers} from "redux";
import regionReducer from "./region";

const rootReducer = combineReducers({
    regionReducer : regionReducer
})

export default rootReducer