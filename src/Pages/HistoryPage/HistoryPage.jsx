import axios from 'axios'
import React, { useEffect, useState } from 'react'

const HistoryPage = ({ BASE_URL }) => {
    const [gamesHistory, setGamesHistory] = useState([])
    console.log(gamesHistory);
    useEffect(() => {
        fetchGamesHistory()
    }, [])

    const fetchGamesHistory = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-games`)
            setGamesHistory(response.data.games)
        } catch (error) {
            console.log('Failed to fetch games history', error);
        }
    }

    return (
        <div className='container' style={{ minHeight: '70vh' }}>
            <h3 className="text-center">Game History</h3>
            {gamesHistory.length === 0 ? (
                <p className='text-center'>No games data available</p>
            ) : (
                <table className="table table-success table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">Match</th>
                            <th scope="col">Player 1 Score</th>
                            <th scope="col">Player 2 Score</th>
                            <th scope="col">Winner</th>
                            <th scope="col">Tie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamesHistory.map((game, index) => (
                            <tr key={index}>
                                <td>{game.match}</td>
                                <td>{game.scores.player1}</td>
                                <td>{game.scores.player2}</td>
                                <td>{game.winner}</td>
                                <td>{game.tie ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default HistoryPage