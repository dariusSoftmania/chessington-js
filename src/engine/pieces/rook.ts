import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {getHorizontalAndVerticalSquares} from "../helperFunctions";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        const square: Square = board.findPiece(this);
        moves = getHorizontalAndVerticalSquares(square);
        return moves;
    }
}
