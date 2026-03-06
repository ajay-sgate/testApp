import * as types from "../../actionType";
import { Get, Post } from "../../../services/api.service";
import { SHIPMENTOTP, BATCH, DELIVERED, CANCELLED, RESCHDULED, COMPLETE_BATCH, SENDWP_SMS, WPCUSTOMER_OTP, REFUSED, REFUSE_REASON } from "../../../utils/httpService";
import { showPopupMessage } from "../../../utils/helpers";

export const getBatchAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getBatchLoad());
      return new Promise((resolve, reject) => {
        console.log('BATCH', BATCH);
        console.log('request', request);

        Post(BATCH, request).then(
          (result: any) => {
            dispatch(batchSuccess(result.data));
            resolve(result);
          },
          (error) => {
            console.log('error', error);
            dispatch(batchFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(batchFail(error));
    }
  };
};


export const getShipmentOtp = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getShipmentOtpLoad());
      return new Promise((resolve, reject) => {
        console.log('SHIPMENTOTP', SHIPMENTOTP);
        console.log('request', request);

        Post(SHIPMENTOTP, request).then(
          (result: any) => {
            console.log('result ---- 1', result);

            dispatch(shipmentOtpSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(shipmentOtpFail(error));
            reject(error);

          }
        );
      });
    } catch (error: any) {
      dispatch(shipmentOtpFail(error));
    }
  };
};



export const getDeliverdAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getDeliverdLoad());
      return new Promise((resolve, reject) => {
        console.log('SHIPMENTOTP', DELIVERED);
        console.log('request', request);

        Post(`${DELIVERED}${request.driverId}`, request).then(
          (result: any) => {
            console.log('result ---- 2', result);
            dispatch(deliverdSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(deliverdFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(deliverdFail(error));
    }
  };
};



export const getCancelledAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getCancelledLoad());
      return new Promise((resolve, reject) => {
        console.log('CANCELLED', CANCELLED);
        console.log('request', request);
        Post(CANCELLED, request).then(
          (result: any) => {
            console.log('result ---- 3', result);
            showPopupMessage('success', 'Shipment is successfully cancelled', false);

            dispatch(cancelledSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(cancelledFail(error));
            reject(error);

          }
        );
      });
    } catch (error: any) {
      dispatch(cancelledFail(error));
    }
  };
};



