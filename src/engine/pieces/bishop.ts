import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {getDiagonalSquares} from "../helperFunctions";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        moves = getDiagonalSquares(square);
        return moves;
    }
}
