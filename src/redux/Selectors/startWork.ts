const startWorkInfo = (state:any) => state.homeReducer.startWorkData;
const startWorkLoading = (state:any) => state.homeReducer.startWorkLoading;
const endWorkInfo = (state:any) => state.homeReducer.endWorkData;
const endWorkLoading = (state:any) => state.homeReducer.endWorkLoading;

export { 
    startWorkInfo,startWorkLoading,
    endWorkInfo,endWorkLoading
}