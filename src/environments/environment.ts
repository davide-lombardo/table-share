import { environment as dotenv } from './dotenv';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  ...dotenv,
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAnTp3e1aMK7g569bVGPrpUemsgnwtsRKU',
    authDomain: 'social-tables-f4dd1.firebaseapp.com',
    projectId: 'social-tables-f4dd1',
    storageBucket: 'social-tables-f4dd1.appspot.com',
    messagingSenderId: '275612678312',
    appId: '1:275612678312:web:99b3fdc0a97afcdc756a9d',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
