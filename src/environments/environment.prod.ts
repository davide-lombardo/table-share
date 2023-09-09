import { environment as dotenv } from './dotenv';

export const environment = {
  ...dotenv,
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyAnTp3e1aMK7g569bVGPrpUemsgnwtsRKU',
    authDomain: 'social-tables-f4dd1.firebaseapp.com',
    projectId: 'social-tables-f4dd1',
    storageBucket: 'social-tables-f4dd1.appspot.com',
    messagingSenderId: '275612678312',
    appId: '1:275612678312:web:99b3fdc0a97afcdc756a9d',
  },
};
