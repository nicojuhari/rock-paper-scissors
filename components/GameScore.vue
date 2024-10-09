
<script setup lang="ts">
    const { gameData } = useAppwrite()
    const { getGameScore } = useGame()


    
</script>
<template>
    <div class="border p-6 rounded-md grid grid-cols-3 items-center text-center bg-gray-100 border-gray-200">
        <div class="font-bold text-2xl truncate space-y-2">
            <div>{{ gameData?.player1Name }}</div>
            <div>0</div>
        </div>
        <div class="text-xl">:</div>
        <div class="font-bold text-2xl truncate space-y-2">
            <div>{{ gameData?.player2Name }}</div>
            <div>2</div>
        </div>
    </div>
</template>

