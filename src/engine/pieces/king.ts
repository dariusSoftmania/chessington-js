import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        const directionRow: number[]    = [1, 1, 0, -1, -1, -1,  0,  1];
        const directionColumn: number[] = [0, 1, 1,  1,  0, -1, -1, -1];
        moves = board.getAvailableSquares(square, directionRow, directionColumn, 1);
        return moves;
    }
}
