/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import c from '../../styles';
import s from './styles';
import {
  Colors,
  Dimens,
  ImageView,
  KeyboardType,
  Screen,
  Storage_Key,
  Strings,
} from '../../constants/appConstants';
import { Title, Container, Button, Label } from '../../components';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import BackgroundTimer from 'react-native-background-timer';
import { showPopupMessage } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { otpAction, otpClear } from '../../redux/Actions/Auth/otp';
import { otpInfo, otpLoading } from '../../redux/Selectors/auth';
import Config from 'react-native-config';
import { loginAction } from '../../redux/Actions/Auth/login';
import { toHome } from '../../navigation/navigationHelper';
// import RNOtpVerify from "react-native-otp-verify";
import PrefManager from '../../utils/prefManager';
import { darkMode } from '../../redux/Selectors/setting';
import { wpSmsInfo, wpSmsLoading } from '../../redux/Selectors/home';
import { getWpSmsAction } from '../../redux/Actions/Home';

export default function OtpVerify({ navigation, route }: any) {
  const { mobile } = route.params;
  const [error, setError] = useState<string>('');
  const [resendEnable, setResendEnable] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [propsSate, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState<number>(60);
  const [type, setType] = useState<number>(1);

  const timeInterval = useRef<any>(null);
  const ref = useBlurOnFulfill({ value, cellCount: 13 }) as any;

  const otpData = useSelector(otpInfo) as any;
  const wpOtpData = useSelector(wpSmsInfo) as any;
  const wpLoading = useSelector(wpSmsLoading) as any;
  const isLoading = useSelector(otpLoading) as any;
  const dispatch = useDispatch() as any;
  const themes = useSelector(darkMode) as any;

  const otpAPI = (request: any) => dispatch(otpAction(request));
  const wpOtpAPI = (request: any) => dispatch(getWpSmsAction(request));
  const loginAPI = (request: any) => dispatch(loginAction(request));
  const loginDataClear = () => dispatch(otpClear());

  useEffect(() => {
    startTimer();
    // getAutoOTP();
    return () => {
      clearTimeoutFunc();
    };
  }, [timer]);

  // GET OTP CODE DEVICE
  // const getAutoOTP = () => {
  //   RNOtpVerify.getOtp().then((p: any) => {
  //     RNOtpVerify.addListener(otpHandler);
  //   });
  // };

  // OTP HANDLER AND AUTO FILL & NAVIGATION FUNCTIONALITY
  // const otpHandler = (message: any) => {
  //   try {
  //      /* @ts-ignore */
  //     const otp:any = /(\d{4})/g.exec(message)[1];
  //     setValue(otp || "");
  //     if (otp.length === 4 && isFirstTime) {
  //       setisFirstTime(false)
  //       toOtp(otp);
  //     }
  //     RNOtpVerify.removeListener();
  //   } catch { }
  // };

  useEffect(() => {
    if (otpData != undefined) {
      if (otpData?.status == 200) {
        PrefManager.setValue(
          Storage_Key.userData,
          JSON.stringify(
            Array.isArray(otpData.data) ? otpData.data[0] : otpData.data,
          ),
        );
        navigation.dispatch(toHome);
        otpClear();
      } else {
        if (otpData?.status == 401) {
          setError(otpData?.message);
        } else {
          showPopupMessage('Error', otpData?.message, true);
        }
        otpClear();
      }
    }
  }, [otpData]);

  // -- Verification timer
  const startTimer = () => {
    clearTimeoutFunc();
    timeInterval.current = BackgroundTimer.setTimeout(setTimeOutBody, 1000);
  };

  const setTimeOutBody = () => {
    if (timer === 0) {
      clearTimeoutFunc();
      setResendEnable(true);
    } else {
      setTimer(timer - 1);
    }
  };

  const clearTimeoutFunc = () => {
    timeInterval.current && BackgroundTimer.clearTimeout(timeInterval.current);
    timeInterval.current = null;
  };

  const onChangeOtp = (val: string) => {
    // Remove dots and commas from the OTP code
    const sanitizedVal = val.replace(/[., -]/g, '');
    setValue(sanitizedVal);
  };

  const resendOtp = () => {
    setType(1);
    setTimer(60);
    startTimer();
    setResendEnable(false);
    // const formData = new FormData();
    // formData.append('auth_key', Config.AUTH_KEY);
    // formData.append('mobile_no', mobile);
    const  formData = {
      'auth_key': Config.AUTH_KEY,
      "mobile_no": mobile
  }
    loginAPI(formData);
  };

  const resendOtpWP = () => {
    setType(2);
    setTimer(60);
    startTimer();
    setResendEnable(false);
    // const formData = new FormData();
    // formData.append('auth_key', Config.AUTH_KEY);
    // formData.append('mobile_no', mobile);
    const  formData = {
      // 'auth_key': Config.AUTH_KEY,
      "mobile_no": mobile
  }
    wpOtpAPI(formData);
  };

  const toOtp = (otp: any) => {
    if (value?.length == 0) {
      setError(Strings.eOtp);
    } else {
      setError('');
      // const formData = new FormData();
      // formData.append('auth_key', Config.AUTH_KEY);
      // formData.append('otp', otp ? otp : value);
      // formData.append('mobile_no', mobile);
      const  formData = {
          "otp":  otp ? otp : value,
          "mobile_no": mobile
      }
      otpAPI(formData);
    }
  };

  return (
    <Container light style={c.flex1White(themes)}>
      <Image
        resizeMode="center"
        style={c.logoStyle}
        source={ImageView.splashLogo}
      />

      <View style={c.marginH24}>
        <Title style={s.eOtpStyle(themes)}>{Strings.eOtp}</Title>
        <Label style={c.otpMStyle(themes)} value={Strings.otpM} />
        <Label style={c.otpNStyle(themes)} value={mobile} />

        {/* @ts-ignore */}
        <CodeField
          ref={ref}
          {...propsSate}
          caretHidden={true}
          contextMenuHidden={true}
          value={value}
          onChangeText={onChangeOtp}
          cellCount={6}
          rootStyle={s.otpInputStyle}
          keyboardType="number-pad"
          returnKeyType={KeyboardType.NEXT}
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[
                c.cell,
                {
                  borderColor: isFocused
                    ? themes
                      ? Colors.border
                      : Colors.black
                    : error
                      ? Colors.red
                      : Colors.border,
                  borderWidth: isFocused ? Screen.wp(0.4) : Screen.wp(0.3),
                },
              ]}>
              <Title
                style={s.otpStyle(themes)}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || ''}
              </Title>
            </View>
          )}
        />
        {error ? <Text style={s.errorStyle}>{error}</Text> : null}

        <View style={c.flexRowCenter}>
          <Label style={c.otpMStyle(themes)} value={Strings.otpMCode} />
          {!resendEnable && type == 1 ? (
            <Label
              style={c.otpNStyle(themes)}
              value={`00:${timer <= 9 ? '0' : ''}${timer}`}
            />
          ) : (
            <Label
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: Dimens.f14,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color:
                  timer == 0 && !themes
                    ? Colors.text_gray
                    : timer == 0 && themes
                      ? Colors.white
                      : Colors.light_gray,
              }}
              onPress={() => {
                if (timer == 0) {
                  resendOtp();
                }
              }}
              value={Strings.resend}
            />
          )}
        </View>

        <View style={[c.flexRowCenter, { marginTop: 10 }]}>
          <Label style={c.otpMStyle(themes)} value={Strings.wpCode} />
          <Label style={c.otpWpStyle} value={Strings.wp} />
          {!resendEnable && type == 2 ? (
            <Label
              style={c.otpNStyle(themes)}
              value={`00:${timer <= 9 ? '0' : ''}${timer}`}
            />
          ) : (
            <Label
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: Dimens.f14,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color:
                  timer == 0 && !themes
                    ? Colors.text_gray
                    : timer == 0 && themes
                      ? Colors.white
                      : Colors.light_gray,
              }}
              onPress={() => {
                if (timer == 0) {
                  resendOtpWP();
                }
              }}
              value={Strings.resend}
            />
          )}
        </View>

        <View style={c.h40}></View>

        <Button
          visible={isLoading}
          onPress={() => {
            toOtp(value);
          }}
          color={Colors.black}
          style={c.buttonStyle}
          title={Strings.verify}
        />
      </View>
    </Container>
  );
}
