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
import AlertComponent from './src/components/Alert/Alert';
import OneSignal from 'react-native-onesignal';
//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('0cbdbf44-814f-4ce0-9c60-ed48ea770ab4');
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log('Prompt response:', response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
  console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log('notification: ', notification);
  const data = notification.additionalData;
  console.log('additionalData: ', data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {
  console.log('OneSignal: notification opened:', notification);
});
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
            <AlertComponent />
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </GlobalProvider>
    );
  }
};
export default App;
