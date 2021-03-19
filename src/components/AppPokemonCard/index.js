import styles from './index.module.css'
import cn from 'classnames'
import cardBackgroundImg from '../../assets/card-back-side.jpg'

const PokemonCard = ({values, img, name, type, id, isActive = false, onClickCard}) => {
    console.log(isActive)
    const handlerClickCard = () => {
        onClickCard && onClickCard(id)
    }

    return (
        <div className={styles.root} onClick={handlerClickCard}>
            <div className={cn(styles.pokemonCard, {[styles.active]: isActive})}>
                <div className={styles.cardFront}>
                    <div className={cn(styles.wrap, styles.front)}>
                        <div className={cn(styles.pokemon, styles[type])}>
                            <div className={styles.values}>
                                <div className={cn(styles.count, styles.top)}>{values.top}</div>
                                <div className={cn(styles.count, styles.right)}>{values.right}</div>
                                <div className={cn(styles.count, styles.bottom)}>{values.bottom}</div>
                                <div className={cn(styles.count, styles.left)}>{values.left}</div>
                            </div>
                            <div className={styles.imgContainer}>
                                <img src={img} alt={name}/>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.number}>#{id}</span>
                                <h3 className={styles.name}>{name}</h3>
                                <small className={styles.type}>
                                    Type: <span>{type}</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.cardBack}>
                    <div className={cn(styles.wrap, styles.back)}>
                        <img src={cardBackgroundImg} alt="Card Backed"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard