<script setup lang="ts">
    const { createPlayerName, playerName } = usePlayer()
    const inputVal = ref('')
    const inputError = ref(false)
    
    const sanitizedName = (val: string) => {
        return val.replace(/[^a-zA-Z0-9\s]/g, '')
    }

    const validateName = (val: string) => {

        if (val.length < 3 || val.length > 20) {
            inputError.value = true
            return false
        }

        inputError.value = false
        return true
    }

    watch(inputVal, (newVal,oldVal) => {
        
        inputVal.value = sanitizedName(newVal)
        
        if(validateName(inputVal.value)) {
           createPlayerName(inputVal.value)
           playerName.value = inputVal.value
        } else {
            createPlayerName('')
            playerName.value = ''
        }

    })



</script>
<template>
    <div class="my-10 flex flex-col gap-1.5">
        <label class="text-2xl">Display name <span class="text-red-600">*</span></label>
        <input v-model="inputVal" class="border rounded border-gray-500 p-2 text-3xl"
            :class="{ 'border-red-600': inputError }" maxlength="20" required />
        <div v-if="inputError" class="text-red-500">The name must be between 4 and 20 characters and contain only
            letters and numbers.</div>
        {{ playerName }}
    </div>
</template>


