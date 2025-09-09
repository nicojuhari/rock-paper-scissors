import type { Models } from 'appwrite'

export type Game = Models.Document & {
  player1: string,
  player2: string,
  player1Choices: number[],
  player2Choices: number[],
  $id: string,
  $sequence: number;
  $collectionId: string,
  $databaseId: string,
  $createdAt: string,
  $updatedAt: string,
  $permissions: []
}

export type SingleGame = {
  player1: string,
  player2: string,
  player1Choices: number[],
  player2Choices: number[],
}