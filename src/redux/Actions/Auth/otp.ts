import * as types from "../../actionType";
import {  Post } from "../../../services/api.service";
import { OTP } from "../../../utils/httpService";
export const otpAction = (request:any) => {
  return (dispatch:any) => {
    try {
      dispatch(otpLoad());
      return new Promise((resolve, reject) => {
        Post(OTP, request).then(
          (result:any) => {
            dispatch(otpSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(otpFail(error));
            reject(error);
          }
        );
      });
    } catch (error:any) {
      dispatch(otpFail(error));
    }
  };
};

export const otpLoad = () => {
  return { type: types.OTP_INIT, };
};

export const otpSuccess = (data:any) => {
  return { type: types.OTP_SUCCESS, data };
};

export const otpFail = (data:any) => {
  return { type: types.OTP_FAIL, data };
};

export const otpClear = () => {
  return { type: types.OTP_CLEAR };
};
