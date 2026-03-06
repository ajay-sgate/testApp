import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import NavigatorStack from './navigatorStack';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../utils/ignoreWarnings';
import {  Text, TextInput, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import c from '../styles';
import { navigationRef } from './navigationHelper';
import '../utils/ignoreWarnings';
import { Provider } from 'react-redux'
import {store} from "../redux/configureStore";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://86e8ebdcf4f269de04c1b4a4694af10d@o4504689421385728.ingest.us.sentry.io/4507026873122816",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

function App(): JSX.Element {

  useEffect(() => {
    if (((Text as unknown) as TextWithDefaultProps).defaultProps) {
      ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
    } else {
      ((Text as unknown) as TextWithDefaultProps).defaultProps =
        ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
      ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
    }

    if (((TextInput as unknown) as TextInputWithDefaultProps).defaultProps) {
      ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    } else {
      ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps =
        ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
      ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    }
  }, [])

  const theme = useColorScheme();
  //  const store = configureStore();
  return (
    <SafeAreaProvider>
       <Provider store={store}>
       <GestureHandlerRootView style={c.flex1}>
        <NavigationContainer ref={navigationRef} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <NavigatorStack />
          <FlashMessage position="top" />
        </NavigationContainer>
      </GestureHandlerRootView>
       </Provider>
    </SafeAreaProvider>
  );
}

export default App;