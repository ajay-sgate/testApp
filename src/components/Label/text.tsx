import { Text } from 'react-native';
import React from 'react';
import c from '../../styles';

interface Props {
  value?: any;
  style?: any;
  onPress?: any;
  props?: any;
  numberOfLines?: any;
}
const AppText: React.FC<Props> = ({
  value,
  style,
  onPress,
  numberOfLines,
  ...props
}) => {
  return (
    <Text 
       
       onPress={onPress} 
       numberOfLines={numberOfLines} 
       style={[c.textMedium, style]}  {...props}>
      {value}
    </Text>
  );
};

export default AppText;