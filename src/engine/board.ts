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

    getAvailableSquares(square: Square, directionRow: number[], directionCol: number[], maximumDistance: number): Square[] {
        let moves: Square[] = [];
        const directionSize: number = directionRow.length;

        for(let directionIndex: number = 0; directionIndex <= directionSize; directionIndex++)
            for(let index: number = 1; index <= maximumDistance; index++) {
                const currentRow: number = square.row + index * directionRow[directionIndex];
                const currentColumn: number = square.col + index * directionCol[directionIndex];
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
}
