import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { Colors, Dimens, Fonts } from '../../constants/appConstants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import c from '../../styles';

type ButtonProps = any & {
  title: string;
  visible?: boolean;
  disabled?: boolean;
  onPress: () => void;
  style: any;
  color?: any,
  textStyle?: any,
  top?: string | number;
  bottom?: string | number;
  icon?:any;
  bgColor?:any
};

export default function Button({
  onPress,
  title,
  style,
  color,
  visible,
  disabled,
  top,
  textStyle,
  bottom,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[style, { marginTop: top, marginBottom: bottom }]}
      activeOpacity={visible ? 1 : 0.6}
      disabled={disabled}
      onPress={visible ? null : onPress}>
      {visible ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <View style={c.flexRow}>
        {icon && 
           <Icon name={icon} style={s.iconStyle} solid size={15}/>
         }
        <Text style={[s.textStyle,textStyle, {color: color ? color: Colors.white}]}>{title}</Text>  
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
    iconStyle:{
      color:Colors.acent,
      marginRight:8
    },
    textStyle: {
      fontFamily: Fonts.semiBold,
      fontSize: Dimens.f16,
    }
  });
