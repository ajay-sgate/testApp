import * as types from "../../actionType";

const initialSettings = {
    isDarkTheme: false,
};

const settingReducer = (state = initialSettings, action:any) => {
  switch (action.type) {
    case types.THEME:
      return {
        ...state,
        isDarkTheme: action.data,
      };
    default:
      return state;
  }
};

export default settingReducer;
