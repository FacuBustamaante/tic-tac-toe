import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { checkWinner } from './logic/board'
import { TURNS, WINNER_COMBOS} from './constants'
 

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))

    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square != null)
    }

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    const updateBoard = (index) => {
        if (board[index] || winner) return
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        const newWinner = checkWinner(newBoard)

        if(newWinner){
            confetti()
            setWinner(newWinner)
        }else if(checkEndGame(newBoard)){
            setWinner(false)
        }
    }

    return (
        <main className='board'>
            <button onClick={resetBoard}>Comenzar de nuevo</button>
            <h1>TaTeTi Game</h1>
            <section className='game'>
                {
                    board.map((item, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}>
                                {item}
                            </Square>
                        )
                    })
                }
            </section>
            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
            <section>
                {winner != null && (
                    <section className='winner'>
                        <div className='text'>
                            <h2>{winner === false ? 'Empate' : 'Ganó: '}</h2>
                            <header className="win">
                                {
                                    winner && <Square>{winner}</Square>
                                }
                            </header>
                            <footer>
                                <button onClick={resetBoard}>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )}
            </section>
        </main>
    )
}

export default App
