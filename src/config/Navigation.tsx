import * as React from 'react';
import {NavigationContainer, RouteProp as RP} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SplashScreen from '../pages/SignUp';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

export type RoutesParams = {
  LOGIN: undefined;
  SIGN_UP: undefined;
  SPLASH_SCREEN: undefined;
  HOME: undefined;
};

export const RootStack = createStackNavigator<RoutesParams>();

export const Navigation: React.FC = props => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>{props.children}</RootStack.Navigator>
    </NavigationContainer>
  );
};

export type RouteProp<T extends keyof RoutesParams> = {
  route: RP<RoutesParams, T>;
  navigation: StackNavigationProp<RoutesParams, T>;
};