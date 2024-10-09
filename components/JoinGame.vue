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
    <div class="text-center">
        <div class="my-6">This game has been created by your friend or not, JUST join(do) it.</div>
        <button @click="onJoinGame" class="btn btn-primary">Join</button>
    </div>
</template>
