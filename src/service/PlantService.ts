import { format } from 'date-fns';
import { StorageRepository as repository} from '../infrastructure/repository/storage';
import { Plant, StoragePlant } from '../model/Plant';

export async function savePlant(plant: Plant): Promise<void> {
  const data = await repository.getItem('plants');
  const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {};

  const newPlant = {
    [plant.id]: {
      data: plant
    }
  };

  await repository.setItem('plants', JSON.stringify({
    ...newPlant,
    ...oldPlants
  }));

}

export async function loadPlants(): Promise<Plant[]> {
  const data = await repository.getItem('plants');
  const plants = data ? (JSON.parse(data) as StoragePlant) : {};

  return Object.keys(plants)
    .map((key) => {
      const plant = plants[key].data;
      return {
        ...plant,
        hour: format(new Date(plant.dateTimeNotification), 'HH::mm')
      }
  });

}