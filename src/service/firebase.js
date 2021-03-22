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

export default class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = this.fire.database();
    }

    getPokemonSocket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(Object.entries(snapshot.val()).map(item => ({
                ...item[1],
                id: item[0]
            })))
        })
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => Object.entries(snapshot.val()).map(item => ({
            ...item[1],
            id: item[0]
        })))
    }

    postPokemon = async (key, pokemon) => {
        return await this.database.ref('pokemons/' + key).set(pokemon)
    }

    addPokemon = (data) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(data);
    }
}
