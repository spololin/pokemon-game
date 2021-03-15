import {useState} from 'react'
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";

const App = () => {
    const [page, setPage] = useState('app');

    const handlerChangePage = (page) => {
        setPage(page)
    }

    switch (page) {
        case 'app':
            return <HomePage onChangePage={handlerChangePage}/>
        case 'game':
            return <GamePage onChangePage={handlerChangePage}/>
        default:
            return <HomePage/>
    }
}

export default App