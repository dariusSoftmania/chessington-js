import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        const square: Square = board.findPiece(this);
        let directionRow: number[]    = [-1,  0, 1, 0];
        let directionColumn: number[] = [ 0, -1, 0, 1];
        let rookMoves: Square[] = board.getAvailableSquares(square, directionRow, directionColumn, GameSettings.BOARD_SIZE - 1);
        directionRow   = [-1, -1,  1, 1];
        directionColumn= [-1,  1, -1, 1];
        let bishopMoves: Square[] = board.getAvailableSquares(square, directionRow, directionColumn, GameSettings.BOARD_SIZE - 1);
        return rookMoves.concat(bishopMoves);
    }
}
