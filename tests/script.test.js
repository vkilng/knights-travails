import { Node, isInsideBoard, getAllMovesFrom, stringifyCoord, getShortestPath, knightMoves } from "../script";

test("Checks if passed coordinate is inside chess board", () => {
    expect(isInsideBoard([0, 0])).toBe(true);
    expect(isInsideBoard([7, 7])).toBe(true);
    expect(isInsideBoard([8, 8])).toBe(false);
})

test("Checks if moves returned by getAllMovesFrom() are valid moves for a horsey", () => {
    expect(getAllMovesFrom([0, 0])).toEqual([[1, 2], [2, 1]]);
    getAllMovesFrom([0, 0]).forEach(coordinate => {
        expect(isInsideBoard(coordinate)).toBe(true)
    });
})

test("Checks if stringifyCoord() returns stringified coordinate from given [x,y]", () => {
    expect(stringifyCoord([0, 0])).toBe("a1");
    expect(stringifyCoord([2, 2])).toBe("c3");
    expect(stringifyCoord([0, 3])).toBe("a4");
    expect(stringifyCoord([4, 1])).toBe("e2");
})

test("getShortestPath()", () => {
    expect(getShortestPath(Node([0, 0]), [1, 1])).toEqual({
        "moves": 4, "path": [[0, 0], [1, 2], [0, 4], [2, 3],
        [1, 1]]
    })
})

test("knightMoves()", () => {
    expect(knightMoves([0, 0], [2, 1])).toEqual({
        "moves": 1,
        "path": ["a1", "c2"]
    })
})