import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { Welcome } from './src/pages/Welcome'
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import { UserIdentification } from './src/pages/UserIdentification';
import { Confirmation } from './src/pages/Confirmation';

import Routes from './src/routes';


export default function App() {

  const [fontsLoaded, error] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (error !== null && error !== undefined) {
    return (
      <Text>
        Erro: {error}
      </Text>
    );
  }

  if (!fontsLoaded) {
      return (
        <AppLoading />
      )
  }

  return (
    <Routes />
  );
}
