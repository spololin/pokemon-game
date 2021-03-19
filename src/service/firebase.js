import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqhnmPia83xNMFjiLkjK1PONikSKCdQmo",
    authDomain: "pokemon-game-986c8.firebaseapp.com",
    databaseURL: "https://pokemon-game-986c8-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-986c8",
    storageBucket: "pokemon-game-986c8.appspot.com",
    messagingSenderId: "101111011159",
    appId: "1:101111011159:web:e4b3022aae46fa31a61012"
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = fire.database();

export default database;
