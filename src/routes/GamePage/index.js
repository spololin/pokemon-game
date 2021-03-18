import {useHistory} from 'react-router-dom';

const GamePage = () => {
    const history = useHistory();
    const handlerClickButton = () => {
        history.push('/')
    }

    return (
        <div>
            <p>This is Game Page</p>
            <button onClick={handlerClickButton}>Back to App</button>
        </div>
    )
}

export default GamePage