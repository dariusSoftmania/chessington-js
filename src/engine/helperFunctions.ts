import Square from "./square";

/**
 * Function to check if a piece is in the bounds of the board
 *
 * @param row row of the piece
 * @param col column of the piece
 */
function checkBounds(row: number, col: number): boolean {
    return (row >= 0 && row <= 7 && col >= 0 && col <= 7);
}

/**
 * Function to get all squares on same row or column with a given square
 *
 * @param square starting square
 */
export function getHorizontalAndVerticalSquares(square: Square): Square[] {
    let moves: Square[] = [];
    for(let col: number = 0; col <= 7; col++)
        if (col !== square.col)
            moves.push(new Square(square.row, col));
    for(let row: number = 0; row <= 7; row++)
        if (row !== square.row)
            moves.push(new Square(row, square.col));
    return moves;
}

/**
 * Function to get all squares on same diagonal with a given square
 *
 * @param square starting square
 */
export function getDiagonalSquares(square: Square): Square[] {
    let moves: Square[] = [];
    for(let index: number = 1; index <= 7; index++) {
        if (checkBounds(square.row - index, square.col - index))
            moves.push(new Square(square.row - index, square.col - index));
        if (checkBounds(square.row - index, square.col + index))
            moves.push(new Square(square.row - index, square.col + index));
        if (checkBounds(square.row + index, square.col - index))
            moves.push(new Square(square.row + index, square.col - index));
        if (checkBounds(square.row + index, square.col + index))
            moves.push(new Square(square.row + index, square.col + index));
    }
    return moves;
}

/**
 * Function to get all squares in an L shape from a given square
 *
 * @param square starting square
 */
export function getKnightSquares(square: Square): Square[] {
    let moves: Square[] = [];
    const rows: number[] = [2, 1, -1, -2, -2, -1,  1,  2];
    const cols: number[] = [1, 2,  2,  1, -1, -2, -2, -1];
    for(let index: number = 0; index <= 7; index++)
        if (checkBounds(square.row + rows[index], square.col + cols[index]))
            moves.push(new Square(square.row + rows[index], square.col + cols[index]));
    return moves;
}