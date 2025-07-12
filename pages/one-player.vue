<script setup lang="ts">

    const playerId = 'You'

    const controlers = {
        1: '🪨',
        2: '📃',
        3: '✂️',
    }

    const playerChoices = ref<number[]>([])
    const computerChoices = ref<number[]>([])
    const gameWinner = ref<null | number | string>()

    const select = (choice: number) => {
        if(playerChoices.value.length === 3) return
        playerChoices.value.push(choice)
    }

    const isGameFinished = computed(() => {
        return playerChoices.value.length === 3 && computerChoices.value.length === 3
    })

    const getComputerChoice = () => {
        return Math.floor(Math.random() * 3) + 1
    }

    watch(playerChoices, () => {
        if(playerChoices.value.length === 3) {    
            computerChoices.value = [getComputerChoice(), getComputerChoice(), getComputerChoice()]
        }
    }, { deep: true })

    watch(isGameFinished, () => {
        if(isGameFinished.value) {
            gameWinner.value = getGameWinner({
                player1: 'You',
                player2: 'Computer',
                player1Choices: playerChoices.value,
                player2Choices: computerChoices.value,
            })
        }
    }, { immediate: true })

    const resetGame = () => {
        playerChoices.value = []
        computerChoices.value = []
        gameWinner.value = null
    }

</script>
<template>
    <div class="max-w-sm mx-auto">
        <div class="mt-8">
            <h1 v-if="!isGameFinished" class="text-2xl font-bold text-center text-green-600 mb-4">Select your Move
            </h1>
            <h1 v-else class="text-2xl font-bold text-center mb-4">Game Finished!</h1>
            <div class="text-sm text-center text-gray-800 space-y-2">
                <div>After you select your move <strong>3 times,</strong><br>the game ends and results will be displayed.</div>
            </div>
        </div>
        <div class="grid grid-cols-3 items-center gap-6 w-full mt-10" :class="{'opacity-50': isGameFinished}">
            <div @click="select(+key)" :class="{'hover:shadow-md hover:translate-y-1' : !isGameFinished}"
                class="aspect-square text-5xl inline-flex items-center select-none justify-center cursor-pointer p-2 bg-white shadow-xl rounded-md transition-all duration-300"
                v-for="(item, key ) in controlers" :key="key"> {{ item }}
            </div>
        </div>
        <div class="w-full mt-10">
            <TableBoard :your-choices="playerChoices" :second-player-choices="computerChoices" :is-game-finished="isGameFinished" :is-one-player="true" />
            <div v-if="isGameFinished" class="mt-8">
                <div class="text-center text-xl font-medium">
                    <div v-if="gameWinner === playerId" class="text-green-600">Congratulations!<br>You've won!</div>
                    <div v-else-if="gameWinner === 0">It is a Tie</div>
                    <div v-else class="text-red-600">Try again and beat it!</div>
                </div>
                <div class="my-8 text-center">
                    <button @click.prevent="() => resetGame()" class="btn btn-outline">Play again</button>
                </div>
            </div>
        </div>
        <GameEffects :winnerId="gameWinner" :playerId="playerId" />
    </div>
</template>

