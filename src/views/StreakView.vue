<script setup lang="ts">

const date = defineModel();


</script>

<template>

   <div class="about">
     <h1>This is the Streak Page</h1>
     <DatePicker v-model="date" inline showWeek class="calendar w-full sm:w-[30rem]" />

   </div>

</template>

<style>
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


  .calendar{
    margin-top: 12px;
    display: block;
    width: 500px;
    height: auto;
  }
</style>
