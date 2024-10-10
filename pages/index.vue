<script setup lang="ts">
  useHead({
    title: 'Rock Paper Scissors Online | Challenge Friends and Family',
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
      <div>Play</div>
      <h1>
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors</span>
      </h1>
      <div>Online</div>
    </div>
    <div class="mt-10 text-center text-lg">No login or sign-up required!<br> Create - Share - Play</div>
    <div class="text-center my-10">
      <button class="btn btn-primary" @click.prevent="onCreateGame">Create a Game</button>
    </div>
    <HomeContent />
  </div>
</template>