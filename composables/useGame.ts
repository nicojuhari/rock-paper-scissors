type GameScore = {
    gameId: string,
    player1: number,
    player2: number
}

const currentGameScore = ref<GameScore>()
const isGameFinished = ref(false)
const gameWinner = ref(null)


export const useGame = () => {

    const { gameData } = useAppwrite()

    //save the score to localstorage
    const saveScore = (gameId:string, player1Score: number, player2Score: number) => {

        let allScores: GameScore[]
        let thisGame;

        allScores = getScores()
        thisGame = allScores.find(game => gameId == game.gameId)

        if(thisGame) {
            thisGame.player1 += player1Score
            thisGame.player2 += player2Score

            // Replace the object in the array
            allScores = allScores.map(game => 
                game.gameId === gameId ? thisGame! : game
            )
        } else {
            //create a new object and add back to array
            const newGame: GameScore = {
                gameId,
                player1: player1Score,
                player2: player2Score
            }
            // Add the new game to the array
            allScores.push(newGame)
        }

        //save to local storage
        localStorage.setItem('rps-game-score', JSON.stringify(allScores))
    }

    const getScores = (): GameScore[] | [] => {
        let scores = localStorage.getItem('rps-game-score')
        return scores ? JSON.parse(scores) : []
    }

    const getGameScore = (gameId: string): GameScore | undefined => {
        const allScores = getScores()
        return allScores.find(game => game.gameId === gameId)
    }

    const compareChoices = (p1:number, p2:number) : number  => {
        if(p1 === p2) return 0; // Draw
        if (
            (p1 === 1 && p2 === 3) || // Rock beats Scissors
            (p1 === 2 && p2 === 1) || // Paper beats Rock
            (p1 === 3 && p2 === 2)    // Scissors beats Paper
        ) {
            return 1; // Player 1 wins
        }
        return 2 //Player 2 wins
    }

    const getTheWinner = computed(() => {
        const p1 = gameData.value?.player1Choices;
        const p2 = gameData.value?.player2Choices;

        if (!p1 || !p2 || p1.length !== 3 || p2.length !== 3) return null;

        const winners = p1.map((choice, index) => {
            if (choice === p2[index]) return 'draw';
            if ((choice % 3) + 1 === p2[index]) return gameData.value?.player2;
            return gameData.value?.player1;
        });

        const player1Wins = winners.filter(w => w === gameData.value?.player1).length;
        const player2Wins = winners.filter(w => w === gameData.value?.player2).length;

        if (player1Wins === player2Wins) return 'draw';
        return player1Wins > player2Wins ? gameData.value?.player1 : gameData.value?.player2;
    });

    //get the score from localstorage


    // compare the results


    //get the winner from the results

    watch(gameData, () => {
        if(gameData.value?.player1Choices.length === 3 && gameData.value?.player2Choices.length === 3) {

            isGameFinished.value = true
        } else {
            isGameFinished.value = false
        }
    })

    return {
        saveScore,
        getGameScore,
        compareChoices,
        currentGameScore,
        isGameFinished,
        gameWinner,

    }
}