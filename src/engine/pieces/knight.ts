import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import {getKnightSquares} from "../helperFunctions";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[];
        const square: Square = board.findPiece(this);
        moves = getKnightSquares(square);
        return moves;
    }
}
