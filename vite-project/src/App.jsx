// import { useState } from 'react';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Button from '@mui/material/Button';


// function Square({ value, onSquareClick }) {
//   return (
//     <Button className="square" onClick={onSquareClick}>
//       {value}
//     </Button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Победитель: ' + winner;
//   } else {
//     status = 'Следующий игрок: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Вернуться к шагу #' + move;
//     } else {
//       description = ' Начать с начала';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay'; 

function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outlined"
      style={{ width: '80px', height: '80px', margin: '5px' }} 
      onClick={onSquareClick}
    >
      <Typography variant="h4">{value}</Typography>
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Победитель: ' + winner;
  } else {
    status = 'Следующий игрок: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Paper style={{ padding: '20px', margin: '20px', width: '320px' }}> 
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        {status}
      </Typography>
      <Grid container spacing={2}>
        {[0, 1, 2].map((row) => (
          <Grid container item spacing={2} key={row}>
            {[0, 1, 2].map((col) => (
              <Grid item key={col}>
                <Square value={squares[row * 3 + col]} onSquareClick={() => handleClick(row * 3 + col)} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Вернуться к шагу №' + move;
    } 
    return (
      <ListItem button key={move} onClick={() => jumpTo(move)}>
        <ListItemText primary={description} />
      </ListItem>
    );
  });

  return (
    <Grid container spacing={3} style={{ padding: '20px', justifyContent: 'center' }}>
      <Grid item>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </Grid>
      <Grid item>
        <Paper style={{ padding: '20px', width: '250px' }}> 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">История ходов</Typography>
            <IconButton onClick={() => jumpTo(0)} color="primary">
              <ReplayIcon />
            </IconButton>
          </div>
          <List style={{ maxHeight: '400px', overflowY: 'auto' }}>{moves}</List> 
        </Paper>
      </Grid>
    </Grid>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}