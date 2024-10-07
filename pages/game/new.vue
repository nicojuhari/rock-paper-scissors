<script setup lang="ts">
// import { useGameStore } from '~/composables/useGameStore'
import { useAppwrite } from '~/composables/useAppwrite'

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
    <UContainer class="py-8">
        <UForm :state="{ name, reason }" @submit="createGame">
        <UCard>
            <template #header>
                <h2 class="text-2xl font-bold">Create New Game</h2>
            </template>
                <UFormGroup label="Game Reason" name="reason">
                    <UInput v-model="reason" placeholder="Enter game reason" required />
                </UFormGroup>
                <template #footer>
                    <UButton type="submit" color="primary">Create Game</UButton>
                </template>
            </UCard>
        </UForm>
    </UContainer>
</template>