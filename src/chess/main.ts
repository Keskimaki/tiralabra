import { Board, Color, Game, Move, OccupiedSquare } from '../types.ts'
import startingBoard from './board.ts'
import getPossibleMoves from './moves.ts'
import { getPieces, uciMoveToCoordinates } from './util.ts'

/*
 * Move a piece on the board
 * Assumes move is valid
 * @param {array} board - Current board state
 * @param {string} move - UCI notation of a move
 * @returns {array} - New board state
 */
const boardMove = (board: Board, move: Move): Board => {
  board = structuredClone(board)

  const [from, to] = uciMoveToCoordinates(move)

  const piece = board[from[1]][from[0]] as OccupiedSquare
  const { square, type, color } = piece

  board[from[1]][from[0]] = { square }

  const { square: newSquare } = board[to[1]][to[0]]
  board[to[1]][to[0]] = { square: newSquare, type, color }

  return board
}

/*
 * Initialize a new game
 * @param {string} gameId - Unique identifier for the game
 * @param {array} moves - List of moves to initialize the game with
 * @returns {object} - New game state
 */
export const initializeGame = (gameId: string, moves: Move[] = []): Game => {
  let board = structuredClone(startingBoard)

  // Assume all moves are valid
  for (const move of moves) {
    board = boardMove(board, move)
  }

  return {
    gameId,
    moves,
    board,
  }
}

/*
 * Make a move and update the game state
 * @param {object} game - Current game state
 * @param {string} move - UCI notation of a move
 * @returns {object} - New game state
 */
export const move = (game: Game, move: Move): Game => {
  const board = boardMove(game.board, move)

  return {
    ...game,
    moves: game.moves.concat(move),
    board,
  }
}

/*
 * Get all possible moves for a given color
 * @param {object} game - Current game state
 * @param {string} color - Color of pieces to get moves for
 * @returns {array} - List of possible moves in UCI notation
 */
export const possibleMoves = (game: Game, color: Color) => {
  const { board } = game

  const pieces = getPieces(board, color)

  const moves = []
  for (const piece of pieces) {
    const pieceMoves = getPossibleMoves(board, piece)

    moves.push(...pieceMoves)
  }

  return moves
}
