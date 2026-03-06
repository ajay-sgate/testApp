import { Dimensions } from 'react-native';

import {
    widthPercentageToDP,
    heightPercentageToDP,
    listenOrientationChange,
    removeOrientationListener
} from 'react-native-responsive-screen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Constants = {
    API_BASE_URL: '',
    API_BASE_URL_LOCAL: '',
    SENTRY_INTERNAL_DSN: '',
    REQUEST_TIMEOUT: 20000 * 1,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'DD/MM/YYYY h:mm:ss a',
    dateFormatApi: 'YYYY/MM/DD',
    config: {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    }
};

const Colors = {
    primary: '#141924',
    secondary: '#FAB800',
    acent: '#21252C',
    shadow: '#fcf8e3',
    green: '#168404',
    pink: '#ff4081',
    white: '#fff',
    black: '#000',
    medium_gray: 'rgba(125, 125, 130, 0.5)',
    maroon: '#613228',
    blue: '#0000FF',
    red: '#F33D3D',
    gray: '#808080',
    light_gray: '#BABFC5',
    text_gray: '#76889A',
    border: '#CFD5DB',
    dark: '#1C222D',
    btnGray: '#EFEFEF',
    btnTextGray: '#939597',
    transparent: 'transparent',
    listTextColor: "#414243",
    slideThumb: "#E0E0E0",
    fillUpload: "#D7E0EE",
    datePicker: '#D9D9D9',
    otpInputBorderColor: '#6D7688',
    darkBtn: "#59595B",
    acentLow: "#232938",
    whiteDull: "#8A9199",

    text1: '#73C865',
    text2: '#3498DB',
    text3: '#FF7C7C',
    text4: '#FFA944',

};

const light = {
    themeColor: '#FFFFFF',
    ...Colors,
};

const dark = {
    themeColor: '#000000',
    ...Colors,
};

const Dimens = {
    f12: 12,
    f14: 14,
    f16: 16,
    f18: 18,
    f20: 20,
    f30: 30,
};

const Screen = {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    wp: widthPercentageToDP,
    hp: heightPercentageToDP,
    scale: Dimensions.get('window').scale,
    fontScale: Dimensions.get('window').fontScale,
    OrientationChange: listenOrientationChange,
    OrientationListener: removeOrientationListener
};

const Fonts = {
    black: 'Inter-Black',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    extraLight: 'Inter-ExtraLight',
    light: 'Inter-Light',
    medium: 'Inter-Medium',
    regular: 'Inter-Regular',
    semiBold: 'Inter-SemiBold',
    thin: 'Inter-Thin',
};

const ImageView = {
    splashLogo: require('../assets/splashLogo.png'),
    home: require('../assets/home.png'),
    track: require('../assets/track.png'),
    booking: require('../assets/booking.png'),
    person: require('../assets/person.png'),

    arrow: require('../assets/arrow.png'),
    close: require('../assets/close.png'),
    refuse: require('../assets/refuse.png'),
    calender: require('../assets/calender.png'),
    map: require('../assets/map.png'),
    phone: require('../assets/phone.png'),
    time: require('../assets/time.png'),
    tractor: require('../assets/tractor.png'),
    car: require('../assets/car.png'),
    deliverd: require('../assets/deliverd.png'),
    resch: require('../assets/resch.png'),
};

const Strings = {
    signIn: 'Sign In',
    mnum: 'Mobile Number',
    mname: 'Name',
    emnum: 'Enter mobile number',
    emnum2: 'Enter receipient mobile number *',
    ename: 'Enter receipient name *',
    venum: 'Please enter a valid mobile number',
    eOtp: 'Enter OTP',
    vOtp: 'Please enter a valid otp',
    otpM: 'We’ve sent an OTP code to your mobile, ',
    otpMCode: 'Didn’t receive any code? ',
    wpCode: 'Resend via ',
    wp: 'WhatsApp? ',
    resend: 'Resend',
    verify: 'Verify',
    veotp: 'Check your code and retry',
    batch: "Batch :",
    reached: "Reached",
    reschedule: "Reschedule",
    cancel: "Cancel",
    refusalReasons:"Enter Refusal Reason",
    submitOTP: 'Submit OTP',

    home: "Home",
    track: "Track",
    booking: "Booking",
    profile: "Profile",
    odometer: "Odometer Reading",
    eodometer: "Enter KM Reading",
    submit: 'Submit',
    uFile: 'Upload File',
    ok: 'OK',
    logout: 'Logout',
    perTitle: 'Camera Permission',
    start: "Swipe to Start Trip",
    end: "Swipe to End Trip",
    smWrongID: "Something went wrong, please try again latter",
    perMessage: 'skart App needs access to your camera',
    perWarn: "Permission was denied, but it's needed for core functionality,\n \nGo to system settings and allow to Camera permission."
};

const Storage_Key = {
    userData: '@userData',
    odometer: '@odometer',
};

const KeyboardType = {
    NEXT: "next",
    DONE: "done",
    DEFAULT: "default",
    SEARCH: "search"
}

export {
    Constants,
    Colors,
    light,
    dark,
    Dimens,
    Screen,
    Fonts,
    ImageView,
    Strings,
    Storage_Key,
    KeyboardType
};
