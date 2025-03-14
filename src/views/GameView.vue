<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { useWordleStreakStore } from '@/stores/useWordleStreakStore.ts'

const colAmount = ref(5)
const filledRow = ref(-1)
const lettersArr = ref(Array.from({ length: colAmount.value }, () => Array(5).fill('')))
const wordOfTheDay = ref('')
const wonGameStatus = ref(2)
const wordleStreakStore = useWordleStreakStore();
const inputsVisible = ref(0);

const inputFieldsAnim = () => {
  const inputs = document.querySelectorAll(".input");
  if (inputs) {

    gsap.fromTo(
      inputs,
      { y: 50, opacity: 0 },
      {
        y: 0,

        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,

      }
    );

  }
}

const endScreenAnims = () => {
  const endScreenBackdrop = document.getElementById('end-screen-backdrop')
  const endScreen = document.getElementById('end-screen')
  gsap.fromTo(
    endScreenBackdrop,
    { height: 0, opacity: 0, y: 0 },
    { height: '100vh', opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
  )

  gsap.fromTo(
    endScreen,
    { opacity: 0, y: 20 },
    { opacity: 1, y: '-50%', duration: 1.8, ease: 'power3.out' },
  )
}

const circleAnims = () => {
  const circleDecor1 = document.getElementById('circle-decor')
  const circleDecor2 = document.getElementById('circle-decor-2')

  let customBackground1 = "linear-gradient(to right, rgb(55, 200, 151), rgb(127, 218, 187))";
  let customBackground2 = "linear-gradient(to right, rgb(55, 195, 200), rgb(127, 215, 218))";

  if(!wonGameStatus.value) {
    customBackground1 = "linear-gradient(to right, rgb(135, 55, 200), rgb(218, 127, 216))";
    customBackground2 = "linear-gradient(to right, rgb(216, 83, 83), rgb(218, 148, 127))";
  }


  gsap.fromTo(
    circleDecor1,
    { opacity: 0, x: 50, background: customBackground1  },
    { opacity: 1, x: 0, delay: 1, duration: 1.6, ease: 'power3.out', rotation: 180},
  )

  gsap.fromTo(
    circleDecor2,
    { opacity: 0, x: 120, rotation: 0, background: customBackground2 },
    { opacity: 1, x: 0, delay: 1, rotation: 360, duration: 1.8, ease: 'power3.out' },
  )
}

const showEndScreen = (wonGame: number) => {
  wonGameStatus.value = wonGame

  if(wonGame) {
    wordleStreakStore.updateStreak(new Date());
  }

  endScreenAnims()
  circleAnims()
}

const handleInput = (rowIndex : number, colIndex : number) => {
  if (!inputsVisible.value) {
    inputsVisible.value = 1;
  }
  const inputElement = ref(lettersArr.value[rowIndex][colIndex])

  if (inputElement.value.length > 1) {
    inputElement.value = inputElement.value.slice(0, 1)
  }



  inputElement.value = inputElement.value.toLocaleUpperCase()
  if (!lettersArr.value[rowIndex]) lettersArr.value[rowIndex] = []

  lettersArr.value[rowIndex][colIndex] = inputElement.value.trim()

  //Switch to next Input after Input
  if (rowIndex == 4 && colIndex == 4) return;

  for (let index = 0; index < lettersArr.value[filledRow.value + 1].length + 1; index++) {
    let currentRow = filledRow.value + 1

    if (index === colAmount.value) {
      currentRow = colIndex + 1
      index = 0
    }

    const input = lettersArr.value[currentRow][index]
    if (input === '') {
      const nextFocusInput = document.getElementById('input-' + currentRow + '-' + index)

      if(nextFocusInput){
        nextFocusInput.focus()
      }
      break
    }
  }
}

const checkLettersInRow = (newlettersArr: string[][]) => {
  const incorrectWord = ref(false)

  for (let i = 0; i < colAmount.value; i++) {
    const inputLetter = newlettersArr[filledRow.value][i]
    const inputStatus = ref('correct')

    if (!wordOfTheDay.value.includes(inputLetter)) {
      inputStatus.value = 'incorrect'
      incorrectWord.value = true
    } else if (wordOfTheDay.value[i] !== inputLetter) {
      //Misplaced Logic

      const indexOfMisplacedElement = wordOfTheDay.value.indexOf(inputLetter)
      const checkMissplacedinputElement = document.getElementById(
        'input-' + filledRow.value + '-' + indexOfMisplacedElement,
      )

      // Handle Duplicates better
      if (checkMissplacedinputElement && wordOfTheDay.value[indexOfMisplacedElement] == checkMissplacedinputElement.value) {
        inputStatus.value = 'incorrect'
      } else {
        inputStatus.value = 'misplaced'
      }

      incorrectWord.value = true
    } else {
      inputStatus.value = 'correct'
    }

    const inputElement = document.getElementById('input-' + filledRow.value + '-' + i);
    inputElement?.classList.add(inputStatus.value)

  }

  if (!incorrectWord.value) showEndScreen(1)
}

const getWordleWord = async () => {
  const response = await fetch("/store/wordle_words.json");
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.words.length);
  wordOfTheDay.value = data.words[randomIndex].toLocaleUpperCase();
  console.log("Word of the Day: " + wordOfTheDay.value);

}

