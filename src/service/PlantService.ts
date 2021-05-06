import { PlantRepositoryImpl } from '../infrastructure/repository/storage/PlantRepositoryImpl';
import { Plant, PlantNotification } from '../model/Plant';
import * as Notification from 'expo-notifications';
import { Platform } from 'react-native';
import { isBefore } from 'date-fns';
import { PlantMapper } from '../mapper/PlantMapper';

const repository = new PlantRepositoryImpl();

async function createNotification(plant: PlantNotification): Promise<string> {
  const nextTime = new Date(plant.dateTimeNotification);
  const now = new Date();

  const { times, repeat_every } = plant;

  const isbefore = isBefore(nextTime, now);

  if (repeat_every === 'week') {
    const interval = Math.trunc(7 / times);
    nextTime.setDate(now.getDate() + interval);
  } else if (isbefore) {
    nextTime.setDate(nextTime.getDate() + 1);
  }

  console.log("next time: ", nextTime);

  const secounds = Math.abs(Math.ceil(now.getTime() - nextTime.getTime()) / 1000);

  const SEC = 1000;

  const notificationId = await Notification.scheduleNotificationAsync({
    content: {
      title: 'Heeey, 🌱',
      body: 'Está na hora de regar sua ' + plant.name,
      sound: true,
      priority: Notification.AndroidNotificationPriority.HIGH,
      vibrate: [1 * SEC, 2 * SEC, 3 * SEC],
      data: {
        plant
      },
    },
    trigger: {
      seconds: secounds < 60 ? 60 : secounds,
      repeats: false
    }
  });

  return notificationId;
}

export async function notificationListener(notification: Notification.Notification) {
  const data = notification.request.content.data.plant as PlantNotification;
  console.log("notification listeter",data);

  setTimeout(() => {
    createNotification(data);
  }, 1000);
}

export async function savePlant(plant: Plant): Promise<void> {
  
  const notificationId = await createNotification(PlantMapper.toPlantNotification(plant));

  plant.notificationId = notificationId;

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

  console.log("removing plant", plant);

  if (plant.notificationId)
    await Notification.cancelScheduledNotificationAsync(plant.notificationId);

  return await repository.delete(plantId);
}

export async function loadPlants(): Promise<Plant[]> {
  return await repository.listAll();
}