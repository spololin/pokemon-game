import {Route, Switch, useLocation, Redirect} from 'react-router-dom';
import styles from './styles.module.css'
import cn from 'classnames';
import HomePage from "./routes/HomePage";
import MenuHeader from "./components/AppMenuHeader";
import Footer from "./components/AppFooter";
import ContactPage from "./routes/ContactPage";
import AboutPage from "./routes/AboutPage";
import NotFoundPage from "./routes/NotFound";
import {FireBaseContext} from "./context/firebaseContext";
import Firebase from "./service/firebase";
import GamePage from './routes/Game/routes'

const App = () => {
    const location = useLocation();
    const isPadding = location.pathname === '/' || location.pathname === '/game/board';

    return (
        <FireBaseContext.Provider value={new Firebase()}>
            <Switch>
                <Route path='/404' render={() => (
                    <NotFoundPage/>
                )}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>
                        <div className={cn(styles.wrap, {[styles.isHomePage]: isPadding})}>
                            <Switch>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/home" component={HomePage}/>
                                <Route path="/game" component={GamePage}/>
                                {/*<Route path="/game/board" exact component={BoardPage}/>*/}
                                <Route path="/contact" component={ContactPage}/>
                                <Route path="/about" component={AboutPage}/>
                                <Route component={NotFoundPage}/>
                                <Redirect to='/404'/>
                            </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
        </FireBaseContext.Provider>
    )
}

export default App