import { PlantRepositoryImpl } from '../infrastructure/repository/storage/PlantRepositoryImpl';
import { Plant } from '../model/Plant';
import * as Notification from 'expo-notifications';
import { Platform } from 'react-native';
import { isBefore } from 'date-fns';

const repository = new PlantRepositoryImpl();

async function createNotification(plant: Plant): Promise<string> {
  const nextTime = new Date(plant.dateTimeNotification);
  const now = new Date();

  const { times, repeat_every } = plant.frequency;

  if (repeat_every === 'week') {
    const interval = Math.trunc(7 / times);
    nextTime.setDate(now.getDate() + interval);
  } else {
    const isbefore = isBefore(nextTime, now);
    console.log("isBefore ?" + isBefore);
    if (isbefore) {
      nextTime.setDate(nextTime.getDate() + 1);
    }
  }

  const secounds = Math.abs(Math.ceil(now.getTime() - nextTime.getTime()) / 1000);

  const notificationId = await Notification.scheduleNotificationAsync({
    content: {
      title: 'Heeey, 🌱',
      body: 'Está na hora de regar sua ' + plant.name,
      sound: true,
      priority: Notification.AndroidNotificationPriority.HIGH,
      vibrate: [1],
      data: {
        plant
      },
    },
    trigger: {
      seconds: secounds < 60 ? 60 : secounds,
      repeats: true
    }
  });

  return notificationId;
}

export async function savePlant(plant: Plant): Promise<void> {
  
  const notificationId = await createNotification(plant);

  return await repository.save(plant);
}

export async function loadPlantsOrderedByDate() {
  const plants = await loadPlants();
  plants.sort((a, b) => 
    Math.floor(
      new Date(a.dateTimeNotification).getTime() / 1000 -
      Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
    )
  );

  return plants;
}

export async function removePlant(plantId: number) {
  const plant = await repository.getById(plantId);

  if (plant === null)
    throw new Error(`Planta não encontrada '${plantId}'!`);

  if (plant.notificationId)
    await Notification.cancelScheduledNotificationAsync(plant.notificationId);

  return await repository.delete(plantId);
}

export async function loadPlants(): Promise<Plant[]> {
  return await repository.listAll();
}