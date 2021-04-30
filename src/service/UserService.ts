import { StorageRepository } from '../infrastructure/repository/storage';

export async function saveUser(user: string) {
  return await StorageRepository.setItem('username', user);
}

export async function getUser() {
  return StorageRepository.getItem('username');
}