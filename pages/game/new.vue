<script setup lang="ts">
// import { useGameStore } from '~/composables/useGameStore'
import { useAppwrite } from '~/composables/useAppwrite'

useHead({
    title: 'Create a Rock Paper Scissors Game Online',
    meta: [
        { name: 'description', content: "Create a Rock Paper Scissors Game online. Share the link, and settle debates in a fun way. Join now to make decisions together!" },
        { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
})

// const gameStore = useGameStore()
const appwrite = useAppwrite()
const { playerId, createPlayerId } = usePlayer()


const name = ref('')
const reason = ref('')

const createGame = async () => {

    if (!playerId.value) {
        createPlayerId()
    }

    try {
        const gameId = await appwrite.createGame(playerId.value, reason.value)
        console.log('ddd',gameId)
        navigateTo(`/game/${gameId}`)
    } catch (error) {
        console.error(error)
        alert('Failed to create game')
    }
}
</script>

<template>
    <div class="container">
        <h1 class="mt-24 text-3xl font-bold text-center">Create Your Game Room</h1>
        <div class="my-10 flex flex-col gap-1.5">
            <label class="text-2xl">What's at Stake?<span class="text-sm text-gray-500"> (optional):</span></label>
            <input v-model="reason" class="border rounded border-gray-500 p-2 text-3xl" maxlength="200" />
            <div class="text-gray-500">Enter the reason for your game (e.g., "Who washes the car?" or "What movie to watch tonight?")</div>
        </div>
        <div class="text-center my-10">
            <button @click.prevent="createGame"
                class="btn bg-orange-500 text-white">Create</button>
        </div>
    </div>
</template>