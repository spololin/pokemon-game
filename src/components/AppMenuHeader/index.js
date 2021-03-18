import {useState} from 'react'
import Menu from "../AppMenu";
import Navbar from "../AppNavbar";

const MenuHeader = ({bgActive}) => {
    const [isOpenMenu, setOpenMenu] = useState(false);

    const onClickMenuBtn = () => {
        setOpenMenu(prevValue => !prevValue)
    }

    return (
        <>
            <Menu isOpenMenu={isOpenMenu} onClickMenuBtn={onClickMenuBtn}/>
            <Navbar isOpenMenu={isOpenMenu} bgActive={bgActive} onClickMenuBtn={onClickMenuBtn}/>
        </>
    )
}

export default MenuHeader