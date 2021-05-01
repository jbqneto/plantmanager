import AsyncStorage from '@react-native-async-storage/async-storage'

const prefix = "@plantmanager";

async function setItem(key: string, value: any): Promise<void> {
  const strValue = (typeof value === 'string') ? value : JSON.stringify(value);
  return await AsyncStorage.setItem(`${prefix}:${key}`, strValue);
}

async function deleteItem(key: string) {
  return await AsyncStorage.removeItem(`${prefix}:${key}`);
}

async function getItem<T>(key: string) : Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(`${prefix}:${key}`);
    let val;

    if (value === null || undefined) {
      return null;
    } else {
      val = JSON.parse(value);
    }

    return val as T;
  } catch(e) {
    console.log(e);
    throw e;
  }
}

const StorageRepository = {
  setItem,
  getItem,
  deleteItem
};

export default StorageRepository;