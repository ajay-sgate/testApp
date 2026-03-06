import * as types from "../../actionType";

const initialSettings = {
  loginData: undefined,
  loginLoading: false,

  otpData: undefined,
  otpLoading: false,
  error: {},
}

const authReducer = (state = initialSettings, action:any) => {
  switch (action.type) {
    case types.LOGIN_INIT:
      return {
        ...state,
        loginLoading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.data,
        loginLoading: false,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.data,
        loginLoading: false,
      };
    case types.LOGIN_CLEAR:
      return {
        ...state,
        loginData: undefined,
        loginLoading: false,
      
        otpData: undefined,
        otpLoading: false,
        error: {},
      };

      case types.OTP_INIT:
      return {
        ...state,
        otpLoading: true,
      };
    case types.OTP_SUCCESS:
      return {
        ...state,
        otpData: action.data,
        otpLoading: false,
      };
    case types.OTP_FAIL:
      return {
        ...state,
        error: action.data,
        otpLoading: false,
      };
    case types.OTP_CLEAR:
      return {
        ...state,
        otpData: undefined,
        error: {},
        otpLoading: false,
      };
      
    default:
      return state;
  }
};

export default authReducer;
