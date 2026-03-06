import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors, Fonts } from '../../constants/appConstants'

interface TitleProps {
  style?: any,
  onLayout?: any,
  children?: string,
  size?: any,
  color?: any
}

export default function Title({ style, size, color, onLayout, ...props }: TitleProps): JSX.Element {
  const fSize = { fontSize: size ? size : style?.fontSize ?? 24 } as any
  const fColor = { color: color ? color : style?.color ?? Colors.primary } as any
  return <Text onLayout={onLayout} style={[styles.title, style, fSize, fColor]} {...props} />
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.semiBold,
    textAlign: 'center'
  },
})
