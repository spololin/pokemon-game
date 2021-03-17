import styles from './index.module.css'

const Header = ({title, descr, onClickButton}) => {
    const handlerClickStartGame = () => {
        onClickButton && onClickButton('game')
    }
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
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