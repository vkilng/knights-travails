import { Queue } from "./Queue.js";

const Node = (_data, _source = null, _level = 0) => {
    let data = _data;
    const source = _source;
    const level = _level;

    return { data, source, level };
}

// next, check if coordinates are inside board
const isInsideBoard = (coordinate) => {
    const [x, y] = coordinate;
    return (x >= 0 && x <= 7)
        && (y >= 0 && y <= 7);
}

const getAllMovesFrom = function getAllPossibleDestinationsfrom([x, y]) {
    let possibleMoves = [];
    for (let a of [-2, -1, 1, 2]) {
        if (Math.abs(a) === 1) for (let b of [-2, 2]) possibleMoves.push([x + a, y + b]);
        if (Math.abs(a) === 2) for (let b of [-1, 1]) possibleMoves.push([x + a, y + b]);
    }

    return possibleMoves.filter(coordinate => isInsideBoard(coordinate));
}

const stringifyCoord = function coordToChessSquares([x, y]) {
    return String.fromCharCode(97 + x) + (y + 1);
}

const getShortestPath = (root, end, queue = Queue(), visitedSquares = []) => {
    if (stringifyCoord(root.data) === stringifyCoord(end)) {
        let curr = root;
        let res = [curr.data];
        while (curr.source) {
            res.push(curr.source.data);
            curr = curr.source;
        }
        return { path: res.reverse(), moves: root.level };
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


const knightMoves = (start, end) => {
    let { path, moves } = getShortestPath(Node(start), end);
    console.log(JSON.stringify(path));
    path.forEach((coord, index) => path[index] = stringifyCoord(coord));
    return { path, moves };
}


export { Node, isInsideBoard, getAllMovesFrom, stringifyCoord, getShortestPath, knightMoves };