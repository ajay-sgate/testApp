import * as types from "../../actionType";
import {  Post } from "../../../services/api.service";
import { Login } from "../../../utils/httpService";
export const loginAction = (request:any) => {
  return (dispatch:any) => {
    try {
      dispatch(loginLoad());
      return new Promise((resolve, reject) => {
        console.log('Login',Login);

        console.log('request',request);
        
        
        Post(Login, request).then(
          (result:any) => {
            dispatch(loginSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(loginFail(error));
            reject(error);
          }
        );
      });
    } catch (error:any) {
      dispatch(loginFail(error));
    }
  };
};

export const loginLoad = () => {
  return { type: types.LOGIN_INIT, };
};

export const loginSuccess = (data:any) => {
  return { type: types.LOGIN_SUCCESS, data };
};

export const loginFail = (data:any) => {
  return { type: types.LOGIN_FAIL, data };
};

export const loginClear = () => {
  return { type: types.LOGIN_CLEAR };
};
