import api from './axios';
import type { Sweet } from '../types';

export const getSweets = () => {
  return api.get<Sweet[]>('/sweets');
};