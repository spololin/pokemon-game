// import {useState} from 'react';
import {Route, Switch, useRouteMatch, Redirect} from 'react-router-dom';
import styles from './styles.module.css'
import cn from 'classnames';
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import MenuHeader from "./components/AppMenuHeader";
import Footer from "./components/AppFooter";
import ContactPage from "./routes/ContactPage";
import AboutPage from "./routes/AboutPage";
import NotFoundPage from "./routes/NotFound";
import {FireBaseContext} from "./context/firebaseContext";
import Firebase from "./service/firebase";

const App = () => {
    const match = useRouteMatch('/')
    return (
        <FireBaseContext.Provider value={new Firebase()}>
            <Switch>
                <Route path='/404' render={() => (
                    <NotFoundPage/>
                )}/>
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