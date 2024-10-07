<script setup lang="ts">

</script>

<template>
  <UContainer class="py-8">
    <UCard>
      <template #header>
        <h1 class="text-4xl font-bold">Rock Paper Scissors</h1>
      </template>
      <p class="text-xl mb-8">Challenge your friends to an epic battle!</p>
      <template #footer>
        <UButtonGroup>
          <UButton
            to="/game/new"
            color="primary"
          >
            Create New Game
          </UButton>
          <UButton
            to="/history"
            color="gray"
            variant="outline"
          >
            View History
          </UButton>
        </UButtonGroup>
      </template>
    </UCard>
  </UContainer>
</template>