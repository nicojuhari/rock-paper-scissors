const isGameFinished = ref(false)
const gameWinner = ref< null | number | string>()


export const useGame = () => {

    const { gameData } = useAppwrite()

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

    const getGameWinner = () => {
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

        if (player1Wins === player2Wins) return 0;
        return player1Wins > player2Wins ? gameData.value?.player1 : gameData.value?.player2;
    }

    watch(gameData, () => {
        if(gameData.value?.player1Choices.length === 3 && gameData.value?.player2Choices.length === 3) {
            isGameFinished.value = true
            gameWinner.value = getGameWinner()
        } else {
            isGameFinished.value = false
            gameWinner.value = null
        }
    }, { immediate: true })

    return {
        compareChoices,
        isGameFinished,
        gameWinner,
    }
}