<template>
  <UApp>
  <div class="min-h-screen flex flex-col">
    <IncludesHeader />
    <main>
      <NuxtPage />
    </main>
    <IncludesFooter class="mt-auto" />
  </div>
</UApp>
</template>

<script setup>
useHead({
  meta: [
    { property: 'og:image', content: 'https://play-rps-online.netlify.app/og_rps.jpg' },
    { property: 'og:image:alt', content: 'Play Rock Paper Scissors Online' },
  ],
})
</script>
