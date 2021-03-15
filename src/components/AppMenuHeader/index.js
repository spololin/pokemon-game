import {useState} from 'react'
import Menu from "../AppMenu";
import Navbar from "../AppNavbar";

const MenuHeader = () => {
    const [isOpenMenu, setOpenMenu] = useState(false);

    const onClickMenuBtn = () => {
        setOpenMenu(prevValue => !prevValue)
    }

    return (
        <>
            <Menu isOpenMenu={isOpenMenu}/>
            <Navbar isOpenMenu={isOpenMenu} onClickMenuBtn={onClickMenuBtn}/>
        </>
    )
}

export default MenuHeader