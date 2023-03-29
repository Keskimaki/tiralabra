export enum ColorOption {
  White = 'w',
  Black = 'b',
}

export interface Options {
  color: ColorOption
}

export type Color = 'w' | 'b'

export type Move = string

export type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k'

export interface OccupiedSquare {
  square: string
  type: Piece
  color: string
}

export type Square = OccupiedSquare | null

export type Row = Square[]

export type Board = Row[]
