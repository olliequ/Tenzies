import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Footer from "./components/Footer"
import Stopwatch from "./components/Stopwatch";

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [running, setRunning] = React.useState(false)
    const [highScore, setHighScore] = React.useState(1000)
    const [bestTime, setBestTime] = React.useState(100000)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            rolls < highScore ? setHighScore(rolls) : setHighScore(highScore)
            time < bestTime ? setBestTime(time) : setBestTime(bestTime)
            console.log(bestTime)
            console.log(time)
            setRunning(false)
            setTime(0)
        }
    }, [dice]);

    React.useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if (!tenzies) {
            setRunning(true)
            console.log("Rolling dice...")
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevState => prevState + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setRunning(false)
        }
    }
    
    function holdDice(id) {
        setRunning(true);
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div>
            <main className={tenzies ? "border_ " : "border_"}> {/* vertical-shake */}
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "🎲 Roll 🎲"}
                </button>
                <br></br>
                <div className="stats">
                    <div className="scores">
                        <h1 className="score">Rolls: {rolls}</h1>
                        <h1 className="high-score">High-score: {highScore === 1000 ? '---' : highScore}</h1>
                    </div>
                    <div className="times">
                        <div className="hmm">
                            <h1 className="time">Current time: <Stopwatch time={time}/></h1>
                        </div>
                            <h1 className="time">Best time: {bestTime === 100000 ? '---' : <Stopwatch time={bestTime}/>}</h1>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}