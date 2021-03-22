import styles from './style.module.css';

const BoardPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.playerOne}>

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