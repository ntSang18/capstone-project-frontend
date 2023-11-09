import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, child, get, set } from 'firebase/database';

const apiKey = process.env.VUE_APP_API_KEY;
const authDomain = process.env.VUE_APP_AUTH_DOMAIN;
const databaseURL = process.env.VUE_APP_DATABASE_URL;
const projectId = process.env.VUE_APP_PROJECT_ID;
const storageBucket = process.env.VUE_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.VUE_APP_MESSAGING_SENDER_ID;
const appId = process.env.VUE_APP_APP_ID;
const measurementId = process.env.VUE_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue, child, get, set };
