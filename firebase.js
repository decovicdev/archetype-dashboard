import config from './config';

import firebase from 'firebase/app';
import 'firebase/auth';

// if (!firebase.apps.length) {
//   firebase.initializeApp(config.firebase);
// }

export default firebase;

// export const AuthPersistance = firebase.auth.Auth.Persistence;
