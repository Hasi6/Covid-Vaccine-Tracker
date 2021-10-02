import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { GlobalProvider } from './src/context';

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <GlobalProvider>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </GlobalProvider>
    );
  }
};
export default App;
