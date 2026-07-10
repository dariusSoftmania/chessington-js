import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        const square: Square = board.findPiece(this);
        for(let col: number = 0; col <= 7; ++col)
            if (col !== square.col)
                moves.push(new Square(square.row, col));
        for(let row: number = 0; row <= 7; ++row)
            if (row !== square.row)
                moves.push(new Square(row, square.col));
        return moves;
    }
}
