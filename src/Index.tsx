import * as React from 'react';
import {Navigation, RootStack} from './config/Navigation';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function Index() {
  return (
    <Navigation /*needs to be the first thing in the app*/>
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
  );
}
