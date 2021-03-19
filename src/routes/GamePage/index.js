import {useState, useEffect} from 'react';
import styles from "../GamePage/style.module.css";
import PokemonCard from "../../components/AppPokemonCard";
import database from "../../service/firebase";

const GamePage = () => {
    const [arrPokemon, setArrPokemon] = useState([]);

    const getArrPokemon = () => {
        database.ref('pokemons').once('value', (snapshot) => {
            setArrPokemon(Object.entries(snapshot.val()).map(item => ({...item[1], id: item[0]})))
        })
    }

    useEffect(() => {
        getArrPokemon()
    }, [])

    const handlerClickCard = (id) => {
        const card = arrPokemon.find(elem => elem.id === id);
        console.log(card)
        card.active = card.hasOwnProperty("active") ? !card.active : true;
        database.ref('pokemons/' + id).set({...card});
        getArrPokemon();
    }

    const handlerClickAddPokemon = () => {
        const cardNewPokemon = {
            "abilities": [
                "static",
                "lightning-rod"
            ],
            "active": false,
            "base_experience": 112,
            "height": 4,
            "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            "name": "pikachu",
            "stats": {
                "attack": 55,
                "defense": 40,
                "hp": 35,
                "special-attack": 50,
                "special-defense": 50,
                "speed": 90
            },
            "type": "electric",
            "values": {
                "bottom": 1,
                "left": 5,
                "right": 5,
                "top": 6
            },
            "weight": 60
        }
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set({...cardNewPokemon, id: newKey});
        getArrPokemon()
    }

    return (
        <div>
            <div className={styles.addNew}>
                <button onClick={handlerClickAddPokemon}>Add new pokemon</button>
            </div>

            <div className={styles.flex}>
                {
                    arrPokemon.map(({id, values, name, type, img, active}) => <PokemonCard
                        key={id}
                        values={values}
                        name={name}
                        type={type}
                        img={img}
                        id={id}
                        isActive={active}
                        onClickCard={handlerClickCard}
                    />)
                }
            </div>
        </div>
    )
}

export default GamePage