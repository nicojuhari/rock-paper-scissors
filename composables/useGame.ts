const isGameFinished = ref(false)
const gameWinner = ref< null | number | string>()


export const useGame = () => {

    const { gameData } = useAppwrite()

    watch(gameData, () => {
        if(gameData.value?.player1Choices.length === 3 && gameData.value?.player2Choices.length === 3) {
            isGameFinished.value = true
            gameWinner.value = getGameWinner(gameData.value)
        } else {
            isGameFinished.value = false
            gameWinner.value = null
        }
    }, { immediate: true })

    return {
        isGameFinished,
        gameWinner,
    }
}