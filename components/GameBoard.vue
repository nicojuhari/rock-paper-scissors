<script setup lang="ts">



    const { gameData, updateGameChoices, resetGame } = useAppwrite()
    const { isGameFinished, gameWinner } = useGame()
    const route = useRoute()
    const gameId = route.query.gameId as string
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
        <div class="mt-8">
            <h1 v-if="!isGameFinished" class="text-2xl font-bold text-center text-green-600 mb-4">Select your Move
            </h1>
            <h1 v-else class="text-2xl font-bold text-center mb-4">Game Finished!</h1>
            <div class="text-sm text-center text-gray-800 space-y-2">
                <div>After both players select their move <strong>3 times,</strong><br>the game ends and results will be displayed.</div>
            </div>
        </div>
        <div class="grid grid-cols-3 items-center gap-6 w-full mt-10" :class="{'opacity-50': isGameFinished}">
            <div @click="select(+key)" :class="{'hover:shadow-md hover:translate-y-1' : !isGameFinished}"
                class="aspect-square text-5xl inline-flex items-center select-none justify-center cursor-pointer p-2 bg-white shadow-xl rounded-md transition-all duration-300"
                v-for="(item, key ) in controlers" :key="key"> {{ item }}
            </div>
        </div>
        <PlayerSelected />
        <div v-if="isGameFinished" class="mt-8">
            <div class="text-center text-xl font-medium">
                <div v-if="gameWinner === playerId" class="text-green-600">Congratulations!<br>You've won!</div>
                <div v-else-if="gameWinner === 0">It is a Tie</div>
                <div v-else class="text-red-600">Better luck next time!</div>
            </div>
            <div class="my-8 text-center">
                <button @click.prevent="() => resetGame(gameId)" class="btn btn-outline">Play again</button>
            </div>
        </div>
    </div>
</template>

