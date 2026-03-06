import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Splash,
  Signin,
  OtpVerify,
  Odometer,
} from './route';
import BottomStack from "./bottomStack";

type RootStackParamList = {
  Splash: undefined;
  Signin: undefined;
  OtpVerify: undefined;
  Home: undefined;
  Odometer: undefined;
  DatePickerScreen: { title: string; currentDate: Date; callback: any };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const screenOptions = {
  headerShown: false,
  animation: 'simple_push',
} as any

export default function NavigatorStack(): JSX.Element {
  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="Signin" component={Signin} />
      <RootStack.Screen name="OtpVerify" component={OtpVerify} />
      <RootStack.Screen name="Home" component={BottomStack} />
      <RootStack.Screen name="Odometer" component={Odometer} />
    </RootStack.Navigator>
  );
}