onMounted(() => {
  getWordleWord();
  inputFieldsAnim();

  watch(
    () => filledRow.value,
    () => {
      setTimeout(() => {
        lettersArr.value[filledRow.value].forEach((_, index) => {
          const inputField = document.getElementById('input-' + filledRow.value + '-' + index)
          if(inputField) {
            inputField.disabled = true
          }
        })
      }, 50)

    },
  )

  watch(
    () => lettersArr.value,
    (newlettersArr) => {
      //Check Rows Filled Up

      newlettersArr.forEach((row, rowIndex) => {
        if (
          filledRow.value < rowIndex &&
          row.length === colAmount.value &&
          row.every((val) => val != '')
        ) {
          if (rowIndex == 4) {
            showEndScreen(0)
          }
          filledRow.value = rowIndex

          setTimeout(() => {
            checkLettersInRow(newlettersArr)
          }, 50)
        }
      })
    },
    { deep: true },
  )

  //Quit shake Animation
  document.querySelectorAll('.quit-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.fromTo(
        el,
        { x: '-10' },
        {
          x: '10',
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'bounce.inOut',
          onComplete: () => {
            gsap.to(el, { x: 0, duration: 0.2, ease: 'power1.out' })
          },
        },
      )
    })
  })
  return {
    lettersArr,
  }
})



</script>

<template>
  <main>
    <h1 class="text-center headline">Guess Now</h1>

    <div class="container">
      <div id="game-content" class="col mt-12">
        <div v-for="(row, rowIndex) in lettersArr" :key="rowIndex" class="row">
          <input
            v-for="(col, colIndex) in row"
            :key="col"
            :id="`input-${rowIndex}-${colIndex}`"
            autocomplete="off"
            v-model="lettersArr[rowIndex][colIndex]"
            class="input"
            :class="{'visible': inputsVisible}"
            @input="handleInput(rowIndex, colIndex)"
            type="text"
          />
        </div>
      </div>
      <div class="end-container">
        <router-link class="quit-btn" to="/">Quit Game</router-link>
      </div>
    </div>


    <img
      src="../assets/startView/shape_1.svg"
      draggable="false"
      class="shape shape-1"
      alt="Shape 1"
    />
    <img
      src="../assets/startView/shape_2.svg"
      draggable="false"
      class="shape shape-2"
      alt="Shape 2"
    />
  </main>
  <div v-show="wonGameStatus != 2" id="end-screen-backdrop" class="end-screen-backdrop"></div>
  <div v-show="wonGameStatus != 2" id="end-screen" class="end-screen">
    <div class="circle-decor-wrapper">
      <div class="circle-decor" id="circle-decor"></div>
      <div class="circle-decor-2" id="circle-decor-2"></div>
    </div>
    <h1 class="end-screen-title">Game Over</h1>
    <h3 v-show="!wonGameStatus">
      Sadly you've lost for today.<br>
      The Word was <b style="font-weight: bolder">{{wordOfTheDay}}</b>!
    </h3>
    <h3 v-show="wonGameStatus">Congrats you won for today</h3>

    <div class="flex-row">
      <router-link class="button" to="/">Back Home</router-link>
      <router-link class="button"  @click="wordleStreakStore.activateStreak" to="/"> Your Streak</router-link>
    </div>
  </div>
</template>

<style scoped>

.headline{
  position: relative;

}

.headline::after{
  animation: headline-circle-anim 0.6s linear 1 forwards;
  content: "";
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 70px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #2ad394;
}



.end-screen-title {
  font-weight: bold;
}

.circle-decor-wrapper {
  position: relative;
}

.circle-decor {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 25px;
}

.circle-decor-2 {
  content: '';
  display: block;
  position: absolute;
  bottom: -10px;
  left: 70px;

  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.end-screen {
  opacity: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.end-screen-backdrop {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  width: 100vw;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/*noinspection ALL*/
:deep(.input) {
  opacity: 0;
  width: 55px;
  height: 60px;
  text-align: center;
  outline: none;
  border: 0.04em solid #bcbcbc;
  border-radius: 6px;
  font-size: 2rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  line-height: 0;
  background: #fafcff;
  transition: 0.2s ease;
}

:deep(.input.visible){
  opacity: 1!important;
}


/*noinspection ALL*/
:deep(.input:focus) {
  border: 0.04em solid #5482ac;
  background: #ebf5ff;
  opacity: 1;

}

/*noinspection ALL*/
:deep(.input.correct) {
  border: 0.04em solid #2ad394;
  background: #c8f8e6;
  opacity: 1;
}

/*noinspection ALL*/
:deep(.input.incorrect) {
  border: 0.04em solid #ed4040;
  background: #f4cbcb;
  opacity: 1;
}

/*noinspection ALL*/
:deep(.input.misplaced) {
  border: 0.04em solid #eda840;
  background: #f4e2cb;
  opacity: 1;
}

/*noinspection ALL*/
:deep(.row) {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.mt-12 {
  margin-top: 12px;
}

.text-center {
  text-align: center;
}

.shape {
  position: absolute;
  height: auto;
}

.shape-1 {
  width: 270px;
  animation: zoom-out-shape-1-anim ease-in-out 1s forwards;
  bottom: 0;
  right: 0;
}
.shape-2 {
  width: 450px;
  animation: zoom-out-shape-2-anim ease-in-out 1s forwards;
  top: 0;
  left: 0;
}

.end-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quit-btn {
  text-decoration: none;
  text-align: center;
  display: inline;

  background: rgba(241, 241, 241, 0.35);
  color: #878787;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;

  padding: 8px 12px;
  margin-top: 24px;
  border-radius: 5px;
  transition: 0.2s ease;

  &:hover {
    color: #000000;

    background: rgba(221, 144, 144, 0.35);
  }
}

.flex-row {
  margin-top: 12px;
  display: flex;
  gap: 15px;
}
</style>
