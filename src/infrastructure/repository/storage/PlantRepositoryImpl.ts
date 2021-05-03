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

  async listAll(): Promise<Plant[]> {
    const data = await Dao.getItem<StoragePlant>('plants');
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

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  getById(id: number): Promise<Plant | null> {
    throw new Error("Method not implemented.");
  }

}