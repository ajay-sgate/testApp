import * as types from "../../actionType";

const initialSettings = {
  batchData: [],
  batchLoading: false,

  startWorkData: [],
  startWorkLoading: false,

  endWorkData: [],
  endWorkLoading: false,

  shipmentOtpData: [],
  shipmentOtpLoading: false,

  deliverdData: [],
  deliverdLoading: false,

  cancelledData: [],
  cancelledLoading: false,

  rescheduledData: [],
  rescheduledLoading: false,

  refusedData: [],
  refusedLoading: false,

  completeBatchData: [],
  completeBatchLoading: false,

  wpSmsData: [],
  wpSmsLoading: false,

  wpCustomerOtpData: [],
  wpCustomerOtpLoading: false,

  refusedReasonData: [],
  refusedReasonLoading: false,

  error: {},
};

const homeReducer = (state = initialSettings, action: any) => {
  switch (action.type) {
    case types.GET_BATCH:
      return {
        ...state,
        batchLoading: true,
      };
    case types.BATCH_SUCCESS:
      return {
        ...state,
        batchData: action.data,
        batchLoading: false,
      };
    case types.BATCH_UPDATE:
      return {
        ...state,
        batchData: action.data,
        batchLoading: false,
        startWorkData: [],
        endWorkData: [],
        shipmentOtpData: [],
        deliverdData: [],
        cancelledData: [],
        rescheduledData: [],
        completeBatchData: []
      };
    case types.BATCH_FAIL:
      return {
        ...state,
        error: action.data,
        batchLoading: false,
      };
    case types.BATCH_CLEAR:
      return {
        ...state,
        batchData: [],
        error: {},
        batchLoading: false,
      };




    case types.STARTWORK_INIT:
      return {
        ...state,
        startWorkLoading: true,
      };
    case types.STARTWORK_SUCCESS:
      return {
        ...state,
        startWorkData: action.data,
        startWorkLoading: false,
      };
    case types.STARTWORK_FAIL:
      return {
        ...state,
        error: action.data,
        startWorkLoading: false,
      };
    case types.STARTWORK_CLEAR:
      return {
        ...state,
        startWorkData: [],
        error: {},
        startWorkLoading: false,
      };




    case types.ENDWORK_INIT:
      return {
        ...state,
        endWorkLoading: true,
      };
    case types.ENDWORK_SUCCESS:
      return {
        ...state,
        endWorkData: action.data,
        endWorkLoading: false,
      };
    case types.ENDWORK_FAIL:
      return {
        ...state,
        error: action.data,
        endWorkLoading: false,
      };
    case types.ENDWORK_CLEAR:
      return {
        ...state,
        endWorkData: [],
        error: {},
        endWorkLoading: false,
      };




    case types.SHIPMENTOTP_INIT:
      return {
        ...state,
        shipmentOtpLoading: true,
      };
    case types.SHIPMENTOTP_SUCCESS:
      return {
        ...state,
        shipmentOtpData: action.data,
        shipmentOtpLoading: false,
      };
    case types.SHIPMENTOTP_FAIL:
      return {
        ...state,
        error: action.data,
        shipmentOtpLoading: false,
      };
    case types.SHIPMENTOTP_CLEAR:
      return {
        ...state,
        shipmentOtpData: [],
        error: {},
        shipmentOtpLoading: false,
      };





    case types.DELIVERD_INIT:
      return {
        ...state,
        deliverdLoading: true,
      };
    case types.DELIVERD_SUCCESS:
      return {
        ...state,
        deliverdData: action.data,
        deliverdLoading: false,
      };
    case types.DELIVERD_FAIL:
      return {
        ...state,
        error: action.data,
        deliverdLoading: false,
      };
    case types.DELIVERD_CLEAR:
      return {
        ...state,
        deliverdData: [],
        error: {},
        deliverdLoading: false,
      };





    case types.CANCELLED_INIT:
      return {
        ...state,
        cancelledLoading: true,
      };
    case types.CANCELLED_SUCCESS:
      return {
        ...state,
        cancelledData: action.data,
        cancelledLoading: false,
      };
    case types.CANCELLED_FAIL:
      return {
        ...state,
        error: action.data,
        cancelledLoading: false,
      };
    case types.CANCELLED_CLEAR:
      return {
        ...state,
        cancelledData: [],
        error: {},
        cancelledLoading: false,
      };



    case types.RESCHEDULED_INIT:
      return {
        ...state,
        rescheduledLoading: true,
      };
    case types.RESCHEDULED_SUCCESS:
      return {
        ...state,
        rescheduledData: action.data,
        rescheduledLoading: false,
      };
    case types.RESCHEDULED_FAIL:
      return {
        ...state,
        error: action.data,
        rescheduledLoading: false,
      };
    case types.RESCHEDULED_CLEAR:
      return {
        ...state,
        rescheduledData: [],
        error: {},
        rescheduledLoading: false,
      };

    case types.REFUSED_INIT:
      return {
        ...state,
        refusedLoading: true,
      };
    case types.REFUSED_SUCCESS:
      return {
        ...state,
        refusedData: action.data,
        refusedLoading: false,
      };
    case types.REFUSED_FAIL:
      return {
        ...state,
        error: action.data,
        refusedLoading: false,
      };
    case types.REFUSED_CLEAR:
      return {
        ...state,
        refusedData: [],
        error: {},
        refusedLoading: false,
      };



    case types.COMPLETEBATCH_INIT:
      return {
        ...state,
        completeBatchLoading: true,
      };
    case types.COMPLETEBATCH_SUCCESS:
      return {
        ...state,
        completeBatchData: action.data,
        completeBatchLoading: false,
      };
    case types.COMPLETEBATCH_FAIL:
      return {
        ...state,
        error: action.data,
        completeBatchLoading: false,
      };
    case types.COMPLETEBATCH_CLEAR:
      return {
        ...state,
        completeBatchData: [],
        error: {},
        complete: false,
      };


    case types.SENDWPSMS_INIT:
      return {
        ...state,
        wpSmsLoading: true,
      };
    case types.SENDWPSMS_SUCCESS:
      return {
        ...state,
        wpSmsData: action.data,
        wpSmsLoading: false,
      };
    case types.SENDWPSMS_FAIL:
      return {
        ...state,
        error: action.data,
        wpSmsLoading: false,
      };
    case types.SENDWPSMS_CLEAR:
      return {
        ...state,
        wpSmsData: [],
        error: {},
        wpSmsLoading: false,
      };


    case types.WPCUSTOMEROTP_INIT:
      return {
        ...state,
        wpCustomerOtpLoading: true,
      };
    case types.WPCUSTOMEROTP_SUCCESS:
      return {
        ...state,
        wpCustomerOtpData: action.data,
        wpCustomerOtpLoading: false,
      };
    case types.WPCUSTOMEROTP_FAIL:
      return {
        ...state,
        error: action.data,
        wpCustomerOtpLoading: false,
      };
    case types.WPCUSTOMEROTP_CLEAR:
      return {
        ...state,
        wpCustomerOtpData: [],
        error: {},
        wpCustomerOtpLoading: false,
      };


      case types.REFUSE_REASON_INIT:
      return {
        ...state,
        refusedReasonLoading: true,
      };
    case types.REFUSE_REASON_SUCCESS:
      return {
        ...state,
        refusedReasonData: action.data,
        refusedReasonLoading: false,
      };
    case types.REFUSE_REASON_FAIL:
      return {
        ...state,
        error: action.data,
        refusedReasonLoading: false,
      };
    case types.REFUSE_REASON_CLEAR:
      return {
        ...state,
        refusedReasonData: [],
        error: {},
        refusedReasonLoading: false,
      };

    default:
      return state;
  }
};

export default homeReducer;
