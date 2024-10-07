<script setup lang="ts">
  useHead({
    title: 'Rock Paper Scissors Online | Challenge Friends and Family',
    meta: [
      { name: 'description', content: "Play Rock Paper Scissors online with friends and family! Create a game, share the link, and settle debates in a fun way. Join now to make decisions together!" },
      { name: 'keywords', content: 'rock paper scissors, game, play online' },
    ],
  })
</script>

<template>
  <div class="container">
    <div class="font-bold text-center mt-24 md:mt-32 text-4xl md:text-6xl">
      <div class="text-3xl">Play</div>
      <h1>Rock Paper Scissors <br>Game Online</h1>
    </div>
    <div class="my-6 text-center text-lg">No login or sign-up required!<br>Simply set up your game room and invite friends and
      family to join in on the fun.</div>
    <div class="text-center my-6">
      <NuxtLink to="/game/new" class="btn bg-orange-500 text-white">Create a Game</NuxtLink>
    </div>
  </div>
</template>