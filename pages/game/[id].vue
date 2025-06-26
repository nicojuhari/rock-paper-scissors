<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useGameStore } from '@/composables/useGameStore'
//  from '@/composables/useAppwrite'
// import { useGameLogic } from '@/composables/useGameLogic'

useHead({
    title: 'Play Now - Rock Paper Scissors Game Online',
    meta: [
        { name: 'description', content: "Play Now Rock Paper Scissors Game online." },
        { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
})

const route = useRoute()
// const gameStore = useGameStore()
const { gameData, getGame, subscribeToGame } = useAppwrite()
const { playerId } = usePlayer()

// const gameLogic = useGameLogic()

const gameId = route.params.id as string
const loading = ref(true)

onMounted(async () => {
    try{
        gameData.value = await getGame(gameId)
        subscribeToGame(gameId)
        loading.value = false
    } catch (error) {
        console.error('Error fetching game:', error)
        loading.value = false
    }
})




// const onDeleteGame = async () => {
//     if (gameData?.value?.$id) await deleteGame(gameData.value.$id)
// }

// ... implement game logic, selection, and result display
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <template v-if="gameData">
            <template v-if="!gameData.player2">
                <template v-if="playerId !== gameData?.player1">
                    <h1 class="text-2xl font-bold mb-4 text-center">Join the Game Room</h1>
                    <JoinGame />
                </template>
                <template v-else>
                    <div class="my-6 space-y-8 text-center">
                        <h1 class="text-2xl font-bold mb-8 text-center">Waiting for the second player...</h1>
                        <UiLoading class="h-10 w-10 text-gray-300 text-center mx-auto" />
                        <div class="space-y-6 text-center">
                            <div>Share the game link with your friend to join the fun! 🎉</div>
                            <div>
                                <IncludesCopyToClipboard class="btn-outline w-48 text-center" />
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <!-- if you created the game and ther is no 2nd player yet -->
            <GameBoard v-else />
        </template>
        <div v-else-if="loading" class="container my-24 flex items-center justify-center">
            <UiLoading class="h-24 w-24 text-gray-300" />
        </div>
        <div v-else class="my-10 space-y-8">
            <h2 class="text-3xl font-bold text-center">Game Not Found!</h2>
            <p class="text-lg">It seems the game ID you entered is invalid or does not exist.<br>But don't worry! You
                can
                easily create a
                new game and start fresh.</p>
            <div class="text-center">
                <nuxt-link to="/game/new" class="btn btn-primary">Create a new
                    game</nuxt-link>
            </div>
        </div>

        <!-- Implement game UI here -->
    </div>


</template>