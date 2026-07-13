import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from "./pieces/king";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    // public constructor() {
    //     this.currentPlayer = Player.WHITE;
    //     this.board = this.createBoard();
    // }

    public constructor(currentPlayer: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    /**
     * Function to check if a piece is in the bounds of the board
     *
     * @param square square to be checked
     */
    private checkBounds(square: Square): boolean {
        return (square.row >= 0 && square.row <= 7 && square.col >= 0 && square.col <= 7);
    }

    /**
     * Function to get all squares on same row with a given square
     *
     * @param square starting square
     */
    getHorizontalSquares(square: Square): Square[] {
        let moves: Square[] = [];
        const initialRow: number = square.row;
        const initialCol: number = square.col;

        for(let col: number = initialCol - 1; col >= 0; col--) {
            const newSquare: Square = new Square(initialRow, col);
            if (this.getPiece(newSquare) !== undefined) {
                if(this.getPiece(newSquare)?.player !== this.currentPlayer && !(this.getPiece(newSquare) instanceof King))
                    moves.push(newSquare);
                break;
            }
            moves.push(newSquare);
        }
        for(let col: number = initialCol + 1; col <= 7; col++) {
            const newSquare: Square = new Square(initialRow, col);
            if (this.getPiece(newSquare) !== undefined) {
                if(this.getPiece(newSquare)?.player !== this.currentPlayer && !(this.getPiece(newSquare) instanceof King))
                    moves.push(newSquare);
                break;
            }
            moves.push(newSquare);
        }
        return moves;
    }

    /**
     * Function to get all squares on same column with a given square
     *
     * @param square starting square
     */
    getVerticalSquares(square: Square): Square[] {
        let moves: Square[] = [];
        const initialRow: number = square.row;
        const initialCol: number = square.col;

        for(let row: number = initialRow - 1; row >= 0; row--) {
            const newSquare: Square = new Square(row, initialCol);
            if (this.getPiece(newSquare) !== undefined) {
                if(this.getPiece(newSquare)?.player !== this.currentPlayer && !(this.getPiece(newSquare) instanceof King))
                    moves.push(newSquare);
                break;
            }
            moves.push(newSquare);
        }
        for(let row: number = initialRow + 1; row <= 7; row++) {
            const newSquare: Square = new Square(row, initialCol);
            if (this.getPiece(newSquare) !== undefined) {
                if(this.getPiece(newSquare)?.player !== this.currentPlayer && !(this.getPiece(newSquare) instanceof King))
                    moves.push(newSquare);
                break;
            }
            moves.push(newSquare);
        }
        return moves;
    }


    /**
     * Function to get all squares on same diagonal with a given square
     *
     * @param square starting square
     */
    getDiagonalSquares(square: Square): Square[] {
        let moves: Square[] = [];
        let directionRow: number[]    = [-1, -1,  1, 1];
        let directionColumn: number[] = [-1,  1, -1, 1];

        for(let directionIndex = 0; directionIndex <= 3; directionIndex++)
            for(let index: number = 1; index <= 7; index++) {
                const currentRow: number = square.row + index * directionRow[directionIndex];
                const currentColumn: number = square.col + index * directionColumn[directionIndex];
                const newSquare: Square = new Square(currentRow, currentColumn);
                if (this.checkBounds(newSquare)) {
                    if (this.getPiece(newSquare) !== undefined) {
                        if(this.getPiece(newSquare)?.player !== this.currentPlayer && !(this.getPiece(newSquare) instanceof King))
                            moves.push(newSquare);
                        break;
                    }
                    moves.push(newSquare);
                }
            }

        return moves;
    }

    /**
     * Function to get all squares in an L shape from a given square
     *
     * @param square starting square
     */
    getKnightSquares(square: Square): Square[] {
        let moves: Square[] = [];
        const rows: number[] = [2, 1, -1, -2, -2, -1,  1,  2];
        const cols: number[] = [1, 2,  2,  1, -1, -2, -2, -1];
        for(let index: number = 0; index <= 7; index++) {
            const newSquare: Square = new Square(square.row + rows[index], square.col + cols[index]);
            if (this.checkBounds(newSquare))
                moves.push(newSquare);
        }
        return moves;
    }

    /**
     * Function to get all squares in a radius of 1 from a given square
     *
     * @param square starting square
     */
    getKingSquares(square: Square): Square[] {
        let moves: Square[] = [];
        const rows: number[] = [1, 1, 0, -1, -1, -1,  0,  1];
        const cols: number[] = [0, 1, 1,  1,  0, -1, -1, -1];
        for(let index: number = 0; index <= 7; index++) {
            const newSquare: Square = new Square(square.row + rows[index], square.col + cols[index]);
            if (this.checkBounds(newSquare) && this.getPiece(newSquare) === undefined)
                moves.push(newSquare);
        }
        return moves;
    }
}
