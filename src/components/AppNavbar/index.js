import styles from './style.module.css'
import cn from 'classnames'

const Navbar = ({isOpenMenu, onClickMenuBtn}) => {
    const toggleActive = isOpenMenu ? styles.active : styles.deactive;

    const handlerClickMenuBtn = () => {
        onClickMenuBtn && onClickMenuBtn()
    }

    return (
        <nav id={styles.navbar}>
            <div className={styles.navWrapper}>
                <p className={styles.brand}>
                    LOGO
                </p>
                <a className={cn(styles.menuButton, toggleActive)}>
                    <span onClick={handlerClickMenuBtn}/>
                </a>
            </div>
        </nav>
    )
}

export default Navbar