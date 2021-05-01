import { format } from 'date-fns';
import { StorageRepository as repository} from '../infrastructure/repository/storage';
import { Plant, StoragePlant } from '../model/Plant';

export async function savePlant(plant: Plant): Promise<void> {
  const data = await repository.getItem<StoragePlant>('plants');
  const oldPlants = data ? data : {};

  const newPlant = {
    [plant.id]: {
      data: plant
    }
  };

  let savePlant;

  if (oldPlants[plant.id]) {
    savePlant = {...oldPlants};
    savePlant[plant.id].data = plant;
  } else {
    savePlant = {...oldPlants,...newPlant};
  }

  await repository.setItem('plants', savePlant);

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

export async function loadPlants(): Promise<Plant[]> {
  const data = await repository.getItem<StoragePlant>('plants');
  const plants = data ? data : {};
  const date = new Date();
  const offset = (date.getTimezoneOffset() / 60);

  return Object.keys(plants)
    .map((key) => {
      const plant = plants[key].data;
      const dtNotification = plant.dateTimeNotification;
      const realDate = new Date(dtNotification);
      const hour = format(realDate, 'HH:mm');
      return {
        ...plant,
        hour: hour
      }
  });

}