import React from 'react'

const EntryForm = ({handleGameStart,setPlayer1Name,setPlayer2Name,player1Name,player2Name}) => {

    return (
        <form className='w-50' onSubmit={handleGameStart}>
            <div className="mb-3">
                <label htmlFor="player1Input" className="form-label">Player 1</label>
                <input
                    type="text"
                    className="form-control"
                    value={player1Name}
                    placeholder='Please enter your name'
                    id="player1Input"
                    required
                    onChange={e => setPlayer1Name(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="player2Input" className="form-label">Player 2</label>
                <input
                    type="text"
                    value={player2Name}
                    placeholder='Please enter your name'
                    className="form-control"
                    id="player2Input"
                    required
                    onChange={e => setPlayer2Name(e.target.value)}
                />
            </div>
            <div className="text-center my-4">
                <button type="submit" className="btn btn-warning w-50">Start the Game</button>
            </div>
        </form>
    )
}

export default EntryForm
