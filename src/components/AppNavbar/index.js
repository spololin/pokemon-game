import styles from './style.module.css'
import cn from 'classnames'

const Navbar = ({isOpenMenu, onClickMenuBtn, bgActive}) => {
    const toggleActive = isOpenMenu ? styles.active : styles.deactive;

    const handlerClickMenuBtn = () => {
        onClickMenuBtn && onClickMenuBtn()
    }

    return (
        <nav id={styles.navbar} className={cn({[styles.bgActive]: bgActive})}>
            <div className={styles.navWrapper}>
                <p className={styles.brand}>
                    LOGO
                </p>
                <div className={cn(styles.menuButton, toggleActive)} onClick={handlerClickMenuBtn}>
                    <span/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar