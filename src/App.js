import Square from './components/Square';
import { useEffect, useState } from 'react';
import LeaderLine from 'leader-line-new';
import Queue from './scripts/Queue';
import { Node, stringifyCoord, getAllMovesFrom } from './scripts/script';
import Info from '@phosphor-icons/react/Info';

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

  const setArrow = ([x1, y1], [x2, y2], color = '#38bdf8', startPlug = 'disc', endPlug = 'disc', size = 1) => {
    const start = document.getElementById(`${x1}${y1}`);
    const end = document.getElementById(`${x2}${y2}`);
    const line = new LeaderLine(
      LeaderLine.pointAnchor(start, { x: '50%', y: '50%' }),
      LeaderLine.pointAnchor(end, { x: '50%', y: '50%' }),
      { path: 'straight', color: color, startPlug: startPlug, endPlug: endPlug, size: size, hide: true },
    );
    setTimeout(() => {
      line.show('draw');
    }, 0);
  }

  const getPathsFrom = (end) => {
    clearPaths();
    const { path, moves } = getShortestPath(Node(startNode), end);
    setTimeout(() => {
      // clearPaths();
      path.forEach((coordinate, index) => {
        if (index === path.length - 2) {
          setArrow(coordinate, path[index + 1], '#0ea5e9', 'disc', 'arrow1', 5);
          return;
        }
        if (index < path.length - 1) setArrow(coordinate, path[index + 1], '#0ea5e9', 'disc', 'disc', 5);
      });
    }, 500 * (moves + 1));
    setTimeout(() => {
      setStartNode(end);
    }, 500 * (moves + 2));
  }

  const getShortestPath = (root, end, queue = Queue(), visitedSquares = []) => {
    if (root.source) {
      setTimeout(() => {
        setArrow(root.source.data, root.data);
      }, 500 * root.level);
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
    <div className='w-full h-full grid auto-cols-fr content-between justify-center'>
      <header className='grid items-center justify-items-center bg-slate-300 p-2 text-black w-full'>
        <div className='md:hidden text-lg grid items-center justify-items-center gap-1'>
          Knights Travails
          <div className="tooltip tooltip-bottom" data-tip="The knights travails script gets the shortest path for a horsey between two points. This is a visualization of the progression of a tree and the eventual retrieval of the shortest path by the script.
          The solid blue line shows one of the shortest paths possible. The other scattered lines show the progression of the tree search before the shortest path is found.">
            <Info size={16} />
          </div>
        </div>
        <div className='hidden md:block text-sm'>
          The knights travails script gets the shortest path for a horsey between two points. This is a visualization of the progression of a tree and the eventual retrieval of the shortest path by the script.
          The solid blue line shows one of the shortest paths possible. The other scattered lines show the progression of the tree search before the shortest path is found.
        </div>
      </header>
      <div className='flex gap-3 md:gap-10 my-5 justify-center items-center flex-col md:flex-row'>
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
        <button className='btn md:self-start normal-case' onClick={clearPaths}>Clear pathways</button>
      </div>
      <footer className='grid items-center justify-items-center bg-slate-300 text-black w-full p-2'>
        <div className='flex items-center justify-center gap-2 text-sm'>
          A mini project by
          <a href="https://github.com/vkilng"> vkilng </a>
          <a href="https://github.com/vkilng/knights-travails">
            <img src={require('./assets/GitHub-Mark-32px.png')} alt="GitHub Page" width={'20px'} height={'20px'} />
          </a>
        </div>
        <div className="tooltip tooltip-top" data-tip="You could clone this project and modify it as you will. I did it simply because I find it very cool to visualize.">
          <Info size={16} />
        </div>
      </footer>
    </div>
  );
}

const clearPaths = () => {
  const paths = document.getElementsByClassName('leader-line');
  while (paths[0]) {
    paths[0].parentNode.removeChild(paths[0]);
  }
}
