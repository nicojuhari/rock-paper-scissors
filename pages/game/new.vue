<script setup lang="ts">

useHead({
    title: 'Create a Rock Paper Scissors Game Room',
    meta: [
        { name: 'description', content: "Create a Rock Paper Scissors Game Room and play online. Share the link, and settle debates in a fun way. Join now to make decisions together!" },
        { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
})

const appwrite = useAppwrite()
const { playerId, playerName } = usePlayer()

const onCreateGame = async () => {

    if (!playerName.value || !playerId.value) return

    try {
        const gameId = await appwrite.createGame(playerId.value, playerName.value)
        navigateTo(`/game/${gameId}`)
    } catch (error) {
        console.error(error)
        alert('Failed to create game')
    }
}


</script>

<template>
    <div class="container">
        <h1 class="mt-24 text-3xl font-bold text-center">Create a Game Room</h1>
        <InputName />
        <div class="text-center my-10">
            <button @click.prevent="onCreateGame" class="btn btn-outline" :disabled="!playerName">Create</button>
        </div>
    </div>
</template>