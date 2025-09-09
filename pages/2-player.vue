<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useGameStore } from '@/composables/useGameStore'
//  from '@/composables/useAppwrite'
// import { useGameLogic } from '@/composables/useGameLogic'

useHead({
    title: 'Rock Paper Scissors - 2 Player Game | RPS Online',
    meta: [
        { name: 'description', content: "Rock Paper Scissors online — free 2-player fun! Create a game, share the link, and play instantly, no sign-up needed." },
        { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
})

const route = useRoute()
// const gameStore = useGameStore()
const gameId = ref(route.query.gameId as string)

const { gameData, getGame, subscribeToGame, createGame } = useAppwrite()
const { playerId } = usePlayer()
// const gameLogic = useGameLogic()

const loading = ref(true)

onMounted(async () => {
    try{
        gameData.value = await getGame(gameId.value)
        subscribeToGame(gameId.value)
        loading.value = false
    } catch (error) {
        console.error('Error fetching game:', error)
        loading.value = false
    }
})

const onCreateGame = async () => {
    try {
        const gameId = await createGame(playerId.value)
        navigateTo(`/2-player?gameId=${gameId}`)
        gameData.value = await getGame(gameId)
        subscribeToGame(gameId)
    } catch (error) {
        console.error(error)
        alert('Failed to create game')
    }
}




// const onDeleteGame = async () => {
//     if (gameData?.value?.$id) await deleteGame(gameData.value.$id)
// }

// ... implement game logic, selection, and result display
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4 text-center">Rock Paper Scissors - 2 Player Game</h1>
        <template v-if="gameData">
            <template v-if="!gameData.player2">
                <JoinGame v-if="playerId !== gameData?.player1" />
                <template v-else>
                    <div class="my-6 space-y-8 text-center bg-white p-6 rounded-lg border border-gray-200/50">
                        <div class="space-y-2">
                            <div class="text-2xl font-bold">Game room created!</div>
                            <div>Share this link with a friend to start playing!</div>
                        </div>
                        <UiLoading class="h-10 w-10 text-gray-300 mx-auto" />
                        <IncludesCopyToClipboard class="btn-outline w-48 text-center" />
                    </div>
                </template>
            </template>
            <!-- if you created the game and ther is no 2nd player yet -->
            <GameBoard v-else />
        </template>
        <div v-else-if="loading" class="container my-24 flex items-center justify-center">
            <UiLoading class="h-24 w-24 text-gray-300" />
        </div>
        <div v-else class="mt-6 space-y-8 p-6 bg-white rounded-lg border border-gray-200/50 text-center">
            <h2 class="text-xl font-bold text-center">Game Not Found!</h2>
            <p>The game link you used is invalid or no longer exists.<br> 
                But don't worry — you can start a new game in seconds!</p>
<UButton color="secondary" class="justify-center mt-6 px-8" icon="i-ph-users-duotone" size="xl" @click.prevent="onCreateGame" label="Create a Game"/>
            
        </div>

        <!-- Implement game UI here -->
    </div>


</template>