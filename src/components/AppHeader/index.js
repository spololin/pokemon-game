import styles from './index.module.css'
import {useHistory} from 'react-router-dom';

const Header = ({title, descr}) => {
    const history = useHistory();
    const handlerClickStartGame = () => {
        history.push('/game')
    }
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.silhouette}></div>
            <div className={styles.moon}></div>
            <div className={styles.container}>
                {
                    title && <h1>{title}</h1>
                }
                {
                    descr && <p>{descr}</p>
                }
                <button onClick={handlerClickStartGame}>Start Game</button>
            </div>
        </header>
    )
}

export default Header