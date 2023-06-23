import './styles/App.css';
import Square from './components/Square';
import { useEffect, useState } from 'react';
import LeaderLine from 'leader-line-new';
import Queue from './scripts/Queue';
import { Node, stringifyCoord, getAllMovesFrom } from './scripts/script';

export default function App() {
  const [board, setBoard] = useState([]);
  const [startNode, setStartNode] = useState([1, 0]);

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

  const setArrow = ([x1, y1], [x2, y2], color = '#7dd3fc', startPlug = 'disc', endPlug = 'disc', size = 3) => {
    const start = document.getElementById(`${x1}${y1}`);
    const end = document.getElementById(`${x2}${y2}`);
    const line = new LeaderLine(
      LeaderLine.pointAnchor(start, { x: '50%', y: '50%', width: 0, height: 0 }),
      LeaderLine.pointAnchor(end, { x: '50%', y: '50%', width: 0, height: 0 }),
      { path: 'straight', color: color, startPlug: startPlug, endPlug: endPlug, size: size, hide: true },
    );
    setTimeout(() => {
      line.show('draw');
    }, 0);
  }

  const getPathsFrom = (end) => {
    clearPaths();
    const { path, moves } = getShortestPath(Node(startNode), end);
    path.forEach((coordinate, index) => {
      if (index === path.length - 2) {
        setArrow(coordinate, path[index + 1], '#0ea5e9', 'disc', 'arrow1', 5);
        return;
      }
      if (index < path.length - 1) setArrow(coordinate, path[index + 1], '#0ea5e9', 'disc', 'disc', 5);
    });
    setTimeout(() => {
      setStartNode(end);
    }, 500);
  }

  const getShortestPath = (root, end, queue = Queue(), visitedSquares = []) => {
    if (root.source) {
      setArrow(root.source.data, root.data);
    }
    if (stringifyCoord(root.data) === stringifyCoord(end)) {
      let curr = root;
      let path = [curr.data];
      while (curr.source) {
        path.push(curr.source.data);
        curr = curr.source;
      }
      return { path: path.reverse(), moves: root.level };
    };
    // Push current coord into visited list
    visitedSquares.push(stringifyCoord(root.data));
    // get all possible moves(excluding ones already visited) from currrent square/positon
    const legalMoves = getAllMovesFrom(root.data).filter(coord => !visitedSquares.includes(stringifyCoord(coord)));
    // If any legal moves exist, enqueue them into queue to check for later
    if (legalMoves !== []) legalMoves.forEach(coord => queue.enqueue(Node(coord, root, root.level + 1)));
    // queue.print(); // debug code
    return getShortestPath(queue.dequeue(), end, queue, visitedSquares);
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex gap-10'>
        <div className='grid grid-rows-8 w-fit'>
          {board.length > 0 &&
            board.map((row, index) =>
              <div key={`row${index}`} className='grid grid-cols-8 w-fit'>
                {row.map(coordinate => {
                  if (coordinate[0] === startNode[0] && coordinate[1] === startNode[1])
                    return <Square key={`${coordinate}`} coordinate={coordinate} horsey={true} />
                  return <Square key={`${coordinate}`} coordinate={coordinate} getPathsFrom={getPathsFrom} />
                }
                )}
              </div>
            )}
        </div>
        <button className='btn self-start normal-case' onClick={clearPaths}>Clear pathways</button>
      </div>
    </div>
  );
}

const clearPaths = () => {
  const paths = document.getElementsByClassName('leader-line');
  while (paths[0]) {
    paths[0].parentNode.removeChild(paths[0]);
  }
}
