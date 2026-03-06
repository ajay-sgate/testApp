/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Container,
  Header,
  Title,
  SwipeButton,
  HomeSkeleton,
  EmptyComponent,
  DateTimePicker,
  TextInput,
  Label,
} from '../../components';
import {
  Colors,
  ImageView,
  Storage_Key,
  Strings,
} from '../../constants/appConstants';
import {
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button as Btn
} from 'react-native';
import c from '../../styles';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import useInternetConnected from '../../hook/useInternetConnected';
import {
  getBatchAction,
  getShipmentOtp,
  getDeliverdAction,
  getRescheduledAction,
  getCancelledAction,
  batchUpdate,
  getWpCustomerOtpAction,
  getRefusedAction,
  getRefusedReasonAction,
} from '../../redux/Actions/Home';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import {
  batchInfo,
  batchItems,
  batchLoading,
  cancelledInfo,
  cancelledLoading,
  deliverdInfo,
  deliverdLoading,
  refusedInfo,
  refusedLoading,
  refusedReasonInfo,
  rescheduledInfo,
  rescheduledLoading,
} from '../../redux/Selectors/home';
import PrefManager from '../../utils/prefManager';
import { showPopupMessage } from '../../utils/helpers';
import moment from 'moment';
import { darkMode } from '../../redux/Selectors/setting';
import BackgroundTimer from 'react-native-background-timer';
import Dropdown from '../../components/Dropdown/dropdown';
import SignatureCanvas from 'react-native-signature-canvas';

const nDate = new Date() as any;
let forceResetLastButton = null as any;

