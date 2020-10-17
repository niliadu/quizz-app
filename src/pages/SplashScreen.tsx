import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {RouteProp} from 'src/config/Navigation';
import Theme from '../assets/Theme';
import auth from '@react-native-firebase/auth';
import {Animated} from 'react-native';

export default function SplashScreen(props: RouteProp<'SPLASH_SCREEN'>) {
  const [checkingUser, setCheckingUser] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const subs = auth().onAuthStateChanged(user => {
      props.navigation.reset({
        index: 0,
        routes:[{name: !!user ? "HOME" : "LOGIN"}]
      });
    });
    return subs;
  }, []);

  const opacity = React.useRef(new Animated.Value(1)).current;
  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <View style={styles.view}>
      <Animated.Image
        style={{...styles.logo, opacity: opacity}}
        source={require('../assets/Images/logo.png')}
      />
    </View>
  );
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 0.3 * window.width,
    height: undefined,
    aspectRatio: 1,
  },
});
