<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useGameStore } from '@/composables/useGameStore'
//  from '@/composables/useAppwrite'
// import { useGameLogic } from '@/composables/useGameLogic'

const route = useRoute()
// const gameStore = useGameStore()
const { gameData, getGame, subscribeToGame, joinGame, deleteGame } = useAppwrite()
const { playerId, createPlayerId } = usePlayer()

// const gameLogic = useGameLogic()

const gameId = route.params.id as string
const playerName = ref('')
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


const onJoinGame = async () => {
    try {

        if (!playerId.value) {
            createPlayerId()
        }
        gameData.value = await joinGame(gameId, playerId.value)
    
    } catch (err) {
        console.error(err)
    }
}

const copyToClipboard = () => {
    //get the full url and copy to clipboard
    const fullUrl = window.location.href

    navigator.clipboard.writeText(fullUrl)
}

const onDeleteGame = async () => {
    if (gameData?.value?.$id) await deleteGame(gameData.value.$id)
}

// ... implement game logic, selection, and result display
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <template v-if="gameData">
            <h2 class="text-2xl font-bold mb-4 text-center">Game Room</h2>

            <template v-if="playerId !== gameData?.player1 && !gameData.player2">
                <div class="mb-6" v-if="gameData?.reason">
                    In this game will be decided: <strong>{{ gameData.reason }}</strong>
                </div>
                <button @click="onJoinGame" class="btn bg-blue-600 text-white">Join this Game</button>
            </template>
            <template v-else-if="!gameData.player2">
                <div class="my-24 space-y-8 text-center">
                    <UiLoading class="h-10 w-10 text-gray-300 text-center mx-auto" />
                    <p class="text-4xl">Waiting for the second player...</p>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>Share the game room URL with your friends or family</div>
                    <div>
                        <button @click.prevent="copyToClipboard" class="btn border text-blue-600 border-blue-600">Copy to
                            Clipboard</button>
                    </div>
                </div>
            </template>
            <template v-else>
                <GameBoard />
            </template>
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
                <nuxt-link to="/game/new" class="btn bg-orange-500 text-white">Create a new
                    game</nuxt-link>
            </div>
        </div>
        <div v-if="gameData && gameData.player1 == playerId" class="my-10">
            <button @click.prevent="onDeleteGame" class="btn border border-red-600 text-red-600">Delete the
                game</button>
        </div>

        <!-- Implement game UI here -->
    </div>


</template>