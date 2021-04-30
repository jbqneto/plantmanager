import AsyncStorage from '@react-native-async-storage/async-storage'

const prefix = "@plantmanager";

async function setItem(key: string, value: string) {
  return AsyncStorage.setItem(`${prefix}:${key}`, value);
}

async function getItem(key: string) {
  return AsyncStorage.getItem(`${prefix}:${key}`);
}

const StorageRepository = {
  setItem,
  getItem
};

export default StorageRepository;