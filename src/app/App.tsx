import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

function App(): JSX.Element {

  return (
    <React.StrictMode>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </React.StrictMode>
  );
}

export default App;
