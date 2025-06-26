<script setup lang="ts">
  useHead({
    title: 'Play Rock Paper Scissors Game Online - FREE',
    meta: [
      { name: 'description', content: "Play Rock Paper Scissors online with friends and family! Create a game, share the link, and settle debates in a fun way. Join now to make decisions together!" },
      { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
  })

  const { playerId } = usePlayer()
  const { createGame } = useAppwrite();

const onCreateGame = async () => {
  try {
    const gameId = await createGame(playerId.value)
    navigateTo(`/game/${gameId}`)
  } catch (error) {
    console.error(error)
    alert('Failed to create game')
  }
}


</script>

<template>
  <div class="container">
    <div class="mt-24 md:mt-32 space-y-2.5 text-center font-bold text-4xl md:text-5xl">
      <h1>
        <span class="block mb-4">Play </span>
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors </span>
        <span class="block mt-4">Online</span>
      </h1>
    </div>
    <div class="mt-16 mb-6 text-center flex flex-col md:flex-row gap-6 justify-center items-center">
      <UButton to="/one-player" class="w-48" title="You vs Computer" icon="i-ph-user" size="xl">You vs Computer</UButton>
      <UButton color="secondary" class="w-48 justify-center" icon="i-ph-users" size="xl" @click.prevent="onCreateGame">2 Players</UButton>
    </div>
    <div class="mt-6 text-center">
      <div class="text-center flex gap-2 justify-center">Create <span class="text-green-500">&rsaquo;</span> Share <span class="text-green-500">&rsaquo;</span> Play</div>
      <div class="text-sm mt-4 text-gray-600 text-center">No login or sign-up required. It's FREE!</div>
    </div>
    <HomeContent />
  </div>
</template>