<script setup lang="ts">
  useHead({
    title: 'Play Rock Paper Scissors Game Online - Have Fun!',
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
    <div class="my-20 md:my-24 space-y-10 text-center">
      <h1 class="font-bold text-4xl md:text-5xl">
        <span class="block mb-2.5 text-[70%]">Play </span>
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors </span>
        <span class="block mt-2.5 text-[70%]">Game Online</span>
      </h1>
      <p class="text-lg text-center text-gray-600">
          Challenge a friend or play against a computer<br class="hidden md:block"> — no downloads, no sign-up required.
      </p>
    </div>
    <div class="mb-6 text-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
        <div class="bg-white p-6 rounded-lg border border-primary/30">
          <p class="font-bold text-lg">1 Player</p>
          <UButton to="/one-player" class="justify-center mt-6" icon="i-ph-game-controller-duotone" block title="Play Now" size="xl" label="Play Now"/>
        </div>
        <div class="bg-white p-6 rounded-lg border border-secondary/30">
          <p class="font-bold text-lg">2 Players</p>
          <UButton color="secondary" class="justify-center mt-6" icon="i-ph-users-duotone" block size="xl" @click.prevent="onCreateGame" label="Create a Game"/>
        </div>
      </div>
    </div>
  <HomeContent />
  <p class="text-sm text-center text-gray-500 mb-6">
      Read our 
      <NuxtLink to="/privacy" class="text-blue-600 underline" title="privacy policy">
        Privacy Policy
      </NuxtLink> 
      to learn how we protect your data.
    </p>
  </div>
</template>