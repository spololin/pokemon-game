const GamePage = ({onChangePage}) => {
    const handlerClickButton = () => {
        onChangePage && onChangePage('app')
    }

    return (
        <div>
            <p>This is Game Page</p>
            <button onClick={handlerClickButton}>Back to App</button>
        </div>
    )
}

export default GamePage