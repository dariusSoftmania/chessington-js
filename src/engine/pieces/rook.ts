import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = [];
        let square: Square = board.findPiece(this);
        for(let col = 0; col <= 7; ++col)
            if (col !== square.col)
                moves.push(new Square(square.row, col));
        for(let row = 0; row <= 7; ++row)
            if (row !== square.row)
                moves.push(new Square(row, square.col));
        return moves;
    }
}
