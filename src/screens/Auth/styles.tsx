import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../constants/appConstants';
import c from '../../styles';

const s = StyleSheet.create({
  eOtpStyle: (theme: boolean) => ({
    color: !theme ? Colors.acent : Colors.white,
    marginBottom: 12,
    marginTop: 80
  }),
  errorStyle: {
    ...c.errorStyle,
    marginBottom: 24,
    top: -12
  },
  otpInputStyle: {
    height: 60,
    marginTop: 32,
  },
  otpStyle: (theme: boolean) => ({
    fontFamily: Fonts.medium,
    fontSize: 24,
    color: !theme ? Colors.acent : Colors.white
  }),
  titleStyle: (theme: boolean) => ({
    marginBottom: 80,
    marginTop: 24,
    color: !theme ? Colors.acent : Colors.white
  }),
});

export default s;