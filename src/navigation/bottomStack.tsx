import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
  Home,
  Track,
  Booking,
  Profile
} from './route';
import { Image, View } from 'react-native';
import c from '../styles';
import { Colors, ImageView,Strings } from '../constants/appConstants';
import { Title } from '../components';
import { useSelector } from 'react-redux';
import { darkMode } from '../redux/Selectors/setting';

const BottomTab = createBottomTabNavigator();

const BottomStack = (): JSX.Element => {
  const themes = useSelector(darkMode) as any;

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Colors.acent,
        inactiveBackgroundColor: Colors.acent,
      }}
      screenOptions={{
        headerShown: false,
        title: '',
        tabBarShowLabel: false,
        tabBarStyle: {
          width: '100%',
        },
      }}>
      <BottomTab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarStyle: {
            height: 62,
          },
          tabBarIcon: ({ focused }) => (
            <View style={c.tabPadding}>
              <Image
                style={[c.img20, { tintColor: focused ? Colors.white : Colors.text_gray }]}
                source={ImageView.home} />

              <Title
                color={focused ? Colors.white : Colors.text_gray}
                style={c.textMedium(themes)}>{Strings.home}</Title>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={'Track'}
        component={Track}
        options={{
          tabBarStyle: {
            height: 62,
          },
          tabBarIcon: ({ focused }) => (
            <View style={c.flexCenter}>
              <Image
                style={[c.img20, { tintColor: focused ? Colors.white : Colors.text_gray }]}
                source={ImageView.track} />

              <Title
                color={focused ? Colors.white : Colors.text_gray}
                style={c.textMedium(themes)}>{Strings.track}</Title>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={'Booking'}
        component={Booking}
        options={{
          unmountOnBlur: true,
          tabBarStyle: {
            height: 62,
          },
          tabBarIcon: ({ focused }) => (
            <View style={c.flexCenter}>
              <Image
                style={[c.img20, { tintColor: focused ? Colors.white : Colors.text_gray }]}
                source={ImageView.booking} />

              <Title
                color={focused ? Colors.white : Colors.text_gray}
                style={c.textMedium(themes)}>{Strings.booking}</Title>
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: {
            height: 62,
          },
          tabBarIcon: ({ focused }) => (
            <View style={c.flexCenter}>
              <Image
                style={[c.img20, { tintColor: focused ? Colors.white : Colors.text_gray }]}
                source={ImageView.person} />

              <Title
                color={focused ? Colors.white : Colors.text_gray}
                style={c.textMedium(themes)}>{Strings.profile}</Title>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomStack;