const batchInfo = (state:any) => state.homeReducer.batchData;
const batchItems = (state:any) => state.homeReducer.batchData?.BatchData?.batchDetails;
const batchLoading = (state:any) => state.homeReducer.batchLoading;

const shipmentOtpInfo = (state:any) => state.homeReducer.shipmentOtpData;
const shipmentOtpLoading = (state:any) => state.homeReducer.shipmentOtpLoading;

const deliverdInfo = (state:any) => state.homeReducer.deliverdData;
const deliverdLoading = (state:any) => state.homeReducer.deliverdLoading;

const cancelledInfo = (state:any) => state.homeReducer.cancelledData;
const cancelledLoading = (state:any) => state.homeReducer.cancelledLoading;

const rescheduledInfo = (state:any) => state.homeReducer.rescheduledData;
const rescheduledLoading = (state:any) => state.homeReducer.rescheduledLoading;

const refusedInfo = (state:any) => state.homeReducer.refusedData;
const refusedLoading = (state:any) => state.homeReducer.refusedLoading;

const completeBatch = (state:any) => state.homeReducer.completeBatchData;
const completeBatchItems = (state:any) => state.homeReducer.completeBatchData;
const completeBatchLoading = (state:any) => state.homeReducer.completeBatchLoading;

const wpSmsInfo = (state:any) => state.homeReducer.wpSmsData;
const wpSmsLoading = (state:any) => state.homeReducer.wpSmsLoading;

const wpCustometrOtpInfo = (state:any) => state.homeReducer.wpCustomerOtpData;
const wpCustometrOtpLoading = (state:any) => state.homeReducer.wpCustomerOtpLoading;

const refusedReasonInfo = (state:any) => state.homeReducer.refusedReasonData;
const refusedReasonLoading = (state:any) => state.homeReducer.refusedReasonLoading;

export { 
    batchInfo,batchItems,batchLoading, 
    shipmentOtpInfo,shipmentOtpLoading,
    deliverdInfo,deliverdLoading,
    cancelledInfo,cancelledLoading,
    rescheduledInfo,rescheduledLoading,
    refusedInfo, refusedLoading,
    completeBatch,completeBatchItems,completeBatchLoading,
    wpSmsInfo,wpSmsLoading,
    wpCustometrOtpInfo,wpCustometrOtpLoading,
    refusedReasonInfo,refusedReasonLoading
}