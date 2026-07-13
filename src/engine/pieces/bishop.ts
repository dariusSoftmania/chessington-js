import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        let directionRow: number[]    = [-1, -1,  1, 1];
        let directionColumn: number[] = [-1,  1, -1, 1];
        moves = board.getAvailableSquares(square, directionRow, directionColumn, GameSettings.BOARD_SIZE - 1);
        return moves;
    }
}
