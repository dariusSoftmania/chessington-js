import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {getKingSquares} from "../helperFunctions";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        moves = getKingSquares(square);
        return moves;
    }
}
