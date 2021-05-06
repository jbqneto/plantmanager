import { format } from "date-fns";
import { Plant, StoragePlant } from "../../../model/Plant";
import { PlantRepository } from "../PlantRepository";
import Dao from './AsyncStorageRepository'; 

export class PlantRepositoryImpl implements PlantRepository {
  
  async save(plant: Plant): Promise<void> {
    const data = await Dao.getItem<StoragePlant>('plants');
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

    await Dao.setItem('plants', savePlant);
    
  }

  async getStoragePlant():Promise<StoragePlant> {
    const data = await Dao.getItem<StoragePlant>('plants');
    const plants = data ? data : {};
    
    return plants;
  }

  async listAll(): Promise<Plant[]> {
    const plants = await this.getStoragePlant();

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

  async delete(id: number): Promise<void> {
    const plants = await this.getStoragePlant();
    
    if (plants[id])
      delete plants[id];
    else
      throw new Error(`Planta não encontrada ${id}!`);

    await Dao.setItem('plants', plants);
  }
  
  async getById(id: number): Promise<Plant | null> {
    const plants = await this.getStoragePlant();

    if (plants[id]) {
      return plants[id].data;
    } else {
      return null;
    }
  }

}