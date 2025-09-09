<script setup lang="ts">

    const { playerId } = usePlayer()
    const { gameData, joinGame } = useAppwrite()

    const showInput = ref(false)

    const onJoinGame = async () => {
        try {
            if(gameData.value)
                gameData.value = await joinGame(gameData.value.$id, playerId.value)

        } catch (err) {
            console.error(err)
        }
    }

</script>
<template>
    <div class="text-center p-6 bg-white rounded-lg border border-gray-200/50 mt-6">
        <div class="my-10 text-lg">
            You're invited — play RPS online!
        </div>
        <UButton @click="onJoinGame" size="xl" label="Join" class="px-8" color="secondary" />
    </div>
</template>
