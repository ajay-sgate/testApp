/* eslint-disable react-native/split-platform-components */
import React, { useEffect, useState } from 'react'
import { Button, Container, Header, KeyboardAvoidingView, TextInput, Title } from '../../components'
import { Colors, ImageView, Storage_Key, Strings } from '../../constants/appConstants';
import { launchCamera } from 'react-native-image-picker';
import { Alert, Linking, Platform, View, PermissionsAndroid, Image, TouchableOpacity } from 'react-native';
import { endWorkClear, getEndWorkAction, getStartWorkAction, startWorkClear } from '../../redux/Actions/Home/startWork';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import { endWorkInfo, endWorkLoading, startWorkInfo, startWorkLoading } from '../../redux/Selectors/startWork';
import { showPopupMessage } from '../../utils/helpers';

import c from '../../styles';
import { styles } from './styles';
import PrefManager from '../../utils/prefManager';
import { darkMode } from '../../redux/Selectors/setting';

export default function Odometer({ navigation, route }: any) {

  const [km, setKm] = useState<string>("")
  const [image, setImage] = useState<any>([])

  const dispatch = useDispatch() as any;

  const getStartWork = (request: any) => dispatch(getStartWorkAction(request))
  const startWorkData = useSelector(startWorkInfo) as any;
  const startLoading = useSelector(startWorkLoading) as any;

  const endWork = (request: any) => dispatch(getEndWorkAction(request))
  const endWorkData = useSelector(endWorkInfo) as any;
  const endtLoading = useSelector(endWorkLoading) as any;

  const [error, setError] = useState<any>("")
  const themes = useSelector(darkMode) as any;

  useEffect(() => {
    if (startWorkData?.status == 200) {
      PrefManager.setValue(Storage_Key.odometer, JSON.stringify(km))
      dispatch(startWorkClear());
      route.params.callback({ startWork: false })
      navigation.goBack()   
    }
  }, [startWorkData])

  useEffect(() => {
    if (endWorkData?.status == 200) {
      PrefManager.removeValue(Storage_Key.odometer)
      dispatch(endWorkClear());
      route.params.callback({ startWork: true })
      navigation.goBack()
    }else{
      if (endWorkData?.message) {
        showPopupMessage('Error', endWorkData?.message, true) 
      }
    }
  }, [endWorkData])

  const takePermissions = async () => {
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: Strings.perTitle,
          message: Strings.perMessage,
          buttonNegative: Strings.cancel,
          buttonPositive: Strings.ok
        });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        toUpload()
      } else {
        Alert.alert(
          Strings.perTitle,
          Strings.perWarn,
          [
            {
              text: Strings.cancel,
              onPress: () => { },
              style: "cancel"
            },
            { text: Strings.ok, onPress: () => Linking.openSettings() }
          ]
        );
      }
    } else {
      toUpload()
    }
  }

  const toUpload = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 5,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.4,
    };

    /** open the camera */
    launchCamera(options, (response: any) => {
      console.log(JSON.stringify(response));

      if (response.assets) {
        setImage(response.assets)
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
        }
      }
    }).catch(e => {
      console.log('e', e);
    })
  }

  const onChangeText = (val: string) => { setKm(val) }

  const onSubmit = () => {
    console.log('1-------------');

    if (image.length == 0) {
      showPopupMessage('Error', "Please Upload File ", true)
    } else if (km?.length < 5) {
      setError("Please enter at least 5 digit no.")
    }
    else {
      console.log('2-------------');
      setError("")
      PrefManager.getValue(Storage_Key.userData).then(data => {
        PrefManager.getValue(Storage_Key.odometer).then(odometer => {
          if (data) {

            console.log('data', JSON.stringify(data));

            const formData = new FormData();
            formData.append('auth_key', Config.AUTH_KEY);
            formData.append('odometer', {
              uri: image[0].uri,
              name: image[0].fileName,
              type: image[0].type
            });
            formData.append('batch_id', route.params.batchId);
            formData.append(route.params.status ? 'start_meter' : 'end_meter', km);
            formData.append('driverId', JSON.parse(data)?.id ?? 0);

            if (route.params.status) {
              getStartWork(formData)
              console.log('3-------------');
            } else {
              if (odometer) {
                if (parseInt(km) > JSON.parse(odometer)) {
                  endWork(formData)
                  console.log('4-------------');
                }
                else {
                  console.log('7-------------');
                  setError("Km reading must be greater than to previous")
                }
              } else {
                console.log('6-------------');
                endWork(formData)
              }
            }
          }
        })
      })
    }
  }

  const onRemove = () => setImage([])

  return (
    <Container style={c.flex1White(themes)}>
      <KeyboardAvoidingView>
        <Header
          onBack={() => navigation.goBack()}
          title={Strings.odometer} />

        <Title style={styles.titleStyle(themes)}>{Strings.odometer}</Title>

        <View style={c.marginH24}>
          <Button
            top={24}
            icon={'upload'}
            onPress={takePermissions}
            color={Colors.black}
            style={styles.uploadFile}
            title={Strings.uFile} />

          {image[0]?.uri && image[0]?.uri &&
            <View style={c.marginTop10}>
              <TouchableOpacity onPress={() => onRemove()}
                style={styles.closeStyle}>
                <Image resizeMode='contain' style={c.img18} source={ImageView.close} />
              </TouchableOpacity>
              <Image source={{ uri: image[0].uri }} style={styles.camImgStyle} />
            </View>
          }

          <TextInput
            placeholder={Strings.eodometer}
            value={km}
            onChangeText={onChangeText}
            title={Strings.eodometer}
            keyboardType='numeric'
            error={error}
          />

          <Button
            top={2}
            visible={(startLoading || endtLoading)}
            onPress={() => onSubmit()}
            color={Colors.black}
            style={c.buttonStyle}
            title={Strings.submit} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  )
}