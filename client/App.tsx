import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { TailwindUIProvider } from 'rn-tailwind';
export default function App() {
  return (
    <TailwindUIProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </TailwindUIProvider>
  );
}
