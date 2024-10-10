<script setup lang="ts">
    import { Confetti } from '../confetti'
    
    const { isGameFinished, compareChoices, gameWinner } = useGame()
    const { gameData } = useAppwrite()
    const { playerId } = usePlayer()
   
    const youWon = ref(0)
    const secondPlayerWon = ref(0)
    const gamesPlayed = ref(0)

    const winnerRef = ref<HTMLDivElement>()
    let audio: HTMLAudioElement

    watch(gameWinner, (newVal, oldVal) => {
        if(newVal === null) return
        gamesPlayed.value += 1
        if(newVal === 0) return // it's a draw
        if(newVal === playerId.value) {
            //winner
            youWon.value += 1;
            playVictorySound()
            showConfetti()
        }
        else secondPlayerWon.value += 1;
    })

    const whoIsLeader = computed(() => {
        let tempClass = 'text-gray-800'
        if (youWon.value > secondPlayerWon.value) tempClass = 'text-green-600'
        if (youWon.value < secondPlayerWon.value) tempClass = 'text-red-600'
        
        return tempClass
    })

    const showConfetti = () => {

        if(winnerRef.value) {
            const rect = winnerRef.value.getBoundingClientRect()
            const x = window.innerWidth / 2  // Horizontal center of the screen
            const y = rect.top + rect.height / 2  //

            const event = new MouseEvent('click', {
                'clientX': x,
                'clientY': y
            });

            winnerRef.value.dispatchEvent(event);
        }
    }

    const setupAudio = async () => {
        audio = new Audio('/cheer.mp3')
    }

    const playVictorySound = () => {
        if (audio) {
            audio.currentTime = 0 // Reset the audio to the beginning
            audio.play()
        }
    }

    onMounted(() => {    
        //prepare for confetti
        let confetti = new Confetti('winner-confetti')

        // Edit given parameters
        confetti.setCount(120);
        confetti.setSize(1);
        confetti.setPower(25);
        confetti.destroyTarget(false);

        setupAudio()
    })
   

    const controlers = {
        1: '🪨',
        2: '📃',
        3: '✂️',
    }

    const playerNumber = gameData?.value?.player1 === playerId.value ? 1 : 2

    const yourChoices = computed(() => {
        if (playerNumber == 1) return gameData.value?.player1Choices || []
        else return gameData.value?.player2Choices || []
    })

    const secondPlayerChoices = computed(() => {
        if (playerNumber == 1) return gameData.value?.player2Choices || []
        else return gameData.value?.player1Choices || []
    })

</script>
<template>
    <div class="w-full mt-10">
        <table class="w-full table-fixed border-collapse player-selected-table">
            <thead>
                <tr>
                    <th>You</th>
                    <th class="truncate">2nd Player</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in [0, 1, 2]">
                    <td>
                        <div class="flex items-center justify-center">
                            <template v-if="!isGameFinished">
                                <UiIconCheck class="w-6 h-6 transition-all duration-500"
                                    :class="yourChoices?.[item] ? 'text-green-600' : 'text-gray-200'" />
                            </template>
                            <template v-else>
                                <div class="h-6">
                                    {{ controlers[yourChoices[item] as keyof typeof controlers] }}
                                </div>
                            </template>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center justify-center">
                            <template v-if="!isGameFinished">
                                <UiIconCheck class="w-6 h-6 transition-all duration-500"
                                    :class="secondPlayerChoices?.[item] ? 'text-green-600' : 'text-gray-200'" />
                            </template>
                            <template v-else>
                                <div class="h-6">
                                    {{ controlers[secondPlayerChoices[item] as keyof typeof controlers] }}
                                </div>
                            </template>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center justify-center">
                            <div v-if="!isGameFinished" class="text-gray-200"> ? </div>
                            <div class="h-6" v-else>
                                <div v-if="0 === compareChoices(yourChoices?.[item], secondPlayerChoices[item])">
                                    =
                                </div>
                                <div v-if="1 === compareChoices(yourChoices?.[item], secondPlayerChoices[item]) ">
                                    <UiIconCheck class="w-6 h-6 text-green-600" />
                                </div>
                                <div v-if="2 === compareChoices(yourChoices?.[item], secondPlayerChoices[item]) ">
                                    <UiIconClose class="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex items-center justify-between px-1 py-1 text-sm">
            <div>Games Played: <span class="font-bold">{{ gamesPlayed }}</span></div>
            <div>Current Score: <span :class="whoIsLeader" class="font-bold">{{ youWon}} - {{ secondPlayerWon }}</span>
            </div>
        </div>
        <div ref="winnerRef" id="winner-confetti" class="h-0 w-0 invisible"></div>
    </div>
</template>


