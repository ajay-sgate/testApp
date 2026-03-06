import React, {useState } from "react";
import { Button, Container, Header } from '../../components'
import { Colors,Storage_Key, Strings } from '../../constants/appConstants'
import { s } from './styles'
import PrefManager from '../../utils/prefManager'
import { toSignin } from '../../navigation/navigationHelper'
import { Switch,Text, View } from 'react-native'
import { showPopupMessage } from "../../utils/helpers";
import c from "../../styles";
import { styles } from "../Home/styles";
import { useFocusEffect } from "@react-navigation/native";
import { changeTheme } from "../../redux/Actions/Setting";
import { useDispatch, useSelector } from 'react-redux';
import { darkMode } from "../../redux/Selectors/setting";

export default function Profile({ navigation }: any) {
  const [name, setName] = useState<any>("")
  const isDarkTheme = useSelector(darkMode) as any;
  const dispatch = useDispatch() as any;

  const toSubmit = () => {
    PrefManager.removeValue(Storage_Key.userData)
    navigation.dispatch(toSignin);
  }

  const toggleTheme = () => {
    dispatch(changeTheme(!isDarkTheme));
  };

  useFocusEffect(
    React.useCallback(() => {
      PrefManager.getValue(Storage_Key.userData).then(data => {
        if (data) {
          setName((JSON.parse(data)?.first_name ?? '') + ' ' + (JSON.parse(data)?.last_name ?? ''))
        } else {
          showPopupMessage('Error', Strings.smWrongID, true)
        }
      })
    }, [])
  );

  return (
    <Container style={c.flex1White(isDarkTheme)}>
      <Header title={`Welcome ${name ? name : 'user'}`} />
      <View style={c.flexRowSpaceBetween}>
        <Text style={styles.textMedium(isDarkTheme)}>{"Dark Mode"}</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? Colors.secondary : Colors.white}
          ios_backgroundColor={Colors.primary}
          trackColor={{
            false: Colors.primary,
            true: Colors.white,
          }}
        >
        </Switch>
      </View>
      <View style={c.line} />
      <Button
        top={2}
        onPress={()=>toSubmit()}
        color={Colors.black}
        style={s.buttonStyle}
        title={Strings.logout} />
    </Container>
  )
}