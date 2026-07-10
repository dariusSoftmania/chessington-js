import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        moves = board.getHorizontalSquares(square).concat(board.getVerticalSquares(square))
            .concat(board.getDiagonalSquares(square));
        return moves;
    }
}
