import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import HomeReducer from "./Home";
import settingReducer from "./Setting";

const rootReducer = combineReducers({
    authReducer: AuthReducer,
    homeReducer: HomeReducer,
    settingReducer: settingReducer
});
export default rootReducer;

