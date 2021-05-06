export interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string
  },
  dateTimeNotification: Date;
  hour?: string;
  notificationId?: string;
}

export interface StoragePlant {
  [id: string]: {
    data: Plant
  }
}

export interface PlantNotification {
  times: number;
  repeat_every: string;
  name: string;
  id: number;
  dateTimeNotification: Date
}