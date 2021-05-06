import { Plant } from "../model/Plant";

function toPlantNotification(plant: Plant) {
  return {
    dateTimeNotification: plant.dateTimeNotification,
    id: plant.id,
    name: plant.name,
    repeat_every: plant.frequency.repeat_every,
    times: plant.frequency.times
  }
}

export const PlantMapper = {
  toPlantNotification
};