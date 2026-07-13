import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        const directionRow: number[] = [2, 1, -1, -2, -2, -1,  1,  2];
        const directionColumn: number[] = [1, 2,  2,  1, -1, -2, -2, -1];
        moves = board.getAvailableSquares(square, directionRow, directionColumn, 1);
        return moves;
    }
}
