import { combineReducers } from "redux";
import vasts from "./listReducer";
import sets from "./setsReducer";


export default combineReducers({
    vasts, 
    sets
});