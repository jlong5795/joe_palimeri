import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'fontSize': '40px',
    'color': 'white',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'border': '3px #eee solid',
    'display': 'grid',
    'gridTemplateColumns': 'repeat(3, 1fr)'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState("x");
    const [winner, setWinner] = useState(null);

    const calculateWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const switchPlayer = () => {
        player === "x" ? setPlayer("o") : setPlayer("x");
    };

    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setPlayer("x");
        setWinner(null);
    }

    const handleClick = index => {
        if (squares[index] || winner) {
            return;
        }
        setSquares(prev => {
            let editedSquares = prev;
            editedSquares.splice(index, 1, player);

            if (calculateWinner()) {
                setWinner(player);
            }

            return editedSquares;
        });

        switchPlayer();
    };

    const Square = ({ index }) => {
        return (
            <>
                <div
                    className="square"
                    style={squareStyle}
                    onClick={() => handleClick(index)}
                >
                    {squares[index] ? <div>{squares[index]}</div> : null}
                </div>

            </>
        );
    };

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>
                Next player: <span>{winner ? null : player.toUpperCase()}</span>
            </div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>
                Winner: <span>{winner ? winner.toUpperCase() : "None"}</span>
            </div>
            <button style={buttonStyle} onClick={() => handleReset()}>Reset</button>
            <div style={boardStyle}>
                {squares.map((square, i) => {
                    return (
                        <Square key={i} index={i} />
                    )
                })}
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Board />);
