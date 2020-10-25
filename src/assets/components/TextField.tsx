import * as React from 'react';
import {StyleProp} from 'react-native';
import {TextInput} from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

const TextField: React.FC<Omit<TextInputProps,"theme">> = props => {
 
  return (
    //@ts-ignore
    <TextInput
      mode="outlined"
      {...props}
      style={[{width: '100%'}, props.style]}
    />
  );
};
export default TextField;
