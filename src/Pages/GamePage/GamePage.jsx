import React, { useState } from 'react';
import axios from 'axios';
import EntryForm from './EntryForm';

const choices = [
    { name: 'Stone', color: 'btn-info' },
    { name: 'Paper', color: 'btn-dark' },
    { name: 'Scissors', color: 'btn-danger' }
];

const GamePage = ({ BASE_URL }) => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [choiceOfPlayer1, setChoiceOfPlayer1] = useState(null);
    const [choiceOfPlayer2, setChoiceOfPlayer2] = useState(null);
    const [round, setRound] = useState(1);
    const [scores, setScores] = useState({ player1: 0, player2: 0, tie: false });
    const [winner, setWinner] = useState('');

    const handleGameStart = (e) => {
        e.preventDefault()
        setIsGameStarted(true);
    };

    const determineWinner = () => {
        if (round > 6) return;

        let roundWinner;
        const tie = choiceOfPlayer1 === choiceOfPlayer2;

        if (tie) {
            roundWinner = `It's a tie...!`;
            setScores((prev) => ({ ...prev, tie: true }));
        } else if (
            (choiceOfPlayer1 === 'Stone' && choiceOfPlayer2 === 'Scissors') ||
            (choiceOfPlayer1 === 'Scissors' && choiceOfPlayer2 === 'Paper') ||
            (choiceOfPlayer1 === 'Paper' && choiceOfPlayer2 === 'Stone')
        ) {
            roundWinner = `${player1Name} wins this round!`;
            setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
        } else {
            roundWinner = `${player2Name} wins this round!`;
            setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
        }

        setWinner(roundWinner);

        if (round === 6) {

            const finalScores = {
                player1: scores.player1 + (choiceOfPlayer1 === 'Stone' && choiceOfPlayer2 === 'Scissors' ? 1 : 0) +
                    (choiceOfPlayer1 === 'Scissors' && choiceOfPlayer2 === 'Paper' ? 1 : 0) +
                    (choiceOfPlayer1 === 'Paper' && choiceOfPlayer2 === 'Stone' ? 1 : 0),
                player2: scores.player2 + (choiceOfPlayer2 === 'Stone' && choiceOfPlayer1 === 'Scissors' ? 1 : 0) +
                    (choiceOfPlayer2 === 'Scissors' && choiceOfPlayer1 === 'Paper' ? 1 : 0) +
                    (choiceOfPlayer2 === 'Paper' && choiceOfPlayer1 === 'Stone' ? 1 : 0),
                tie: scores.tie
            };

            const finalWinner = finalScores.player1 > finalScores.player2 ? player1Name : player2Name;
            saveGameData(finalWinner, finalScores);
        }

        setRound((prev) => prev + 1);
        setChoiceOfPlayer1(null);
        setChoiceOfPlayer2(null);
    };

    const saveGameData = async (finalWinner, finalScore) => {
        const gameData = {
            player1Name: player1Name,
            player2Name: player2Name,
            winner: finalWinner,
            scores: finalScore
        };
        try {
            await axios.post(`${BASE_URL}/games`, gameData);
        } catch (error) {
            console.log("Failed to add game data in database", error);
        }
    };

    const restartGame = () => {
        setChoiceOfPlayer1(null);
        setChoiceOfPlayer2(null);
        setRound(1);
        setScores({ player1: 0, player2: 0, tie: false });
        setWinner('');
    };

    return (
        <div className='container h-100' style={{ minHeight: '70dvh' }}>
            <h2 className='text-center mb-2 border-top border-bottom py-3'>Stone Paper Scissors</h2>
            {!isGameStarted ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60dvh' }}>
                    <EntryForm
                        player1Name={player1Name}
                        player2Name={player2Name}
                        setPlayer1Name={setPlayer1Name}
                        setPlayer2Name={setPlayer2Name}
                        handleGameStart={handleGameStart}
                    />
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-6">
                            <h4 className="text-center">{player1Name || 'Player 1'}</h4>
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {choices.map(choice => (
                                    <button
                                        className={`btn ${choice.color} m-2 w-50`}
                                        key={choice.name}
                                        onClick={() => setChoiceOfPlayer1(choice.name)}
                                    >
                                        {choice.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="col-6">
                            <h4 className="text-center">{player2Name || 'Player 2'}</h4>
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {choices.map(choice => (
                                    <button
                                        className={`btn ${choice.color} m-2 w-50`}
                                        key={choice.name}
                                        onClick={() => setChoiceOfPlayer2(choice.name)}
                                    >
                                        {choice.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 text-center">
                        <div className="border-top border-bottom">
                            <button className='btn btn-warning my-2' onClick={determineWinner} disabled={!choiceOfPlayer1 || !choiceOfPlayer2 || round > 6}>
                                Determine Winner
                            </button>
                        </div>

                        {round > 1 && <h2 className='my-3'>{winner}</h2>}
                        {round === 1 && <div style={{ minHeight: '4.5rem' }}></div>}

                        <h3>Scores</h3>
                        <p>{player1Name || 'Player 1'}: {scores.player1}</p>
                        <p>{player2Name || 'Player 2'}: {scores.player2}</p>
                        <p>Tie: {scores.tie ? 'Yes' : 'No'}</p>
                        {round > 6 && <h2>Game Over!</h2>}

                        {round > 6 && <button className='btn btn-danger my-3' onClick={restartGame}>
                            Restart Game
                        </button>}
                    </div>
                </>
            )}
        </div>
    );
};

export default GamePage;
