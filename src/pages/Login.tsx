import * as React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Theme from '../assets/Theme';
import { RouteProp } from 'src/config/Navigation';
import TextField from '../assets/components/TextField';


export default function Login(props:RouteProp<"LOGIN">) {
  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../assets/Images/logo_name.png')}/>
      
      <TextField label="Username" style={styles.username}/>
      <TextField label="Password" style={styles.password}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  logo: {
    width: 0.6 * Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 3.33,
  },
  username:{
    marginTop: 50
  },
  password:{
    marginTop: 20
  }
});
