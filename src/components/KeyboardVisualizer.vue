<script setup lang="ts">

import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next';

const activeKeyboard = ref(0);

const letterRowsArr = [
   ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä',],
  [ 'Y', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const handleKeyboardToggle = () => {
  activeKeyboard.value = !activeKeyboard.value; // Toggle the state

  const keyboardContainer = document.querySelector('.keyboard-container');
  const keyboardtoggleBtn = document.querySelector('.keyboard-toggle-btn');

  gsap.fromTo(keyboardtoggleBtn, {
    y: activeKeyboard.value ? 0 : 190,
    rotate: activeKeyboard.value ? 0 : 90,
  },{
    y: activeKeyboard.value ? 190 : 0,
    rotate: activeKeyboard.value ? 90 : 0,
    duration: 0.4,
    ease: "power1.out",
  });

  gsap.fromTo(keyboardContainer, {
    x: activeKeyboard.value ? -500 : 0,
  },{
    x: activeKeyboard.value ? 0 : -500,
    duration: 0.7,
    delay: 0.3,
    ease: "power2.out",
  });
};


onMounted( () => {


})

</script>

<template>
      <div class="keyboard-container" v-show="activeKeyboard">
          <div v-for="(row, rowIndex) in letterRowsArr" :key="rowIndex" class="letter-row-con">
            <span v-for="(letter, letterIndex) in row" :key="letterIndex" class="letter-con">
              {{letter}}
            </span>
          </div>
      </div>
      <div class="keyboard-toggle-btn" @click="handleKeyboardToggle">
        <ChevronRight color="#329972" size="24" />
      </div>

</template>

<style>

  h3{
    font-weight: 500;
  }

  .keyboard-container{
    position: absolute;
    top: 45%;
    left: 10px;
    background: #eafaf6;
    width: 380px;
    height: auto;
    padding: 40px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    border-radius: 15px;

  }


  .letter-con{
    min-width: 25px;
    height: auto;
    background: rgb(255, 255, 255);
    padding: 6px;
    margin: 5px;
    border-radius: 5px;
    font-weight: 500;
    color: #1a4a3a;
    border: 0.04em solid #329972;
  }

  .keyboard-toggle-btn{
    border-radius: 13px;
    background: #eafaf6;

    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
