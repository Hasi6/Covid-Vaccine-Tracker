import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import AdminDashBoard from '../screens/AdminDashBoard/AdminDashBoard';
import DashBoard from '../screens/Dashboard/Dashboard';
import Loading from '../screens/Loding/Loading';
import Login from '../screens/Login/Login';

import NotFoundScreen from '../screens/NotFoundScreen';
import UpdateDetails from '../screens/UpdateDetails/UpdateDetails';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Loading' component={Loading} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Dashboard' component={DashBoard} options={{ headerShown: false }} />
      <Stack.Screen
        name='UpdateDetails'
        component={UpdateDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AdminDashBoard'
        component={AdminDashBoard}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
