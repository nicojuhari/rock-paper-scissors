<script setup lang="ts">
import { Confetti } from '../confetti'

interface Props {
  winnerId: null | number | string | undefined
  playerId: string
}

const props = defineProps<Props>()

const winnerRef = ref<HTMLDivElement>()
let audio: HTMLAudioElement

const setupAudio = async () => {
  audio = new Audio('/cheer.mp3')
}

const playVictorySound = () => {
  if (audio) {
    audio.currentTime = 0 // Reset the audio to the beginning
    audio.play()
  }
}

const showConfetti = () => {
  if (winnerRef.value) {
    const rect = winnerRef.value.getBoundingClientRect()
    const x = window.innerWidth / 2  // Horizontal center of the screen
    const y = rect.top + rect.height / 2  //

    const event = new MouseEvent('click', {
      'clientX': x,
      'clientY': y
    })

    winnerRef.value.dispatchEvent(event)
  }
}

// Watch for winner changes and trigger effects
watch(() => props.winnerId, (newVal, oldVal) => {
  if (newVal === null) return
  if (newVal === 0) return // it's a draw
  if (newVal === props.playerId) {
    // winner
    playVictorySound()
    showConfetti()
  }
})

onMounted(() => {    
  // prepare for confetti
  let confetti = new Confetti('winner-confetti')

  // Edit given parameters
  confetti.setCount(120)
  confetti.setSize(1)
  confetti.setPower(25)
  confetti.destroyTarget(false)

  setupAudio()
})
</script>

<template>
  <div ref="winnerRef" id="winner-confetti" class="h-0 w-0 invisible"></div>
</template> 