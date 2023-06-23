import './styles/App.css';
import Square from './components/Square';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import LeaderLine from 'leader-line-new';

export default function App() {
  const [board, setBoard] = useState([]);
  const [startNode, setStartNode] = useState([1, 0]);
  const [endNode, setEndNode] = useState([]);

  useEffect(() => {
    const duplicate = [];
    for (let i = 7; i >= 0; i--) {
      const row = [];
      for (let j = 0; j <= 7; j++) {
        row.push([j, i]);
      }
      duplicate.push(row);
    }
    setBoard(duplicate);
  }, [])

  const clearPaths = () => {
    const paths = document.getElementsByClassName('leader-line');
    while (paths[0]) {
      paths[0].parentNode.removeChild(paths[0]);
    }
  }

  const setArrow = ([x, y]) => {
    const start = document.getElementById(`${startNode[0]}${startNode[1]}`);
    const end = document.getElementById(`${x}${y}`);
    new LeaderLine(
      LeaderLine.pointAnchor(start, { x: '50%', y: '50%', width: 0, height: 0 }),
      LeaderLine.pointAnchor(end, { x: '50%', y: '50%', width: 0, height: 0 }),
      { path: 'straight', color: '#0ea5e9' },
    );
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex gap-10'>
        <div className='grid grid-rows-8 w-fit'>
          {board.length > 0 &&
            board.map(row =>
              <div className='grid grid-cols-8 w-fit' key={uuidv4()}>
                {row.map(coordinate => {
                  if (coordinate[0] === startNode[0] && coordinate[1] === startNode[1])
                    return <Square key={uuidv4()} coordinate={coordinate} horsey={true} />
                  return <Square key={uuidv4()} coordinate={coordinate} setArrow={setArrow} />
                }
                )}
              </div>
            )}
        </div>
        <button className='btn self-start' onClick={clearPaths}>Clear pathways</button>
      </div>
    </div>
  );
}
