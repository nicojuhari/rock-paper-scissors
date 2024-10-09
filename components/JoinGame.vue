<script setup lang="ts">

    const { playerId, playerName } = usePlayer()
    const { gameData, joinGame } = useAppwrite()

    const showInput = ref(false)

    const onJoinGame = async () => {
        try {
            if(gameData.value)
                gameData.value = await joinGame(gameData.value.$id, playerId.value, playerName.value)

        } catch (err) {
            console.error(err)
        }
    }

    onMounted(() => {
        showInput.value = playerName.value === '' ? true : false
    })
</script>
<template>
    <div class="text-center">
        <div class="my-6">This game has been created by <strong>{{ gameData?.player1Name }}</strong></div>
        <div v-if="showInput" class="my-6 space-y-4">
            <div>In order to join the game, please provide your display name and click the [join] button!</div>
            <InputName />
        </div>
        <button @click="onJoinGame" class="btn btn-primary">Join</button>
    </div>
</template>
