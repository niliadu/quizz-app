import * as React from 'react';
import {RecoilRoot} from 'recoil';
import {Navigation, RootStack} from './config/Navigation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './pages/SplashScreen';


export default function Index() {
  return (
    <RecoilRoot>
      <Navigation /*needs to be the first thing in the app*/>
        <RootStack.Screen
          name="SPLASH_SCREEN"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="LOGIN"
          component={Login}
          options={{title: 'Test'}}
        />
        <RootStack.Screen
          name="SIGN_UP"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      </Navigation>
    </RecoilRoot>
  );
}
