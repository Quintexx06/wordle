<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from "gsap";
import AdvertBlock from '@/components/AdvertBlock.vue'
import StreakCalendar from '@/components/StreakCalendar.vue'
import { useWordleStreakStore } from '@/stores/useWordleStreakStore.ts'

const wordleStreakStore = useWordleStreakStore();

onMounted(() =>{

  const text = document.querySelector(".animated-heading");
  if (text) {
    const letters = text.textContent?.trim().split("");
    text.innerHTML = "";

    letters?.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.display = "inline-block";
      text.appendChild(span);
    });
    gsap.fromTo(
      text.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.1,
      }
    );
  }


  const button = document.querySelector(".confetti-button");
  let cooldown = false;

  button?.addEventListener("mouseover", () => {

    if (cooldown) { return }

    cooldown = true;
    setTimeout(() => {
      cooldown = false;
    }, 1200);

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "confetti";

      button.appendChild(particle);

      const randomAngle = Math.random() * Math.PI * 2;
      const randomDistance = 50 + Math.random() * 55;
      const randomX = Math.cos(randomAngle) * randomDistance;
      const randomY = Math.sin(randomAngle) * randomDistance;

      // Animate confetti
      gsap.fromTo(
        particle,
        {
          x: 50,
          y: 0,
          scale: 1,
          opacity: 1,
        },
        {
          x: randomX,
          y: randomY,
          scale: 0.5,
          opacity: 0,
          duration: 1.4,
          ease: "power1.out",
          onComplete: () => particle.remove(),
        }
      );
    }
  });

});
</script>

<template>
  <main>
    <div class="container">
      <div class="col">
        <h1 class="text-center animated-heading">
          Wordle&nbsp;Application
        </h1>
        <h2 class="text-center">Guess the Word of the Day!</h2>
      </div>
    </div>
    <div class="row mt-12" >
      <router-link to="play" class="button confetti-button">Start Playing</router-link>
      <router-link @click="wordleStreakStore.toggleStreak" :class="{active: wordleStreakStore.displayCalendar}" to="#" class="button">Your Streak</router-link>
    </div>
    <img src="../assets/startView/shape_1.svg" draggable="false" class="shape shape-1" alt="Shape 1">
    <img src="../assets/startView/shape_2.svg" draggable="false" class="shape shape-2" alt="Shape 2">
    <AdvertBlock />
    <StreakCalendar :activeStreakCalendar="wordleStreakStore.displayCalendar" />

  </main>

</template>

<style scoped>


  .row{
    display: flex;
    justify-content: center;
    gap: 15px;
    position: relative;
  }

  h1{
    font-size: 4rem;
    font-weight: bold;
  }

  .mt-12{
    margin-top: 12px;
  }

  .text-center{
    text-align: center;
  }

  .shape{
    position: absolute;
    height: auto;
  }
  .shape-1{
    width: 270px;
    bottom: 0;
    right: 0;
  }
  .shape-2{
    width: 450px;
    top: 0;
    left: 0;
  }

</style>
