<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useGameStore } from '@/composables/useGameStore'
import { useAppwrite } from '@/composables/useAppwrite'
// import { useGameLogic } from '@/composables/useGameLogic'

const route = useRoute()
// const gameStore = useGameStore()
const { gameData, getGame, subscribeToGame, joinGame } = useAppwrite()
const { playerId, createPlayerId } = usePlayer()
// const gameLogic = useGameLogic()

const gameId = route.params.id as string
const playerName = ref('')
const loading = ref(true)

onMounted(async () => {
    try{
        gameData.value = await getGame(gameId)
        loading.value = false
    } catch (error) {
        console.error('Error fetching game:', error)
        loading.value = false
    }
    
    if (gameData?.value?.player2) {
        subscribeToGame(gameId)
    }
})


const onJoinGame = async () => {
    if (!playerId.value) {
        createPlayerId()
    }
    await joinGame(gameId, playerId.value)
    // Start the game
}

const copyToClipboard = () => {
    //get the full url and copy to clipboard
    const fullUrl = window.location.href

    navigator.clipboard.writeText(fullUrl)
}

// ... implement game logic, selection, and result display
</script>

<template>
    <div class="container mx-auto px-4 py-8" v-if="gameData">
        <h2 class="text-2xl font-bold mb-4">Rock Paper Scissors</h2>
        <template v-if="playerId !== gameData?.player1 && !gameData.player2">
            <UInput v-model="playerName" placeholder="Your Name" />
            <UButton @click="onJoinGame">Join Game</UButton>
        </template>
        <template v-else-if="!gameData.player2">
            <p>Waiting for second player...</p>
            <div class="">
                <div>Share the game URL with your friend or family</div>
                <UButton @click.prevent="copyToClipboard">Copy to Clipboard</UButton>
            </div>
        </template>
        <template v-else>
            <GameBoard/>
        </template>
        <!-- Implement game UI here -->
    </div>
    <div v-else-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <p>Game not found</p>
        <UButton to="/game/new">Create a new game</UButton>
    </div>
</template>