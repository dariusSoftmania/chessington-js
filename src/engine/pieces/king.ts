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
        moves = board.getKingSquares(square);
        return moves;
    }
}
