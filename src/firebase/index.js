import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC3EmKSxND-dN5Pma1IqWidx8gB-UDUiZ4',
  authDomain: 'buyasia-f0b31.firebaseapp.com',
  projectId: 'buyasia-f0b31',
  storageBucket: 'buyasia-f0b31.appspot.com',
  messagingSenderId: '792572887662',
  appId: '1:792572887662:web:429a6cdb724df7e7f0dc7f'
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
