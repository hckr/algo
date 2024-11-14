/*
    n x m grid [prob. should disambiguate which is width and height]
    start: bottom-left corner
    finish: bottom-right corner
    possible moves: up-right, down-right
    question: number of unique paths
*/

// Initial

function numPaths(cols: number, rows: number, row?: number): number {
    if (row === undefined) {
        // starting position is at the bottom
        row = rows; // counting from 1
    }
    if (cols < 1 || rows < 1 || row < 1 || row > rows) {
        return 0;
    }
    if (cols === 1) {
        // moved into last column, can't move farther
        if (row === rows) {
            // reached the final cell
            return 1;
        }
        // otherwise it's not possible to reach the finish
        return 0;
    }
    return (
        // summing ones which are returned at the end if the path leads to the finish (zeros otherwise)
        numPaths(cols - 1, rows, row - 1) + // up-right
        numPaths(cols - 1, rows, row + 1) // down-right
    );
}

// Follow-up 1

function numPathsWithCheckpoints(
    cols: number,
    rows: number,
    checkpointsList: [number, number][] // array of [col, row]
) {
    const checkpointRowForColumn: { [col: number]: number } = {};
    for (const [col, row] of checkpointsList) {
        if (col > cols || row > rows || col < 1 || row < 1) {
            // out of bounds, impossible
            return 0;
        }
        if (col in checkpointRowForColumn) {
            return 0; // no paths possible if multiple rows should be visited in column
        }
        checkpointRowForColumn[col] = row;
    }
    if (
        checkpointRowForColumn[1] !== undefined &&
        checkpointRowForColumn[1] !== rows
    ) {
        return 0; // impossible to reach another checkpoint in the first column than starting cell
    }
    if (
        checkpointRowForColumn[cols] !== undefined &&
        checkpointRowForColumn[cols] !== rows
    ) {
        return 0; // impossible to reach another checkpoint in the last column than finish cell
    }
    return _numPaths2(cols, rows, 1, rows, checkpointRowForColumn);
}

function _numPaths2(
    cols: number,
    rows: number,
    col: number,
    row: number,
    checkpointRowPerColumn: { [col: number]: number }
): number {
    if (row < 1 || row > rows) {
        return 0; // out of bounds
    }
    if (col === cols) {
        // moved into last column, can't move farther
        if (row === rows) {
            // reached the final cell
            return 1;
        }
        // otherwise it's not possible to reach the finish
        return 0;
    }
    if (col in checkpointRowPerColumn) {
        if (row != checkpointRowPerColumn[col]) {
            return 0; // paths have to cross the checkpoint
        }
    }
    return (
        // summing ones which are returned at the end of the path leads to the finish (zeros otherwise)
        _numPaths2(cols, rows, col + 1, row - 1, checkpointRowPerColumn) + // up-right
        _numPaths2(cols, rows, col + 1, row + 1, checkpointRowPerColumn) // down-right
    );
}

// Follow-up 2

function numPathsWithCheckpointsInOrder(
    cols: number,
    rows: number,
    checkpointsList: [number, number][] // array of [col, row]
) {
    const checkpointRowForColumn: { [col: number]: number } = {};
    let prevCol = 0;
    for (const [col, row] of checkpointsList) {
        if (col > cols || row > rows || col < 1 || row < 1) {
            // out of bounds, impossible
            return 0;
        }
        // DIFFERENCE IS HERE:
        if (col <= prevCol) {
            return 0; // not possible if checkpoints are supposed to be encountered in order
        }
        prevCol = col;
        if (col in checkpointRowForColumn) {
            return 0; // no paths possible if multiple rows should be visited in column
        }
        checkpointRowForColumn[col] = row;
    }
    if (
        checkpointRowForColumn[1] !== undefined &&
        checkpointRowForColumn[1] !== rows
    ) {
        return 0; // impossible to reach another checkpoint in the first column than starting cell
    }
    if (
        checkpointRowForColumn[cols] !== undefined &&
        checkpointRowForColumn[cols] !== rows
    ) {
        return 0; // impossible to reach another checkpoint in the last column than finish cell
    }
    return _numPaths2(cols, rows, 1, rows, checkpointRowForColumn);
}

// ---

// Initial
console.log(numPaths(5, 3));

// Follow-up 1
console.log(numPathsWithCheckpoints(5, 3, []));
console.log(numPathsWithCheckpoints(5, 3, [[2, 2]]));
console.log(
    numPathsWithCheckpoints(5, 3, [
        [2, 2],
        [3, 1],
    ])
);

// Follow-up 2
console.log(
    numPathsWithCheckpointsInOrder(5, 3, [
        [2, 2],
        [3, 1],
    ])
);
console.log(
    numPathsWithCheckpointsInOrder(5, 3, [
        [3, 1],
        [2, 2],
    ])
);
