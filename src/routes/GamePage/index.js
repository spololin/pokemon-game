import {useState, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
import styles from "../HomePage/style.module.css";
import PokemonCard from "../../components/AppPokemonCard";
import database from "../../service/firebase";

const GamePage = () => {
    const [arrPokemon, setArrPokemon] = useState({})

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setArrPokemon(snapshot.val())
        })
    }, [])

    // const history = useHistory();
    // const handlerClickButton = () => {
    //     history.push('/')
    // }

    const handlerClickCard = (id) => {
        setArrPokemon(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = true;
                }
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
        // const idx = arrPokemon.findIndex(card => card.id === id);
        // const card = arrPokemon[idx];
        // setArrPokemon([...arrPokemon.slice(0, idx), {...card, active: !card.active}, ...arrPokemon.slice(idx + 1)])

    }

    return (
        <div>
            {/*<p>This is Game Page</p>*/}
            {/*<button onClick={handlerClickButton}>Back to App</button>*/}
            <div className={styles.flex}>
                {
                    Object.entries(arrPokemon).map(([key, {id, values, name, type, img, active}]) => <PokemonCard
                        key={key}
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