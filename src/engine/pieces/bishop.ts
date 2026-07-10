import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        const square: Square = board.findPiece(this);
        for(let index: number = 1; index <= 7; ++index) {
            if (board.checkBounds(square.row - index, square.col - index))
                moves.push(new Square(square.row - index, square.col - index));
            if (board.checkBounds(square.row - index, square.col + index))
                moves.push(new Square(square.row - index, square.col + index));
            if (board.checkBounds(square.row + index, square.col - index))
                moves.push(new Square(square.row + index, square.col - index));
            if (board.checkBounds(square.row + index, square.col + index))
                moves.push(new Square(square.row + index, square.col + index));
        }
        return moves;
    }
}
