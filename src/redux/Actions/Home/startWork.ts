import * as types from "../../actionType";
import {  Post, PostFormData } from "../../../services/api.service";
import { STARTWORK,ENDWORK } from "../../../utils/httpService";
import { showPopupMessage } from "../../../utils/helpers";
export const getStartWorkAction = (request:any) => {
  return (dispatch:any) => {
    try {
      dispatch(getStartWorkLoad());
      return new Promise((resolve, reject) => {
        console.log('STARTWORK', STARTWORK);
        console.log('request', JSON.stringify(request));
        
        
        PostFormData(STARTWORK, request).then(
          (result:any) => {
            console.log('result.data', result.data);
            dispatch(startWorkSuccess(result.data));
            resolve(result);
          },
          (error) => {
            console.log('error', error);
            
            showPopupMessage('Error', error.toString(), true)
            dispatch(startWorkFail(error));
            reject(error);
          }
        );
      });
    } catch (error:any) {
      showPopupMessage('Error', error.toString(), true)
      dispatch(startWorkFail(error));
    }
  };
};

export const getEndWorkAction = (request:any) => {
  return (dispatch:any) => {
    try {
      console.log('5-------------');

      dispatch(getEndWorkLoad());
      return new Promise((resolve, reject) => {

        console.log('ENDWORK', ENDWORK);
        console.log('request', JSON.stringify(request));
        
        
        PostFormData(ENDWORK, request).then(
          (result:any) => {

            console.log('result', JSON.stringify(result));
            
            dispatch(endWorkSuccess(result.data));
            resolve(result);
          },
          (error) => {
            showPopupMessage('Error', error.toString(), true)
            dispatch(endWorkFail(error));
            reject(error);
          }
        );
      });
    } catch (error:any) {
      showPopupMessage('Error', error.toString(), true)
      dispatch(endWorkFail(error));
    }
  };
};

export const getStartWorkLoad = () => {
  return { type: types.STARTWORK_INIT, };
};

export const startWorkSuccess = (data:any) => {
  return { type: types.STARTWORK_SUCCESS, data };
};

export const startWorkFail = (data:any) => {
  return { type: types.STARTWORK_FAIL, data };
};

export const startWorkClear = () => {
  return { type: types.STARTWORK_CLEAR };
};



export const getEndWorkLoad = () => {
  return { type: types.ENDWORK_INIT, };
};

export const endWorkSuccess = (data:any) => {
  return { type: types.ENDWORK_SUCCESS, data };
};

export const endWorkFail = (data:any) => {
  return { type: types.ENDWORK_FAIL, data };
};

export const endWorkClear = () => {
  return { type: types.ENDWORK_CLEAR };
};