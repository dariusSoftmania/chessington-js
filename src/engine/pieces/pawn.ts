import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = [];
        let square: Square = board.findPiece(this);
        if(this.player === 0) {
            moves.push(new Square(square.row + 1, square.col));
            if(square.row === 1)
                moves.push(new Square(square.row + 2, square.col))
        }
        else {
            moves.push(new Square(square.row - 1, square.col));
            if(square.row === 6)
                moves.push(new Square(square.row - 2, square.col));
        }
        return moves;
    }
}
