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
        <div class="my-10 space-y-2">
            <div>This game has been created by your friend.</div>
            <div>Simply click the button below to join and start
                playing!</div>
        </div>
        <button @click="onJoinGame" class="btn btn-primary">Join Now</button>
    </div>
</template>
