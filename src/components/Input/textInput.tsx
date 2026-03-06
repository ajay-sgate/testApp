import React from 'react'
import { View, StyleSheet, Text, TextInput as Input } from 'react-native'
import { Colors} from "../../constants/appConstants";
import c from '../../styles';
import { useSelector } from 'react-redux';
import { darkMode } from '../../redux/Selectors/setting';

type TextInputProps = any & {
  innerRef: any,
  error: string,
  value:any,
  autoCompleteType?: boolean,
  title: string,
  onSubmitEditing?:any,
  containerStyle: any,
  errorStyle:any,
  placeholderTextColor:any
}

export default function TextInput(
  {
    innerRef,
    error,
    autoCompleteType = false,
    title,
    onSubmitEditing,
    containerStyle,
    value,
    errorStyle,
    placeholderTextColor,
    ...props
  }: TextInputProps): JSX.Element {
    const themes = useSelector(darkMode) as any;
    
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {title ? (
        <Text style={c.textMedium(themes)}>{title}</Text>
      ) : null}
      <Input
        ref={innerRef}
        value={value}
        style={[styles.inputStyle(themes),{borderColor:error ? Colors.red: value && !themes? Colors.black: Colors.border}]}
        selectionColor={Colors.primary}
        underlineColor="transparent"
        autoCompleteType={autoCompleteType}
        placeholderTextColor={placeholderTextColor && !themes  ? placeholderTextColor:"#8A9199"}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
      {error ? <Text style={[c.errorStyle,errorStyle]}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: '100%',
  },
  inputStyle: (theme: boolean) => ({
    borderRadius: 8,
    borderWidth:theme? 0:1,
    color:!theme? Colors.black:Colors.white,
    backgroundColor:theme?"#2B303A":Colors.white,
    height: 56,
    borderColor:theme?Colors.white:Colors.acent,
    marginTop: 9,
    paddingHorizontal: 12,
    width: '100%',
  }),
})