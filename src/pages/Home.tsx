import * as React from 'react';
import {View, Text} from 'react-native';
import { RouteProp } from 'src/config/Navigation';


export default function Home(props:RouteProp<"HOME">) {
  return (
    <View>
      <Text onPress={()=>props.navigation.push("SIGN_UP")}>HOME</Text>
    </View>
  );
}
