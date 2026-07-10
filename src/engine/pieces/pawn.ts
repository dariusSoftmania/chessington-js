import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        const square: Square = board.findPiece(this);
        if(this.player === Player.WHITE) {
            let nextRow: number = square.row + 1;
            const col: number = square.col;
            if(board.getPiece(new Square(nextRow, col)) !== undefined)
                return moves;
            moves.push(new Square(nextRow, col));
            nextRow++;
            if(square.row === 1 && board.getPiece(new Square(nextRow, col)) === undefined)
                moves.push(new Square(nextRow, col));
        }
        else {
            let nextRow: number = square.row - 1;
            const col: number = square.col;
            if(board.getPiece(new Square(nextRow, col)) !== undefined)
                return moves;
            moves.push(new Square(nextRow, col));
            nextRow--;
            if(square.row === 6 && board.getPiece(new Square(nextRow, col)) === undefined)
                moves.push(new Square(nextRow, col));
        }
        return moves;
    }
}
