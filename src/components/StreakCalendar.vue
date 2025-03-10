<script setup lang="ts">

import { useWordleStreakStore } from '@/stores/useWordleStreakStore.ts'
import { ref } from 'vue'

const wordleStreakStore = useWordleStreakStore();
const date = ref(wordleStreakStore.streakData);
const props = defineProps(['activeStreakCalendar'])
import { DatePicker } from 'primevue'
</script>

<template>


    <Transition >

      <div class="streak-container" v-if="props.activeStreakCalendar">

        <DatePicker
          :modelValue="date"
          inline
          selectionMode="multiple"
          class="calendar w-full sm:w-[30rem]"
        />
      </div>
    </Transition>


</template>

<style>

  h3{
    font-weight: 500;
  }

  .streak-container{
    position: absolute;
    top: 3%;
    right: 3%;

  }

  .calendar{
    margin-top: 12px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
