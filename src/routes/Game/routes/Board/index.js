import styles from './style.module.css';
import {PokemonContext} from "../../../../context/pokemonContext";
import {useContext} from "react";
import PokemonCard from "../../../../components/AppPokemonCard";

const BoardPage = () => {
    const pokemon = useContext(PokemonContext);

    return (
        <div className={styles.root}>
            <div className={styles.playerOne}>
                {
                    pokemon.selectedArrPokemon.map(item => (
                        <div className={styles.card}>
                            <PokemonCard
                                key={item.id}
                                values={item.values}
                                name={item.name}
                                type={item.type}
                                img={item.img}
                                id={item.id}
                                isActive
                                minimize
                                className={styles.card}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={styles.board}>
                <div className={styles.boardPlate}>1</div>
                <div className={styles.boardPlate}>2</div>
                <div className={styles.boardPlate}>3</div>
                <div className={styles.boardPlate}>4</div>
                <div className={styles.boardPlate}>5</div>
                <div className={styles.boardPlate}>6</div>
                <div className={styles.boardPlate}>7</div>
                <div className={styles.boardPlate}>8</div>
                <div className={styles.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;