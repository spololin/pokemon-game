// import {useState} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import styles from './styles.module.css'
import cn from 'classnames';
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import MenuHeader from "./components/AppMenuHeader";
import Footer from "./components/AppFooter";
import ContactPage from "./routes/ContactPage";
import AboutPage from "./routes/AboutPage";
import NotFoundPage from "./routes/NotFound";


const App = () => {
    const match = useRouteMatch('/')
    return (
        <Switch>
            <Route>
                <>
                    <MenuHeader bgActive={!match.isExact}/>
                    <div className={cn(styles.wrap, {[styles.isHomePage]: match.isExact})}>
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/home" component={HomePage}/>
                            <Route path="/game" component={GamePage}/>
                            <Route path="/contact" component={ContactPage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </div>
                    <Footer/>
                </>
            </Route>
        </Switch>
    )
    // const [page, setPage] = useState('app');
    //
    // const handlerChangePage = (page) => {
    //     setPage(page)
    // }
    //
    // switch (page) {
    //     case 'app':
    //         return <HomePage onChangePage={handlerChangePage}/>
    //     case 'game':
    //         return <GamePage onChangePage={handlerChangePage}/>
    //     default:
    //         return <HomePage onChangePage={handlerChangePage}/>
    // }
}

export default App