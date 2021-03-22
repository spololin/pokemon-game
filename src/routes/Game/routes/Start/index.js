import {useState, useEffect, useContext} from 'react';
import styles from "../style.module.css";
import PokemonCard from "../../../../components/AppPokemonCard";
import {FireBaseContext} from "../../../../context/firebaseContext";

const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const [arrPokemon, setArrPokemon] = useState([]);

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setArrPokemon(pokemons)
        })
    }, [])

    const handlerClickCard = (id) => {
        const card = arrPokemon.find(elem => elem.id === id);
        card.active = card.hasOwnProperty("active") ? !card.active : true;
        firebase.postPokemon(id, card).then(() => {
            setArrPokemon(prevValue => prevValue.map(item => item.id === id ? {...card} : item))
        })
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
        firebase.addPokemon(cardNewPokemon)
    }

    return (
        <div>
            <div className={styles.addNew}>
                <button onClick={handlerClickAddPokemon}>Start Game</button>
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

export default StartPage