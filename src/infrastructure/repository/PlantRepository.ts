import { Plant } from "../../model/Plant";

export interface PlantRepository {
  listAll(): Promise<Plant[]>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Plant|null>;
  save(plant: Plant): Promise<void>;
}