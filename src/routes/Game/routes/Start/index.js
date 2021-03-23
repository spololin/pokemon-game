import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./style.module.css";
import PokemonCard from "../../../../components/AppPokemonCard";
import {FireBaseContext} from "../../../../context/firebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";

const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const selectedPokemon = useContext(PokemonContext);
    const history = useHistory();
    const [arrPokemon, setArrPokemon] = useState([]);

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setArrPokemon(pokemons)
        })
    }, [])

    const handlerClickCard = (id) => {
        let arrSelectedPokemon = selectedPokemon.selectedArrPokemon;
        if (arrSelectedPokemon.length > 5) {
            return
        }

        const card = arrPokemon.find(elem => elem.id === id);
        card.selected = !card.hasOwnProperty("selected") ? true : !card.selected;
        setArrPokemon(prevValue => prevValue.map(item => item.id === id ? {...card} : item));

        let arr = [...selectedPokemon.selectedArrPokemon];
        const idx = arrSelectedPokemon.findIndex(elem => elem.id === id);
        if (idx === -1) {
            arr.push(card);
        } else {
            arr = arr.filter(item => item.id !== id);
        }
        selectedPokemon.setSelectedArrPokemon(arr);
    }

    const handlerClickAddPokemon = () => {
        if (selectedPokemon.selectedArrPokemon.length) {
            history.push('/game/board')
        }
    }

    return (
        <div>
            <div className={styles.addNew}>
                <button onClick={handlerClickAddPokemon}>Start Game</button>
            </div>

            <div className={styles.flex}>
                {
                    arrPokemon.map(({id, values, name, type, img, selected = false}) => {
                        return (
                            <div className={styles.root}>
                                <PokemonCard
                                    key={id}
                                    values={values}
                                    name={name}
                                    type={type}
                                    img={img}
                                    id={id}
                                    isActive
                                    isSelected={selected}
                                    onClickCard={handlerClickCard}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StartPage