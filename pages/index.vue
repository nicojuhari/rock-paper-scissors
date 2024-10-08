<script setup lang="ts">
  useHead({
    title: 'Rock Paper Scissors Online | Challenge Friends and Family',
    meta: [
      { name: 'description', content: "Play Rock Paper Scissors online with friends and family! Create a game, share the link, and settle debates in a fun way. Join now to make decisions together!" },
      { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
  })

  const { playerName, playerId } = usePlayer()
  const { createGame } = useAppwrite();

const onCreateGame = async () => {
  try {
    const gameId = await createGame(playerId.value, playerName.value)
    navigateTo(`/game/${gameId}`)
  } catch (error) {
    console.error(error)
    alert('Failed to create game')
  }
}


</script>

<template>
  <div class="container">
    <div class="mt-24 md:mt-32 space-y-1 text-center font-bold">
      <div class="text-2xl">Play</div>
      <h1 class="text-4xl md:text-6xl">
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors</span>
      </h1>
      <div class="text-2xl pt-1.5">Online</div>
    </div>
    <div class="mt-10 text-center text-lg">No login or sign-up required! Simply set up your game room and invite
      friends and
      family to join in on the fun.</div>
    <div class="text-center my-6">
      <div v-if="playerName" class="text-center space-y-4">
        <div class="text-green-600">Welcome back <strong>{{ playerName }}</strong></div>
        <button class="btn btn-outline" @click.prevent="onCreateGame">Create another Game</button>
      </div>
      <NuxtLink v-else to="/game/new" class="btn btn-outline">Create a Game</NuxtLink>
    </div>
  </div>
</template>