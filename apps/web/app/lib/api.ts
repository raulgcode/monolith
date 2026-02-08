import axios from 'axios';

const BASE_URL = typeof window !== 'undefined'
  ? (window as any).ENV?.VITE_API_URL || 'http://localhost:3000'
  : process.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function createAuthenticatedApi(token: string) {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
