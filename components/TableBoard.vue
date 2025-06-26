<script setup lang="ts">
    const props = defineProps<{
        yourChoices: number[]
        secondPlayerChoices: number[]
        isGameFinished: boolean
        isOnePlayer?: boolean
    }>()

    const controlers = {
        1: '🪨',
        2: '📃',
        3: '✂️',
    }

</script>

<template>
<table class="w-full table-fixed border-collapse player-selected-table">
    <thead>
        <tr>
            <th>You</th>
            <th v-if="!isOnePlayer" class="truncate">2nd Player</th>
            <th v-else class="truncate">Computer</th>
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
</template>