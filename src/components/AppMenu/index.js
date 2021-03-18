import styles from './style.module.css'
import {Link} from "react-router-dom";
import cn from 'classnames';

const Menu = ({isOpenMenu, onClickMenuBtn}) => {
    const arrMenu = [
        {
            id: 'aaa',
            link: '/',
            title: 'HOME'
        },
        {
            id: 'bbb',
            link: '/game',
            title: 'GAME'
        },
        {
            id: 'ccc',
            link: '/about',
            title: 'ABOUT'
        },
        {
            id: 'ddd',
            link: '/contact',
            title: 'CONTACT'
        }
    ];
    return (
        <div className={cn(styles.menuContainer, {[styles.active]: isOpenMenu, [styles.deactive]: !isOpenMenu})}>
            <div className={styles.overlay}/>
            <div className={styles.menuItems}>
                <ul>
                    {
                        arrMenu.map(item => (
                            <li key={item.id} onClick={onClickMenuBtn}>
                                <Link to={item.link}>
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu