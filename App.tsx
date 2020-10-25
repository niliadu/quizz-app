import 'react-native-gesture-handler';
import * as React from 'react';
import Index from './src/Index';
import {Provider as PaperProvider} from 'react-native-paper';
import Theme from './src/assets/Theme';

const App = () => (
  <PaperProvider theme={Theme.settings}>
    <Index />
  </PaperProvider>
);

export default App;
