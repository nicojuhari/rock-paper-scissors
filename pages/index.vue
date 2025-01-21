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
        <span class="block mb-4">Play</span>
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors</span>
        <span class="block mt-4">Online</span>
      </h1>
    </div>
    <div class="my-16 text-center text-lg flex gap-4 justify-center">Create <span class="text-green-500">&rsaquo;</span> Share <span class="text-green-500">&rsaquo;</span> Play</div>
    <div class="text-center">
      <button class="btn btn-primarys bg-green-600 text-white" @click.prevent="onCreateGame">Create a Game</button>
      <div class="text-sm mt-4 text-gray-600">No login or sign-up required. It's FREE!</div>
    </div>
    <HomeContent />
  </div>
</template>