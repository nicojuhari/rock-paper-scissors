<script setup lang="ts">
  const { playerId } = usePlayer()
  const { createGame } = useAppwrite();

const onCreateGame = async () => {
    try {
        const gameId = await createGame(playerId.value)
        navigateTo(`/2-player?gameId=${gameId}`)
    } catch (error) {
        console.error(error)
        alert('Failed to create game')
    }
    }
</script>

<template>
    <div class="mb-6 text-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
        <div class="bg-white p-6 rounded-lg border border-primary/30">
          <p class="font-bold text-lg">1 Player</p>
          <UButton to="/one-player" title="Play Rock Paper Scissors Online with a computer" class="justify-center mt-6" icon="i-ph-game-controller-duotone" block size="xl" label="Play Now"/>
        </div>
        <div class="bg-white p-6 rounded-lg border border-secondary/30">
          <p class="font-bold text-lg">2 Players</p>
          <UButton color="secondary" title="Create a 2-player game" class="justify-center mt-6" icon="i-ph-users-duotone" block size="xl" @click.prevent="onCreateGame" label="Create a Game"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>