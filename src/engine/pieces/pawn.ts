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
            if(square.row === 7)
                return moves;
            const directionRow: number[]    = [1];
            const directionColumn: number[] = [0];
            if(square.row === 1)
                moves = board.getAvailableSquares(square, directionRow, directionColumn, 2);
            else
                moves = board.getAvailableSquares(square, directionRow, directionColumn, 1);

            if (board.getPiece(new Square(square.row + 1, square.col - 1)) !== undefined)
                moves = moves.concat(board.getAvailableSquares(square, [1], [-1], 1));
            if (board.getPiece(new Square(square.row + 1, square.col + 1)) !== undefined)
                moves = moves.concat(board.getAvailableSquares(square, [1], [1], 1));
        }
        else {
            if(square.row === 0)
                return moves;
            const directionRow: number[]    = [-1];
            const directionColumn: number[] = [ 0];
            if(square.row === 6)
                moves = board.getAvailableSquares(square, directionRow, directionColumn, 2);
            else
                moves = board.getAvailableSquares(square, directionRow, directionColumn, 1);

            if (board.getPiece(new Square(square.row - 1, square.col - 1)) !== undefined)
                moves = moves.concat(board.getAvailableSquares(square, [-1], [-1], 1));
            if (board.getPiece(new Square(square.row - 1, square.col + 1)) !== undefined)
                moves = moves.concat(board.getAvailableSquares(square, [-1], [1], 1));
        }
        return moves;
    }
}
