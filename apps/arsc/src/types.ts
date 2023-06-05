import { Record } from 'pocketbase';
export * from '@indecisive/types';

// Csrf
export interface Csrf extends Record {
  token: string;
}
