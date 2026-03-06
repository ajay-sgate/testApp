import { View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Colors } from '../../constants/appConstants';
import c from '../../styles';
import { useSelector } from 'react-redux';
import { darkMode } from '../../redux/Selectors/setting';


interface ContainerProps {
  style?: ViewStyle;
  light?: boolean,
  children?: ReactNode;
}

export default function Container({
  style,
  children,
  light,
}: ContainerProps): JSX.Element {
  const isDarkTheme = useSelector(darkMode) as any;
  return (
    <SafeAreaView
      edges={['right', 'left', 'top', 'bottom']}
      style={style ? style : c.flex1Acent(isDarkTheme)}>
      {light && !isDarkTheme ?
        <StatusBar barStyle={light && isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={!isDarkTheme && light ? Colors.white : Colors.acent} />
        :
        !light && !isDarkTheme ?
          <StatusBar barStyle={'light-content'} backgroundColor={Colors.acent} />
          :
          <StatusBar barStyle={'light-content'} backgroundColor={Colors.acent} />

      }
      <View style={c.flex1White(isDarkTheme)}>
        {children}
      </View>
    </SafeAreaView>
  );
}