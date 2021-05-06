import React from 'react';
import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

import Routes from './src/routes';
import { useEffect } from 'react';
import { Plant } from './src/model/Plant';

export default function App() {

  async function listener(notification: Notifications.Notification) {
    const data = notification.request.content.data.plant as Plant;
    
    console.log(data);
  }

  useEffect(() => {

    const subscription = Notifications.addNotificationReceivedListener(listener);

    return () => subscription.remove();

  }, []);

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
