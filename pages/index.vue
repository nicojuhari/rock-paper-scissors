<script setup lang="ts">
  useHead({
    title: 'Play Rock Paper Scissors Online Free | No Sign-Up Required',
    meta: [
      { name: 'description', content: "Play Rock Paper Scissors Online for free! Challenge friends and family in this fun and fast multiplayer RPS game. No downloads - just click and play! " },
    ],
  })




</script>

<template>
  <div class="container">
    <div class="my-20 md:my-24 space-y-10 text-center">
      <h1 class="font-bold text-4xl md:text-5xl">
        <span class="block mb-2.5 text-[70%]">Play </span>
        <span class="text-blue-500">Rock </span>
        <span class="text-yellow-500">Paper </span>
        <span class="text-red-500">Scissors </span>
        <span class="block mt-2.5 text-[70%]">Online</span>
      </h1>
      <p class="sm:text-lg text-center text-gray-600">
          Rock Paper Scissors is a FREE online game.<br> Create a game and play with friends or challenge the computer anytime!
      </p>
    </div>
  <MainCTA />
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