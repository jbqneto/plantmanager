import AsyncStorage from '@react-native-async-storage/async-storage'

const prefix = "@plantmanager";

async function setItem(key: string, value: string) {
  return AsyncStorage.setItem(`${prefix}:${key}`, value);
}

async function getItem(key: string) {
  return AsyncStorage.getItem(`${prefix}:${key}`);
}

export async function saveUser(user: string) {
  return await setItem('user', user);
}

export async function getUser() {
  return getItem('user');
}