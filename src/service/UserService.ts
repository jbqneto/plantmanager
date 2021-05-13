import { StorageRepository } from '../infrastructure/repository/storage';
import { User } from '../model/User';

export async function saveUser(user: User) {
  return await StorageRepository.setItem('user', user);
}

export async function getUser() {
  const user = await StorageRepository.getItem<User>('user');
  return user;
}

export async function clearUser() {
  return await StorageRepository.deleteItem('user');
}