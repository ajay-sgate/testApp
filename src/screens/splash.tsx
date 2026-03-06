import React, { useEffect } from 'react'
import { Container } from '../components'
import c from '../styles'
import { Image, View } from 'react-native'
import { ImageView, Storage_Key } from '../constants/appConstants'
import { toHome, toSignin } from '../navigation/navigationHelper'
import PrefManager from '../utils/prefManager'

export default function Splash({ navigation }: any) {

  useEffect(() => {
    const timer = setTimeout(() => {
      PrefManager.getValue(Storage_Key.userData).then(e=>{
        if (e) {
          navigation.dispatch(toHome);
        }else{
          navigation.dispatch(toSignin);
        }
      })
    }, 2000);

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Container style={c.flex1AcentCenter}>
      <View style={c.flex1AcentCenter}>
      <Image resizeMode='center' source={ImageView.splashLogo} />
      </View>
    </Container>
  )
}