import { PlantRepositoryImpl} from '../infrastructure/repository/storage/PlantRepositoryImpl';
import { Plant } from '../model/Plant';

const repository = new PlantRepositoryImpl();

export async function savePlant(plant: Plant): Promise<void> {
  return repository.save(plant);
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
  const data = await loadPlants();
  
}

export async function loadPlants(): Promise<Plant[]> {
  return await repository.listAll();
}