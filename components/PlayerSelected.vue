<script setup lang="ts">
    const { isGameFinished, gameWinner } = useGame()
    const { gameData } = useAppwrite()
    const { playerId } = usePlayer()
   
    const youWon = ref(0)
    const secondPlayerWon = ref(0)
    const gamesPlayed = ref(0)

    watch(gameWinner, (newVal, oldVal) => {
        if(newVal === null) return
        gamesPlayed.value += 1
        if(newVal === 0) return // it's a draw
        if(newVal === playerId.value) {
            //winner
            youWon.value += 1;
        }
        else secondPlayerWon.value += 1;
    })

    const whoIsLeader = computed(() => {
        let tempClass = 'text-gray-800'
        if (youWon.value > secondPlayerWon.value) tempClass = 'text-green-600'
        if (youWon.value < secondPlayerWon.value) tempClass = 'text-red-600'
        
        return tempClass
    })

    const playerNumber = gameData?.value?.player1 === playerId.value ? 1 : 2

    const yourChoices = computed(() => {
        if (playerNumber == 1) return gameData.value?.player1Choices || []
        else return gameData.value?.player2Choices || []
    })

    const secondPlayerChoices = computed(() => {
        if (playerNumber == 1) return gameData.value?.player2Choices || []
        else return gameData.value?.player1Choices || []
    })

</script>
<template>
    <div class="w-full mt-10">
        <TableBoard :yourChoices="yourChoices" :secondPlayerChoices="secondPlayerChoices" :isGameFinished="isGameFinished" />
        <div class="flex items-center justify-between px-1 py-1 text-sm">
            <div>Games Played: <span class="font-bold">{{ gamesPlayed }}</span></div>
            <div>Current Score: <span :class="whoIsLeader" class="font-bold">{{ youWon}} - {{ secondPlayerWon }}</span>
            </div>
        </div>
        <GameEffects :winnerId="gameWinner" :playerId="playerId" />
    </div>
</template>


