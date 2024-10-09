<script setup lang="ts">



    const { gameData, updateGameChoices, unsubscribeFromGame, resetGame } = useAppwrite()
    const { isGameFinished, gameWinner } = useGame()
    const route = useRoute()
    const gameId = route.params.id as string
    const playerId = usePlayer().playerId
    const playerNumber = gameData?.value?.player1 === playerId.value ? 1 : 2

    const controlers = {
        1: '🪨',
        2: '📃',
        3: '✂️',
    }

    const select = async (choice: number) => {
        await updateGameChoices(gameId, playerNumber === 1 ? 'player1' : 'player2', choice)
    }

    

</script>
<template>
    <div class="max-w-sm mx-auto">
        <GameScore></GameScore>
        <div class="h-14 mt-8">
            <template v-if="!isGameFinished">
                <h1 class="text-xl font-bold text-center text-green-600">Play Now</h1>
                <div class="text-sm text-center text-gray-600">(select 3 times)</div>
            </template>
            <h1 v-else class="text-xl font-bold mb-4 text-center text-gray-600">Game End</h1>
        </div>
        <div class="grid grid-cols-3 items-center gap-6 w-full mt-4" :class="{'opacity-50': isGameFinished}">
            <div @click="select(+key)" :class="{'hover:bg-gray-200 hover:translate-y-1' : !isGameFinished}"
                class="aspect-square text-5xl inline-flex items-center justify-center cursor-pointer p-2 bg-white shadow-md rounded-md transition-all duration-300"
                v-for="(item, key ) in controlers" :key="key"> {{ item }}
            </div>
        </div>
        <PlayerSelected />
        <div v-if="isGameFinished" class="mt-8">
            <div class="text-center text-2xl font-bold">
                <div v-if="gameWinner === playerId" class="text-green-600 text-2xl">Congrats!<br>You won</div>
                <div v-else class="text-red-600 text-2xl">You lost</div>
            </div>
            <div class="my-8 text-center">
                <button @click.prevent="() => resetGame(gameId)" class="btn btn-outline">Play again!</button>
            </div>
        </div>
    </div>
</template>

