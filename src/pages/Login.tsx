import * as React from 'react';
import {View, Text} from 'react-native';
import { RouteProp } from 'src/config/Navigation';


export default function Login(props:RouteProp<"LOGIN">) {
  return (
    <View>
      <Text onPress={()=>props.navigation.push("SIGN_UP")}>Login</Text>
    </View>
  );
}
