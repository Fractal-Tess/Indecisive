import Pocketbase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
