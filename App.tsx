import React from 'react';
import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

import * as Notification from 'expo-notifications';

import Routes from './src/routes';
import { useEffect } from 'react';
import { Plant, PlantNotification } from './src/model/Plant';
import { createPlantNotification } from './src/service/PlantService';
import { clearUser } from './src/service/UserService';

async function notificationListener(notification: Notification.Notification) {
  const data = notification.request.content.data.plant as PlantNotification;
  console.log("notification listener",data);

  createPlantNotification(data);
}

export default function App() {

  useEffect(() => {
    
    async function clearNotifications() {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    async function getNotifications() {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();

      console.log("### notifications ###", notifications);
    }

    getNotifications();
    clearNotifications();
    clearUser();
    // const subscription = Notifications.addNotificationReceivedListener(notificationListener);

    // return () => subscription.remove();

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
