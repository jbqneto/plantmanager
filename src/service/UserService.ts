import { StorageRepository } from '../infrastructure/repository/storage';

interface User {
  username: string;
}

export async function saveUser(user: string) {
  return await StorageRepository.setItem('user', {username: user});
}

export async function getUser() {
  const user = await StorageRepository.getItem<User>('user');
  return user?.username;
}

export async function clearUser() {
  return await StorageRepository.deleteItem('user');
}