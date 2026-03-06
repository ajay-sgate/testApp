import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import c from '../../styles';
import s from './styles';
import { Colors, ImageView, Strings } from '../../constants/appConstants';
import { Title, Container, TextInput, Button, KeyboardAvoidingView } from '../../components';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, loginClear } from '../../redux/Actions/Auth/login';

import { loading, loginInfo } from '../../redux/Selectors/auth';
import { showPopupMessage } from '../../utils/helpers';
import { darkMode } from '../../redux/Selectors/setting';

export default function Signin({ navigation }: any) {
  const [mobile, setMobile] = useState<string>()
  const [error, setError] = useState<string>("")
  const loginData = useSelector(loginInfo) as any;
  const isLoading = useSelector(loading)as any;
  const dispatch = useDispatch()as any;
  const themes = useSelector(darkMode) as any;

  const loginAPI = (request: any) => dispatch(loginAction(request))
  const loginDataClear = () => dispatch(loginClear())

  useEffect(() => {
    if (loginData != undefined) {
      if (loginData?.status == 200) {
        navigation.navigate('OtpVerify', { mobile: mobile })
        loginDataClear()
      } else {
        showPopupMessage('Error', loginData?.message, true)
        loginDataClear()
      }
    }
  }, [loginData])

  const toLogin = () => {
    if (mobile?.length != 10) {
      setError(mobile?.length == 0 ? Strings.emnum : Strings.venum)
    } else {
      setError('')

      // const formData = new FormData();
      // formData.append('auth_key', Config.AUTH_KEY);
      // formData.append('mobile_no', mobile);
   
      const request = {
        mobile_no: mobile
      }
       
      loginAPI(request)
    }
  }

  const onChangeText = (val: string) => setMobile(val)

  return (
    <Container light style={c.flex1White(themes)}>
      <KeyboardAvoidingView>
        <Image
          resizeMode='center'
          style={c.logoStyle}
          source={ImageView.splashLogo} />

        <Title style={s.titleStyle(themes)}>{Strings.signIn}</Title>

        <View style={c.marginH24}>
          <TextInput
            placeholder={Strings.emnum}
            value={mobile}
            onChangeText={onChangeText}
            error={error}
            title={Strings.mnum}
            keyboardType='numeric'
          />

          <Button
            top={2}
            visible={isLoading}
            onPress={()=>toLogin()}
            color={Colors.black}
            style={c.buttonStyle}
            title={Strings.signIn} />
        </View>

      </KeyboardAvoidingView>
    </Container>
  )
}