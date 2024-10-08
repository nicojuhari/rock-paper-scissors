import { Client, Databases, ID } from 'appwrite'
import { ref } from 'vue';

const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'
const APPWRITE_PROJECT_ID = '67039957003124ccde85'
const APPWRITE_DATABASE_ID = '67039f28000dc292251a'
const APPWRITE_COLLECTION_ID = '67039f370009d02987f1'

type Game = {
  player1: string,
  player2: string,
  player1Choices: number[],
  player2Choices: number[],
  player1Name: string,
  player2Name: string,
  $id: string,
  $collectionId: string,
  $databaseId: string,
  $createdAt: string,
  $updatedAt: string,
  $permissions: []
}

const gameData = ref<Game | null >(null)

export const useAppwrite = () => {

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)

  const databases = new Databases(client)

  let unsubscribe: (() => void) | null = null

  const createGame = async (player1: string, player1Name: string): Promise<string> => {
    try {
      const response = await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          player1,
          player1Name,
        }
      )

      return response.$id
    } catch (error) {
      console.error('Error creating game:', error)
      throw error
    }
  }

  const joinGame = async (gameId: string, player2: string, player2Name: string): Promise<Game> => {
    try {
      let response = await databases.updateDocument<Game>(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        gameId,
        {
          player2,
          player2Name
        }
      )
     return response

    } catch (error) {
      console.error('Error joining game:', error)
      throw error
    }
  }

  const getGame = async (gameId: string): Promise<any> => {
    try {
      const response = await databases.getDocument<Game>(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        gameId
      )

      return response

    } catch (error) {
      console.error('Error fetching game:', error)
      // throw error
    }
  }

  const resetGame = async (gameId: string): Promise<void> => {
     try {
        await databases.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_ID,
          gameId,
          {
            player1Choices: [],
            player2Choices: [],
          }
        )
    } catch (error) {
      console.error('Error updating game choices:', error)
      // throw error
    }
  }

  const subscribeToGame = (gameId: string): void => {
    
    const channel = `databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_COLLECTION_ID}.documents.${gameId}`
    if(!unsubscribe) {
      unsubscribe = client.subscribe(channel, (response) => {
        if(response.events?.[0].includes('update'))
          if(response && response.payload)
            gameData.value = response.payload as Game
        if(response.events?.[0].includes('delete')) {
          unsubscribeFromGame()
          useRouter().push('/')
        }
      })
    }
  }

  const unsubscribeFromGame = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  onUnmounted(() => {
    unsubscribeFromGame()
  })

  const updateGameChoices = async (gameId: string, player: 'player1' | 'player2', choice: number): Promise<void> => {
    try {
      const game = await getGame(gameId)
      const choices = game[`${player}Choices`] || []
      choices.push(choice)
      
      if(choices?.length <= 3)
        await databases.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_ID,
          gameId,
          {
            [`${player}Choices`]: choices,
          }
        )
    } catch (error) {
      console.error('Error updating game choices:', error)
      // throw error
    }
  }

  const deleteGame = async (gameId: string): Promise<void> => {
    try {
      await databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        gameId
      )
    } catch (error) {
      console.error('Error deleting game:', error)
      // throw error
    }
  }

  return {
    gameData,
    createGame,
    joinGame,
    getGame,
    subscribeToGame,
    unsubscribeFromGame,
    updateGameChoices,
    resetGame,
    deleteGame,
  }
}
