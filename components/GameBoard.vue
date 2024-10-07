<script setup lang="ts">



    const { gameData, updateGameChoices, unsubscribeFromGame } = useAppwrite()
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

    const isGameFinished = computed(() => {
        return gameData.value?.player1Choices?.length === 3 && gameData.value?.player2Choices?.length === 3
    })

    const yourChoices = computed(() => {
        if(playerNumber == 1) return gameData.value?.player1Choices
        else return gameData.value?.player2Choices
    })

    const secondPlayerChoices = computed(() => {
        if (playerNumber == 1) return gameData.value?.player2Choices
        else return gameData.value?.player1Choices
    })

    watch(isGameFinished, () => {
        unsubscribeFromGame()
    })

</script>
<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 class="text-2xl font-bold mb-4 text-center">Game Board</h2>
        <div class="flex justify-center items-center gap-4 my-4">
            <div @click="select(+key)" class="shrink-0 w-14 h-14 text-2xl inline-flex items-center justify-center cursor-pointer p-2 border border-gray-300 rounded-md"
                v-for="(item, key ) in controlers" :key="key"> {{ item }}</div>
        </div>
        <div class="mt-6">You Selected:</div>
        <div class="grid grid-cols-3 gap-2">
            <div v-for="item in yourChoices">
                <UIcon name="i-ph-check-circle" v-if="!isGameFinished" class="w-6 h-6 text-green-600" />
                <div v-else>{{ controlers[item as keyof typeof controlers] }}</div>
                <!-- <div>
                    {{ compareChoices(item, ) }}
                </div> -->
            </div>
        </div>
        <div class="mt-6">2nd player selected:</div>
        <div class="grid grid-cols-3 gap-2">
            <div v-for="item in secondPlayerChoices">
                <UIcon name="i-ph-check-circle" v-if="!isGameFinished" class="w-6 h-6 text-green-600" />
                <div v-else>{{ controlers[item as keyof typeof controlers] }}</div>
            </div>
        </div>
        <div v-if="isGameFinished" class="mt-6">
            <div class="mb-4">Results:</div>
            <div v-if="getTheWinner === playerId" class="text-green-600 text-2xl">Congrats! You won</div>
            <div v-else class="text-red-600 text-2xl">You lost, try again</div>
            <div class="my-4">
                <UButton to="/game/new">Create another game!</UButton>
            </div>
        </div>



    </div>
</template>

