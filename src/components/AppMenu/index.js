import styles from './style.module.css'
import cn from 'classnames';

const Menu = ({isOpenMenu}) => {
    const arrMenu = [
        {
            id: 'aaa',
            link: '#welcome',
            title: 'HOME'
        },
        {
            id: 'bbb',
            link: '#game',
            title: 'GAME'
        },
        {
            id: 'ccc',
            link: '#about',
            title: 'ABOUT'
        },
        {
            id: 'ddd',
            link: '#contact',
            title: 'CONTACT'
        }
    ];
    return (
        <div className={cn(styles.menuContainer, {[styles.active]: isOpenMenu})}>
            <div className={styles.overlay}/>
            <div className={styles.menuItems}>
                <ul>
                    {
                        arrMenu.map(item => (
                            <li key={item.id}>
                                <a href={item.link}>
                                    {item.title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu