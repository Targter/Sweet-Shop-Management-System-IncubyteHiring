import api from './axios';
import type { Sweet } from '../types';

export const getSweets = () => {
  return api.get<Sweet[]>('/sweets');
};
export const purchaseSweet = (id: string, quantity: number) => {
  return api.post(`/sweets/${id}/purchase`, { quantity });
};