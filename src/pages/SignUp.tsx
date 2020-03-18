import * as React from 'react';
import {View, Text} from 'react-native';
import { RouteProp } from 'src/config/Navigation';

export default function SignUp(props: RouteProp<"SIGN_UP">) {
  return (
    <View>
      <Text onPress={()=> props.navigation.pop()}>Sign Up</Text>
    </View>
  );
}
