const loginInfo = (state:any) => state.authReducer.loginData;
const loading = (state:any) => state.authReducer.loginLoading;

const otpInfo = (state:any) => state.authReducer.otpData;
const otpLoading = (state:any) => state.authReducer.otpLoading;
export { 
    loginInfo,loading,
    otpInfo,otpLoading
}