export default function Home({ navigation }: any) {
  const [tripStart, setTripStart] = useState<any>(null);

  const [reached, setReached] = useState<boolean>(false);
  const [reschedule, setReschedule] = useState<boolean>(false);
  const [refuse, setRefuse] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [scrollDisable, setScrollDisable] = useState<boolean>(true);
  const [name, setName] = useState<any>('');
  const [reason, setReason] = useState<any>('');
  const [cancelError, setCancelError] = useState<any>('');

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const isConnected = useInternetConnected() as boolean;

  const [otp, setOtp] = useState<any>('');
  const [otpError, setOtpError] = useState<any>('');
  const [dateVisible, setDateVisible] = useState<boolean>(false);
  const [date, setDate] = useState<any>('');
  const [mobTime, setMob] = useState<any>('');
  const [self, setSelf] = useState<any>('');
  const [selfNumber, setSelfNumber] = useState<any>('');
  const [selfError, setSelfError] = useState<any>('');
  const [timer, setTimer] = useState(4);
  const timeInterval = useRef<any>(null);

  const getDropdowns = () => dispatch(getRefusedReasonAction());
  const dropdownOptions = useSelector(refusedReasonInfo) as any;
  const [refuseReason, setRefuseReason] = useState<any>('');;
  const inputRef = useRef<any>(null);

  const dispatch = useDispatch() as any;

  const getBatch = (request: any) => dispatch(getBatchAction(request));

  const batchData = useSelector(batchInfo) as any;
  const batchList = useSelector(batchItems) as any;

  const loading = useSelector(batchLoading) as any;

  const getShipment = (request: any) => dispatch(getShipmentOtp(request));
  // const shipmentData = useSelector(shipmentOtpInfo) as any;
  // const shipmentloading = useSelector(shipmentOtpLoading) as any;

  const getDeliverd = (request: any) => dispatch(getDeliverdAction(request));
  const deliverdData = useSelector(deliverdInfo) as any;
  const deliverdloading = useSelector(deliverdLoading) as any;

  const getWpCustomerOtp = (request: any) => dispatch(getWpCustomerOtpAction(request));

  const getRescheduled = (request: any) => dispatch(getRescheduledAction(request));
  const rescheduledData = useSelector(rescheduledInfo) as any;
  const rescheduledloading = useSelector(rescheduledLoading) as any;

  const getCancelled = (request: any) => dispatch(getCancelledAction(request));
  const cancelledData = useSelector(cancelledInfo) as any;
  const cancelledloading = useSelector(cancelledLoading) as any;

  const getRefused = (request: any) => dispatch(getRefusedAction(request));
  const refusedData = useSelector(refusedInfo) as any;
  const refusedloading = useSelector(refusedLoading) as any;
  const themes = useSelector(darkMode) as any;

  const scheme: any = Platform.select({
    ios: 'maps://0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng: any = `${28.5275548},${77.0445156}`;
  const label: string = 'Custom Label';

  const signRef = useRef(null);
  const [sign, setSign] = useState(null)

  const handleSignature = (signature) => {
    setSign(signature)
  };

  const handleClear = () => {
    signRef.current?.clearSignature();
    setSign(null);
  };

  const handleSave = async () => {
    const signature = await signRef.current?.readSignature();
    setSign(signature);
    return signature;
  };

  useEffect(() => {
    startTimer();
    // getAutoOTP();
    return () => {
      clearTimeoutFunc();
    };
  }, [timer]);

  const startTimer = () => {
    clearTimeoutFunc();
    timeInterval.current = BackgroundTimer.setTimeout(setTimeOutBody, 1000);
  };

  const setTimeOutBody = () => {
    if (timer === 0) {
      clearTimeoutFunc();
    } else {
      setTimer(timer - 1);
    }
  };

  const clearTimeoutFunc = () => {
    timeInterval.current && BackgroundTimer.clearTimeout(timeInterval.current);
    timeInterval.current = null;
  };

  useEffect(() => {
    PrefManager.getValue(Storage_Key.userData).then(data => {
      if (data) {
        pullDown(JSON.parse(data)?.id ?? 0);
        setName(JSON.parse(data)?.name ?? '');
      } else {
        showPopupMessage('Error', Strings.smWrongID, true);
      }
    });
  }, []);

  useEffect(() => {
    const status =
      batchData?.BatchData?.trip_status == 0
        ? true
        : batchData?.BatchData?.trip_status == 1
          ? false
          : (null as any);
    setTripStart(status);
  }, [batchData]);

  useEffect(() => {
    if (deliverdData?.status == 200) {
      try {
        const data = { ...batchData };
        data.BatchData.batchDetails[activeIndex].action_status = '1';
        setOtp('');
        dispatch(batchUpdate(data));
        setReached(false);
      } catch (error) { }
    } else {
      setOtpError(deliverdData.message);
    }
  }, [deliverdData]);

  useEffect(() => {
    if (rescheduledData?.status == 200) {
      const data = { ...batchData };
      data.BatchData.batchDetails[activeIndex].action_status = '2';
      dispatch(batchUpdate(data));
    }
  }, [rescheduledData]);

  useEffect(() => {
    if (cancelledData?.status == 200) {
      const data = { ...batchData };
      data.BatchData.batchDetails[activeIndex].action_status = '3';
      setCancel(false);
      dispatch(batchUpdate(data));
    }
  }, [cancelledData]);

  useEffect(() => {
    if (refusedData?.status == 200) {
      const data = { ...batchData };
      data.BatchData.batchDetails[activeIndex].action_status = '4';
      setRefuse(false);
      dispatch(batchUpdate(data));
    }
  }, [refusedData]);

  const pullDown = (id: any) => {
    const formData = {
      driverId: id
    }
    // new FormData();
    // formData.append('auth_key', Config.AUTH_KEY);
    // formData.append('driverId', id);
    getBatch(formData);
    getDropdowns();
  };

  const onChangeText = useCallback(
    (val: string) => {
      setOtp(val);
    },
    [otp],
  );
  const onChangeText2 = useCallback(
    (val: string) => {
      setSelf(val);
    },
    [self],
  );
  const onChangeNumber = useCallback(
    (val: string) => {
      setSelfNumber(val);
    },
    [selfNumber],
  );
  const onChangeTextCancel = useCallback(
    (val: string) => {
      setReason(val);
    },
    [reason],
  );


  const cancelComplete = (item: any, index: number) => {
    if (!reason) {
      setCancelError('Please enter remarks');
    } else {
      setCancelError('');
      setActiveIndex(index);
      // const formData = new FormData();
      // formData.append('auth_key', Config.AUTH_KEY);
      // formData.append('batch_id', batchData?.BatchData?.batch_id);
      // formData.append('shipment_id', item.id);
      // formData.append('remarks', reason);
      const formData = {
        'auth_key': Config.AUTH_KEY,
        'batch_id': batchData?.BatchData?.batch_id,
        'shipment_id': item.id,
        'remarks': reason,
        'isweb': 0
      }
      getCancelled(formData);
    }
  };

  const RenderType = ({ item, index }: any): JSX.Element => {
    const isBool = true as any;
    switch (isBool) {
      case reschedule:
        return (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDateVisible(true)}
              style={{
                borderColor: Colors.white,
                marginVertical: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !themes ? Colors.datePicker : Colors.acentLow,
                borderRadius: 8,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  padding: 10,
                  color: !themes ? Colors.black : Colors.white,
                }}>
                {date ? moment(date).format('DD/MM/YYYY hh:mm a') : ''}
              </Text>
              <Icon
                name={'calendar'}
                style={{ color: Colors.green, position: 'absolute', right: 16 }}
                solid
                size={16}
              />
            </TouchableOpacity>
          </View>
        );
      case refuse:
        return (
          <View>
            <Dropdown
              title="Refusal Reason"
              mandatoryField={1}
              data={dropdownOptions}
              value={refuseReason}
              onSelect={(index, status_code) => setRefuseReason(status_code)}
              placeholder="Select Refusal Reason"
              size="sm"
              labelField='reason'
              valueField='status_code'
              isActive={1}
            />
            {refuseReason == "0" ?
              <TextInput
                style={{
                  padding: 2,
                  backgroundColor: !themes
                    ? Colors.datePicker
                    : Colors.acent,
                  textAlign: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: Colors.otpInputBorderColor,
                  color: themes ? Colors.white : Colors.black,
                  height: 40,
                  width: '86%',
                  alignSelf: 'center',
                  marginTop: 12
                }}
                placeholder={'Enter Refusal Reason'}
                placeholderTextColor={
                  !themes ? Colors.black : Colors.white
                }
                ref={inputRef}
                onChangeText={(text) => {
                  inputRef.current = text;
                }}
                // error={selfError}
                title={Strings.refusalReasons}
                errorStyle={{ textAlign: 'center' }}
              /> : null}
          </View>
        );
      case cancel:
        return (
          <View>
            <TextInput
              multiline={true}
              style={{
                padding: 2,
                backgroundColor: !themes ? Colors.datePicker : Colors.acent,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 12,
                maxHeight: 80,
                padding: 8,
                textAlignVertical: 'top',
                maxWidth: '80%',
                borderColor: Colors.otpInputBorderColor,
                color: themes ? Colors.white : Colors.black,
              }}
              placeholder={'Please Enter Remarks'}
              placeholderTextColor={!themes ? Colors.black : Colors.white}
              onChangeText={onChangeTextCancel}
              value={reason}
              error={cancelError}
              title={'Remarks*'}
              numberOfLines={3}
            // errorStyle={{ textAlign: 'center'}}
            />
            <View style={{ flexDirection: 'row', marginVertical: 16 }}>
              <Text style={{ color: Colors.red, padding: 4 }}>
                Request cancellation
              </Text>
              <Button
                title={'Yes'}
                visible={cancelledloading}
                textStyle={styles.fontStyle}
                onPress={() => cancelComplete(item, index)}
                color={Colors.text1}
                style={[
                  styles.btnStyle,
                  {
                    marginHorizontal: 4,
                    paddingHorizontal: 10,
                    backgroundColor: Colors.black,
                  },
                ]}
              />
              <Button
                title={'No'}
                textStyle={styles.fontStyle}
                onPress={() => setCancel(false)}
                color={Colors.red}
                style={[
                  styles.btnStyle,
                  { paddingHorizontal: 8, backgroundColor: Colors.black },
                ]}
              />
            </View>

          </View>
        );
      default:
        return <View style={{ height: 20 }} />;
    }
  };

  //  otp and verify otp will call bassed on condition type
  const onReached = (type: string, item: any, index: number, send: any) => {
    if (type == 'submit' && otp.length == 0) {
      setOtpError(Strings.vOtp);
      if (!self && item.shipment_type == '2') {
        setSelfError('Please enter receipient name');
        return;
      }
    } else {
      if (type == 'reached') {
        setReached(true);
        setReschedule(false);
        setCancel(false);
        // const formData = new FormData();
        // formData.append('auth_key', Config.AUTH_KEY);
        // formData.append('batch_id', batchData?.BatchData?.batch_id);
        // formData.append('shipment_id', item.id);
        // formData.append('cust_mobile_no', item.cust_mobile);

        const formData = {
          "batch_id": batchData?.BatchData?.batch_id,
          "shipment_id": item.id,
          "cust_mobile_no": item.cust_mobile
        }
        if (type == 'reached' && send == '1') {
          getShipment(formData);
        }
        if (type == 'reached' && send == 'mb') {
          setMob('Y');
          startTimer();
          setTimer(60);
          getShipment(formData);
          showPopupMessage('success', 'Otp sent successfully', false);
        } else if (type == 'reached' && send == 'wp') {
          setMob('N');
          startTimer();
          setTimer(60);
          getWpCustomerOtp(formData);
          showPopupMessage('success', 'Otp sent via WhatsApp successfully', false);
        }
      } else {
        setOtpError('');
        // const formData = new FormData();
        // formData.append('auth_key', Config.AUTH_KEY);
        // formData.append('batch_id', batchData?.BatchData?.batch_id);
        // formData.append('shipment_id', item.id);
        // formData.append('otp', otp);
        // formData.append('shipment_received_by',item?.shipment_type == '2'?self:'');

        // const formData = {
        //   "batch_id": batchData?.BatchData?.batch_id,
        //   "shipment_id": item.id,
        //   'otp': otp,
        //   "shipment_received_by": item?.shipment_type == '2' ? self : ''
        // }
        if (!sign) {
          showPopupMessage('warning', 'Receipient signature is required', false);
          return;
        }

        const formData = {
          "batch_id": batchData?.BatchData?.batch_id,
          "shipment_id": item.id,
          "otp": otp,
          "receiver_name": item?.shipment_type == '2' ? self : '',
          "receiver_mobile": item?.shipment_type == '2' ? selfNumber : '',
          "receiver_sign": item?.shipment_type == '2' ? sign : ''
        }

        getDeliverd(formData);
      }
      setActiveIndex(index);
    }
  };

  const rescheduledComplete = (item: any, index: number) => {
    if (date) {
      // const formData = new FormData();
      // formData.append('auth_key', Config.AUTH_KEY);

      const formData = {
        'batch_id': batchData?.BatchData?.batch_id,
        'shipment_id': item.id,
        'rescheduled_datetime': moment(date).format('YYYY-MM-DD HH:MM:SS'),
        'isweb': 0
      }

      getRescheduled(formData);
      setDate('');
      setActiveIndex(index);
      setReschedule(false);
    } else {
      showPopupMessage('warning', 'Please select resheduled date', false);
    }
  };

  const refusedComplete = (item: any, index: number) => {
    if (refuseReason == "0" && !inputRef.current) {
      showPopupMessage('warning', 'Please add other reason', false);
      return;
    }
    if (refuseReason || refuseReason == "0") {
      const formData = {
        'batch_id': batchData?.BatchData?.batch_id,
        'shipment_id': item.id,
        'remarks': refuseReason,
        'isweb': 0,
        ...(refuseReason == "0" ? { other: inputRef.current } : {})
      }
      getRefused(formData);
      setActiveIndex(index);
      setRefuse(false);
      setRefuseReason('');
    } else {
      showPopupMessage('warning', 'Please select refusal reason', false);
    }
  }

  // here condition will check botton press type
  const onButtonAction = (type: string, item: any, index: number) => {
    setOtpError('');
    setDate('');
    setOtp('');
    setSelf(item?.cust_name ?? 'self');
    setSelfNumber(item?.cust_mobile ?? 'self');
    setSelfError('');
    setReason('')
    if (type == 'Reached') {
      setOtp('');
      setSelf(item?.cust_name ?? 'self');
      setSelfNumber(item?.cust_mobile ?? 'self');
      setReason('')
      onReached('reached', item, index, '1');
    } else if (type == 'Submit OTP') {
      onReached('submit', item, index, '2');
    } else if (type == 'Reschedule') {
      setReschedule(true);
      setReached(false);
      setCancel(false);
      setRefuse(false);
      setOtp('');
      setSelf(item?.cust_name ?? 'self');
      setSelfNumber(item?.cust_mobile ?? 'self');
      setReason('')
    } else if (type == 'Submit') {
      setOtp('');
      setSelf(item?.cust_name ?? 'self');
      setSelfNumber(item?.cust_mobile ?? 'self');
      setReason('')
      rescheduledComplete(item, index);
    } else if (type == 'cancel') {
      setReschedule(false);
      setReached(false);
      setCancel(true);
      setRefuse(false);
      setOtp('');
      setSelf(item?.cust_name ?? 'self');
      setSelfNumber(item?.cust_mobile ?? 'self');
    } else if (type == 'Refuse') {
      setReschedule(false);
      setReached(false);
      setCancel(false);
      setRefuse(true);
      setSelf(item?.cust_name ?? 'self');
      setSelfNumber(item?.cust_mobile ?? 'self');
      setRefuseReason("");
    } else if (type == "Update") {
      refusedComplete(item, index)
    }
    setActiveIndex(index);
  };

  const BottonView = ({ item, index }: any): JSX.Element => {
    const text1 =
      activeIndex == index && reached
        ? 'Submit OTP'
        : item.action_status == '1'
          ? 'Deliverd'
          : 'Reached';
    const text2 =
      activeIndex == index && reschedule
        ? 'Submit'
        : item.action_status == '2'
          ? 'Rescheduled'
          : 'Reschedule';
    const text3 = item.action_status == '3' ? 'Canceled' : 'Cancel';
    const text4 = activeIndex == index && refuse
      ? 'Update'
      : item.action_status == '4'
        ? 'Refused'
        : 'Refuse';
    const disable = !tripStart && item.action_status == '0' ? false : true;
    const buttonStyle = [
      styles.btnStyle,
      {
        backgroundColor:
          tripStart && themes
            ? Colors.acent
            : tripStart && !themes
              ? Colors.btnGray
              : item.action_status == '0' && themes
                ? 'rgba(0, 0, 0, 0.60)'
                : item.action_status != '0' && !themes
                  ? 'rgba(0, 0, 0, 0.60)'
                  : Colors.listTextColor,
      },
    ];
    return (
      <View style={styles.itemButtonFlexRow}>
        <Button
          visible={deliverdloading && activeIndex == index}
          title={text1}
          textStyle={styles.fontStyle}
          onPress={() => onButtonAction(text1, item, index)}
          color={
            tripStart
              ? Colors.btnTextGray
              : item.action_status != '0' && themes
                ? Colors.whiteDull
                : themes && !tripStart
                  ? Colors.text1
                  : themes
                    ? Colors.darkBtn
                    : item.action_status != '0'
                      ? Colors.whiteDull
                      : Colors.text1
          }
          style={buttonStyle}
          disabled={disable}
        />

        <Button
          visible={rescheduledloading && activeIndex == index}
          title={text2}
          textStyle={styles.fontStyle}
          onPress={() => onButtonAction(text2, item, index)}
          color={
            tripStart
              ? Colors.btnTextGray
              : item.action_status != '0' && themes
                ? Colors.whiteDull
                : themes && !tripStart
                  ? Colors.text2
                  : themes
                    ? Colors.darkBtn
                    : item.action_status != '0'
                      ? Colors.whiteDull
                      : Colors.text2
          }
          style={buttonStyle}
          disabled={disable}
        />

        {
          text2 == "Submit" &&
          <TouchableOpacity
            onPress={() => {
              setReschedule(false);
            }}
            style={{}}>
            <Image
              resizeMode='contain'
              style={c.img22}
              source={ImageView.close}
            />
          </TouchableOpacity>
        }

        <Button
          title={text4}
          textStyle={styles.fontStyle}
          onPress={() => { onButtonAction(text4, item, index) }}
          color={
            tripStart
              ? Colors.btnTextGray
              : item.action_status != '0' && themes
                ? Colors.whiteDull
                : themes && !tripStart
                  ? Colors.text4
                  : themes
                    ? Colors.darkBtn
                    : item.action_status != '0'
                      ? Colors.whiteDull
                      : Colors.text4
          }
          style={buttonStyle}
          disabled={disable}
        />

        {
          text4 == "Update" &&
          <TouchableOpacity
            onPress={() => {
              setRefuse(false);
            }}
            style={{}}>
            <Image
              resizeMode='contain'
              style={c.img22}
              source={ImageView.close}
            />
          </TouchableOpacity>
        }

        <Button
          title={text3}
          textStyle={styles.fontStyle}
          onPress={() => onButtonAction('cancel', item, index)}
          color={
            tripStart
              ? Colors.btnTextGray
              : item.action_status != '0' && themes
                ? Colors.whiteDull
                : themes && !tripStart
                  ? Colors.text3
                  : themes
                    ? Colors.darkBtn
                    : item.action_status != '0'
                      ? Colors.whiteDull
                      : Colors.text3
          }
          style={buttonStyle}
          disabled={disable}
        />

      </View>
    );
  };

  const navToOdometer = () => {
    if (
      batchData?.BatchData?.trip_status == 1 &&
      batchList.map((e: any) => e.action_status).includes('0')
    ) {
      showPopupMessage(
        'Error',
        ' You cannot end the trip before placing the order.',
        true,
      );
    } else {
      navigation.navigate('Odometer', {
        status: tripStart,
        batchId: batchData.BatchData.batch_id,
        callback: (e: any) => {
          onRefresh();
          setTripStart(e?.startWork ?? true);
        },
      });
    }
    setTimeout(() => {
      forceResetLastButton();
    }, 200);
  };

  const openPhone = (no: any) => Linking.openURL(`tel:${no}`);
  const openMap = () => Linking.openURL(`${scheme}${latLng}(${label})`);

  const renderItem: any = useCallback(
    ({ item, index }: any) => {
      return (

        <View style={[c.itemStyle(themes),
        {
          borderTopWidth: index == 0 ? 1 : 0,

        }]}>

          {item.action_status == '1' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', top: -6 }}>
              <Text>{"Delivered"}</Text>
              <Image
                resizeMode="contain"
                source={ImageView.deliverd}
                style={styles.imageStyle}
              />
            </View>
          )}

          {item.action_status == '2' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', top: -6 }}>
              <Text>{"Reached"}</Text>
              <Image
                resizeMode="contain"
                source={ImageView.resch}
                style={styles.imageStyle}
              />
            </View>
          )}

          {item.action_status == '3' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', top: -6 }}>
              <Text>{"Cancelled"}</Text>
              <Image
                resizeMode="contain"
                source={ImageView.close}
                style={styles.imageStyle}
              />
            </View>
          )}

          {item.action_status == '4' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', top: -6 }}>
              <Text>{"Refused"}</Text>
              <Image
                resizeMode="contain"
                source={ImageView.refuse}
                style={styles.imageStyle}
              />
            </View>
          )}

          <View style={{
            flexDirection: 'row',
            gap: 10
          }}>
            <Image source={ImageView.car} style={styles.iconStyle} />

            <View style={{ width: '86%' }}>
              <View style={styles.itemFlexRow}>
                <Title style={c.textSemi(themes)}>
                  {item.shipment_type == '1'
                    ? 'Pickup'
                    : item.shipment_type == '2'
                      ? 'Delivery'
                      : ''}
                </Title>
                <Icon
                  name={'circle'}
                  style={styles.dotStyle(themes)}
                  solid
                  size={5}
                />
                <Title style={styles.textMedium(themes)}>
                  {item?.awb_no ?? ''}
                </Title>
              </View>

              <View style={styles.itemFlexRow}>
                <Title style={styles.textMedium(themes)}>
                  {item?.cust_name ?? ''}
                </Title>
                <Icon
                  name={'circle'}
                  style={styles.dotStyle(themes)}
                  solid
                  size={5}
                />
                <Title style={styles.textMedium(themes)}>
                  {item?.cust_mobile ?? ''}
                </Title>
                <Icon
                  name={'phone-volume'}
                  onPress={() => openPhone(item.cust_mobile)}
                  style={c.phoneIconStyle}
                  solid
                  size={15}
                />
              </View>

              <View style={styles.itemFlexRow}>
                <Title style={styles.textMediumFlex(themes)}>
                  {item?.cust_address ?? ''}
                </Title>
                <Icon
                  name={'location-dot'}
                  onPress={openMap}
                  style={c.markerIconStyle}
                  solid
                  size={15}
                />
              </View>

              {activeIndex == index ? (
                reached ? (
                  <View>
                    {item.shipment_type == '2' && (
                      <>
                        <TextInput
                          style={{
                            padding: 2,
                            backgroundColor: !themes
                              ? Colors.datePicker
                              : Colors.acent,
                            textAlign: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 12,
                            borderColor: Colors.otpInputBorderColor,
                            color: themes ? Colors.white : Colors.black,
                            height: 40,
                            width: '86%',
                            alignSelf: 'center',
                            marginTop: 12
                          }}
                          placeholder={'Enter Receipient Name'}
                          placeholderTextColor={
                            !themes ? Colors.black : Colors.white
                          }
                          onChangeText={onChangeText2}
                          value={self}
                          error={selfError}
                          title={Strings.ename}
                          errorStyle={{ textAlign: 'center' }}
                        />
                        <TextInput
                          style={{
                            padding: 2,
                            backgroundColor: !themes
                              ? Colors.datePicker
                              : Colors.acent,
                            textAlign: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 12,
                            borderColor: Colors.otpInputBorderColor,
                            color: themes ? Colors.white : Colors.black,
                            height: 40,
                            width: '86%',
                            alignSelf: 'center',
                            marginTop: 12
                          }}
                          placeholder={'Enter Receipient Number'}
                          placeholderTextColor={
                            !themes ? Colors.black : Colors.white
                          }
                          onChangeText={onChangeNumber}
                          value={selfNumber}
                          error={selfError}
                          title={Strings.emnum2}
                          errorStyle={{ textAlign: 'center' }}
                        />
                        <Text style={c.textMedium(themes)}>Enter receipient signature *</Text>
                        <View style={signStyles.container}>
                          <SignatureCanvas
                            ref={signRef}
                            onOK={handleSignature}
                            webStyle={`.m-signature-pad { box-shadow: none; border: 1px solid #ccc; }
                                           .m-signature-pad--body { border: none; }
                                           .m-signature-pad--footer { display: none; }`}
                            style={signStyles.signature}
                            onBegin={() => setScrollDisable(false)}
                            onEnd={() => setScrollDisable(true)}
                          />
                          <View style={signStyles.buttons}>
                            <Btn title="Clear" onPress={handleClear} />
                            <Btn title="Save" onPress={handleSave} />
                          </View>
                        </View>
                      </>
                    )}
                    <TextInput
                      style={{
                        padding: 2,
                        backgroundColor: !themes
                          ? Colors.datePicker
                          : Colors.acent,
                        textAlign: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 12,
                        borderColor: Colors.otpInputBorderColor,
                        color: themes ? Colors.white : Colors.black,
                        height: 40,
                        width: '86%',
                        alignSelf: 'center'

                      }}
                      placeholder={'Enter OTP'}
                      placeholderTextColor={!themes ? Colors.black : Colors.white}
                      onChangeText={onChangeText}
                      value={otp}
                      error={otpError}
                      errorStyle={{ textAlign: 'center' }}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                    <View style={c.flexRowCenter}>
                      <Label
                        style={c.otpMStyle(themes)}
                        value={Strings.otpMCode}
                      />
                      <Label
                        style={c.otpNStyle(themes)}
                        onPress={() => {
                          timer === 0
                            ? onReached('reached', item, index, 'mb')
                            : undefined;
                        }}
                        value={
                          mobTime == 'Y' && timer !== 0
                            ? `00:${timer <= 9 ? '0' : ''}${timer}`
                            : Strings.resend
                        }
                      />
                    </View>
                    <View
                      style={[
                        c.flexRowCenter,
                        { marginBottom: -24, bottom: 14 },
                      ]}>
                      <Label style={c.otpMStyle(themes)} value={Strings.wpCode} />
                      <Label style={c.otpWpStyle} value={Strings.wp} />
                      <Label
                        style={c.otpNStyle(themes)}
                        onPress={() => {
                          timer === 0
                            ? onReached('reached', item, index, 'wp')
                            : undefined;
                        }}
                        value={
                          mobTime == 'N' && timer !== 0
                            ? `00:${timer <= 9 ? '0' : ''}${timer}`
                            : Strings.resend
                        }
                      />
                    </View>
                  </View>
                ) : (
                  <>
                    {cancel ?
                      <View>
                        <TextInput
                          multiline={true}
                          style={{
                            padding: 2,
                            backgroundColor: !themes ? Colors.datePicker : Colors.acent,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 12,
                            maxHeight: 80,
                            height: 80,
                            padding: 8,
                            textAlignVertical: 'top',
                            maxWidth: '80%',
                            borderColor: Colors.otpInputBorderColor,
                            color: themes ? Colors.white : Colors.black,
                          }}
                          placeholder={'Please Enter Remarks'}
                          placeholderTextColor={!themes ? Colors.black : Colors.white}
                          onChangeText={onChangeTextCancel}
                          value={reason}
                          error={cancelError}
                          title={'Remarks*'}
                          numberOfLines={3}
                        // errorStyle={{ textAlign: 'center'}}
                        />
                        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
                          <Text style={{ color: Colors.red, padding: 4 }}>
                            Request cancellation
                          </Text>
                          <Button
                            title={'Yes'}
                            visible={cancelledloading}
                            textStyle={styles.fontStyle}
                            onPress={() => cancelComplete(item, index)}
                            color={Colors.text1}
                            style={[
                              styles.btnStyle,
                              {
                                marginHorizontal: 4,
                                paddingHorizontal: 10,
                                backgroundColor: Colors.black,
                              },
                            ]}
                          />
                          <Button
                            title={'No'}
                            textStyle={styles.fontStyle}
                            onPress={() => setCancel(false)}
                            color={Colors.red}
                            style={[
                              styles.btnStyle,
                              { paddingHorizontal: 8, backgroundColor: Colors.black },
                            ]}
                          />
                        </View>

                      </View>
                      :
                      <RenderType item={item} index={index} />
                    }
                  </>
                )
              ) : (
                <View style={{ height: 20 }} />
              )}
              <BottonView item={item} index={index} />
            </View>
          </View>
        </View>

      );
    },
    [
      reached,
      reschedule,
      refuse,
      refuseReason,
      cancel,
      tripStart,
      activeIndex,
      date,
      otp,
      otpError,
      deliverdloading,
      rescheduledloading,
      cancelledloading,
      themes,
      timer,
      self,
      selfNumber,
      inputRef.current,
      selfError,
      cancelError,
      reason
    ],
  );

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );

  const listFooter: any = useCallback(() => {
    if (!loading && batchList && batchList?.length != 0) {
      return (
        <View style={styles.swipeStyle}>
          <SwipeButton
            disabled={false}
            swipeSuccessThreshold={70}
            height={48}
            status={tripStart}
            title={tripStart ? Strings.start : Strings.end}
            onSwipeSuccess={() => navToOdometer()}
            thumbIconBackgroundColor={Colors.slideThumb}
            thumbIconBorderColor={Colors.white}
            railBackgroundColor={tripStart ? Colors.green : Colors.red}
            railBorderColor={Colors.pink}
            thumbIconImageSource={ImageView.arrow}
            forceReset={reset => {
              forceResetLastButton = reset;
            }}
          />
        </View>
      );
    }
  }, [tripStart, batchData]);

  const onRefresh = () => {
    PrefManager.getValue(Storage_Key.userData).then(data => {
      if (data) {
        pullDown(JSON.parse(data)?.id ?? 0);
      }
    });
  };

  const refreshControl = () => {
    return (
      <RefreshControl
        refreshing={false}
        onRefresh={onRefresh}
        titleColor={Colors.acent}
      />
    );
  };

  const handleCancel = () => {
    setDateVisible(false);
  };

  const handleConfirm = (date: any) => {
    //date
    setDate(date);
    setDateVisible(false);
  };

  return (
    <Container light={false} style={c.flex1White(themes)}>
      <Header title={`Welcome ${name ? name : 'user'}`} />
      <View style={c.flex1}>
        {batchData?.BatchData?.batch_no && (
          <View style={styles.flexRow}>
            <Title size={18} style={c.textBold(themes)}>
              {Strings.batch}
            </Title>
            <Title style={styles.textMedium(themes)}>
              {batchData?.BatchData?.batch_no ?? 'NA'}
            </Title>
          </View>
        )}

        <FlatList
          scrollEnabled={scrollDisable}
          data={batchList}
          renderItem={renderItem}
          style={c.flex1}
          keyExtractor={keyExtractor}
          ListFooterComponent={tripStart == null ? null : listFooter}
          keyboardShouldPersistTaps={'handled'}
          removeClippedSubviews={true}
          refreshControl={refreshControl()}
          ListEmptyComponent={
            loading || (batchList?.length == 0 && !isConnected) ? (
              <HomeSkeleton />
            ) : (
              <EmptyComponent title={batchData?.message ?? ''} />
            )
          }
        />
      </View>

      <DateTimePicker
        isVisible={dateVisible}
        mode="datetime"
        minimumDate={new Date(nDate.getTime() + 86400000)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
}

const signStyles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  signature: { height: 300, borderWidth: 1, borderColor: '#ccc' },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
});