export const getRescheduledAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getRescheduledLoad());
      return new Promise((resolve, reject) => {
        console.log('RESCHDULED', RESCHDULED);
        console.log('request', request);
        Post(RESCHDULED, request).then(
          (result: any) => {
            console.log('result ---- 4', result);
            showPopupMessage('success', 'Delivery date has been successfully rescheduled', false);
            dispatch(rescheduledSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(rescheduledFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(rescheduledFail(error));
    }
  };
};

export const getRefusedAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getRefusedLoad());
      return new Promise((resolve, reject) => {
        console.log('REFUSED', REFUSED);
        console.log('request', request);
        Post(REFUSED, request).then(
          (result: any) => {
            console.log('result ---- refused', result);
            showPopupMessage('success', 'Shipment has been successfully refused', false);
            dispatch(refusedSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(refusedFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(refusedFail(error));
    }
  }
}

export const getCompleteBatchAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getCompleteBatchLoad());
      return new Promise((resolve, reject) => {
        Post(COMPLETE_BATCH, request).then(
          (result: any) => {
            console.log('result ---- 5', result);
            dispatch(completeBatchSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(completeBatchFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(completeBatchFail(error));
    }
  };
};


export const getWpSmsAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getWpSmsLoad());
      return new Promise((resolve, reject) => {
        console.log('---SENDWP_SMS', SENDWP_SMS);
        console.log('---request', request);

        Post(SENDWP_SMS, request).then(
          (result: any) => {
            console.log('result ---- 6', result);
            dispatch(wpSmsSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(wpSmsFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(wpSmsFail(error));
    }
  };
};


export const getWpCustomerOtpAction = (request: any) => {
  return (dispatch: any) => {
    try {
      dispatch(getWpCustomerOtpLoad());
      return new Promise((resolve, reject) => {
        console.log('---WPCUSTOMER_OTP', WPCUSTOMER_OTP);
        console.log('---request', request);
        Post(WPCUSTOMER_OTP, request).then(
          (result: any) => {
            console.log('result ---- 7', result);
            dispatch(WpCustomerOtpSuccess(result.data));
            resolve(result);
          },
          (error) => {
            dispatch(WpCustomerOtpFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(WpCustomerOtpFail(error));
    }
  };
};

export const getBatchLoad = () => {
  return { type: types.GET_BATCH, };
};

export const batchSuccess = (data: any) => {
  return { type: types.BATCH_SUCCESS, data };
};

export const batchUpdate = (data: any) => {
  return { type: types.BATCH_SUCCESS, data };
};



export const batchFail = (data: any) => {
  return { type: types.BATCH_FAIL, data };
};

export const batchClear = () => {
  return { type: types.BATCH_CLEAR };
};



export const getShipmentOtpLoad = () => {
  return { type: types.SHIPMENTOTP_INIT, };
};

export const shipmentOtpSuccess = (data: any) => {
  return { type: types.SHIPMENTOTP_SUCCESS, data };
};

export const shipmentOtpFail = (data: any) => {
  return { type: types.SHIPMENTOTP_FAIL, data };
};

export const shipmentOtpClear = () => {
  return { type: types.SHIPMENTOTP_CLEAR };
};



export const getDeliverdLoad = () => {
  return { type: types.DELIVERD_INIT, };
};

export const deliverdSuccess = (data: any) => {
  return { type: types.DELIVERD_SUCCESS, data };
};

export const deliverdFail = (data: any) => {
  return { type: types.DELIVERD_FAIL, data };
};

export const deliverdClear = () => {
  return { type: types.DELIVERD_CLEAR };
};



export const getCancelledLoad = () => {
  return { type: types.CANCELLED_INIT, };
};

export const cancelledSuccess = (data: any) => {
  return { type: types.CANCELLED_SUCCESS, data };
};

export const cancelledFail = (data: any) => {
  return { type: types.CANCELLED_FAIL, data };
};

export const cancelledClear = () => {
  return { type: types.CANCELLED_CLEAR };
};



export const getRescheduledLoad = () => {
  return { type: types.RESCHEDULED_INIT, };
};

export const rescheduledSuccess = (data: any) => {
  return { type: types.RESCHEDULED_SUCCESS, data };
};

export const rescheduledFail = (data: any) => {
  return { type: types.RESCHEDULED_FAIL, data };
};

export const rescheduledClear = () => {
  return { type: types.RESCHEDULED_CLEAR };
};

export const getRefusedLoad = () => {
  return { type: types.REFUSED_INIT, };
};

export const refusedSuccess = (data: any) => {
  return { type: types.REFUSED_SUCCESS, data };
};

export const refusedFail = (data: any) => {
  return { type: types.REFUSED_FAIL, data };
};

export const refusedClear = () => {
  return { type: types.REFUSED_CLEAR };
};

export const getCompleteBatchLoad = () => {
  return { type: types.COMPLETEBATCH_INIT, };
};

export const completeBatchSuccess = (data: any) => {
  return { type: types.COMPLETEBATCH_SUCCESS, data };
};

export const completeBatchFail = (data: any) => {
  return { type: types.COMPLETEBATCH_FAIL, data };
};

export const completeBatchClear = () => {
  return { type: types.COMPLETEBATCH_CLEAR };
};


export const getWpSmsLoad = () => {
  return { type: types.SENDWPSMS_INIT, };
};

export const wpSmsSuccess = (data: any) => {
  return { type: types.SENDWPSMS_SUCCESS, data };
};

export const wpSmsFail = (data: any) => {
  return { type: types.SENDWPSMS_FAIL, data };
};

export const wpSmsClear = () => {
  return { type: types.SENDWPSMS_CLEAR };
};


export const getWpCustomerOtpLoad = () => {
  return { type: types.WPCUSTOMEROTP_INIT, };
};

export const WpCustomerOtpSuccess = (data: any) => {
  return { type: types.WPCUSTOMEROTP_SUCCESS, data };
};

export const WpCustomerOtpFail = (data: any) => {
  return { type: types.WPCUSTOMEROTP_FAIL, data };
};

export const WpCustomerOtpsClear = () => {
  return { type: types.WPCUSTOMEROTP_CLEAR };
};


export const getRefusedReasonLoad = () => {
  return { type: types.REFUSE_REASON_INIT, };
};

export const refusedReasonSuccess = (data: any) => {
  return { type: types.REFUSE_REASON_SUCCESS, data };
};

export const refusedReasonFail = (data: any) => {
  return { type: types.REFUSE_REASON_FAIL, data };
};

export const refusedReasonClear = () => {
  return { type: types.REFUSE_REASON_CLEAR };
};

export const getRefusedReasonAction = () => {
  return (dispatch: any) => {
    try {
      dispatch(getRefusedReasonLoad());
      return new Promise((resolve, reject) => {

        Get(`${REFUSE_REASON}`).then(
          (result: any) => {
            const data = [...result.data, {
              "status": "OTHER",
              "status_code": "0",
              "reason": "OTHER",
              "is_active": 1,
              "created_by": 1,
            },]
            dispatch(refusedReasonSuccess(data));
            resolve(result);
          },
          (error) => {
            dispatch(refusedReasonFail(error));
            reject(error);
          }
        );
      });
    } catch (error: any) {
      dispatch(refusedReasonFail(error));
    }
  };
};