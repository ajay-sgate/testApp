import Config from "react-native-config";

const BaseUrl = Config.API_URL;
export const Login = BaseUrl + 'flm/login';
export const OTP = BaseUrl + 'flm/loginotpvalidate';


export const BATCH = BaseUrl + 'flm/driverbatchdetails';
export const STARTWORK = BaseUrl + 'flm/startodometer';
export const ENDWORK = BaseUrl + 'flm/endodometer';
export const SHIPMENTOTP = BaseUrl + 'flm/generateshipmentdeliveredotp';

export const DELIVERED = BaseUrl + 'flm/shipmentDelivered/';
export const CANCELLED = BaseUrl + 'flm/shipmentCancelled';
export const RESCHDULED = BaseUrl + 'flm/shipmentRescheduled';
export const REFUSED = BaseUrl + 'flm/shipmentRefuse'
export const COMPLETE_BATCH = BaseUrl + 'flm/driverbatchdetails';
export const SENDWP_SMS = BaseUrl + 'flm/generatedriverloginwpotp';
export const WPCUSTOMER_OTP = BaseUrl + 'flm/generateshipmentdeliveredwpotp';
export const REFUSE_REASON = BaseUrl + 'track_shipment/refuse_reason/list'



// import Config from "react-native-config";

// const BaseUrl = Config.API_URL;
// export const Login = BaseUrl + 'Driverlogin/get_driver_details';
// export const OTP = BaseUrl + 'Driverlogin/get_driver_otp_validate';


// export const BATCH = BaseUrl + 'Driverbatchassign/get_driver_batch_details';
// export const STARTWORK = BaseUrl + 'Uploadodometer/upload_start_odometer_details';
// export const ENDWORK = BaseUrl + 'Uploadodometer/upload_end_odometer_details';
// export const SHIPMENTOTP = BaseUrl + 'Customerotp/get_customer_otp';
// export const DELIVERED = BaseUrl + 'Shipmentstatus/shipment_delivered';
// export const CANCELLED = BaseUrl + 'Shipmentstatus/shipment_cancelled';
// export const RESCHDULED = BaseUrl + 'Shipmentstatus/shipment_rescheduled';
// export const COMPLETE_BATCH = BaseUrl + 'Driverbatchassign/get_driver_batch_details_complete';
// export const SENDWP_SMS = BaseUrl + 'Driverlogin/sendwpsms';
// export const WPCUSTOMER_OTP = BaseUrl + 'Customerotp/get_customer_wp_otp';


