export enum Color {
  White = 'white',
  Black = 'black',
}

export interface Options {
  color: Color
}

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
