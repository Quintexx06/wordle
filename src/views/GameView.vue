<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'

const colAmount = ref(5);
const filledRow = ref(-1);
const lettersArr = ref(Array.from({ length: colAmount.value }, () => Array(5).fill("")));

function endGame(){
  console.log("End Game Anims");
}

onMounted(() =>{

  const gameContent = document.getElementById('game-content');

  //Input Row Creation
  for (let x = 0; x < colAmount.value; x++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    //Input Element Creation
    for (let i = 0; i < colAmount.value; i++) {
      const inputElement = document.createElement('input');
      inputElement.setAttribute("id", "input"  + "-" + x + "-" + i)
      inputElement.setAttribute("autocomplete", "off")
      inputElement.classList.add('input');

      inputElement.addEventListener("input", () => {
        if (inputElement.value.length > 1) {
          inputElement.value = inputElement.value.slice(0, 1);
        }
        inputElement.value = inputElement.value.toLocaleUpperCase();
        if (!lettersArr.value[x])  lettersArr.value[x] = [];

        lettersArr.value[x][i] = inputElement.value.trim();
        console.log(lettersArr.value);

        //Switch to next Input after Input
        if(x == 4 && i == 4){
          return endGame();
        }

        for (let index = 0; index < lettersArr.value[filledRow.value + 1].length + 1; index++) {

          let currentRow = filledRow.value + 1;
          if(index == colAmount.value){
            currentRow = x + 1;
            index = 0;
          }

          const input = lettersArr.value[currentRow][index];
          if (input === "") {
            const nextFocusInput = document.getElementById('input-' + (currentRow) + "-" + index);
            nextFocusInput.focus();
            break;

          }
        }

      });

      rowElement.appendChild(inputElement);
    }

    gameContent.appendChild(rowElement);
  }


  watch(() => filledRow.value,() => {
    lettersArr.value[filledRow.value].forEach((letterInput, index) => {

      const inputField = document.getElementById('input-' + (filledRow.value) + "-" + index);
      inputField.disabled = true  ;
    })
  });

  watch(
    () => lettersArr.value,
    (newlettersArr) => {
      newlettersArr.forEach((row, rowIndex) => {
        if (filledRow.value < rowIndex && row.length === colAmount.value && row.every((val) => val != "")) {
          console.log(`Row ${rowIndex} is completely filled  and not empty!`);
          filledRow.value = rowIndex;

          for (let i = 0; i < colAmount.value; i++) {

            const wordOfTheDay = "HELLO";
            const inputElement = document.getElementById('input-' + filledRow.value + "-" + (i));
            const inputLetter = newlettersArr[filledRow.value][i];
            const inputStatus = ref("incorrect");

            if(wordOfTheDay.includes(inputLetter)) {
              if(!wordOfTheDay[i].includes(inputLetter)){
                inputStatus.value = "misplaced";
              }
              else{
                inputStatus.value = "correct";
              }
            }

            inputElement.classList.add(inputStatus.value);
          }
        }
      });
    },
    { deep: true }
  );

  //Quit shake Animation
  document.querySelectorAll(".quit-btn").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.fromTo(
        el,
        { x: "-10" },
        {
          x: "10",
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(el, { x: 0, duration: 0.2, ease: "power1.out" });
          },
        });
    });

  });
  return {
    lettersArr,
  };
});

</script>

<template>
  <main>

    <h1 class="text-center headline">Guess Now</h1>

    <div class="container">
      <div id="game-content" class="col mt-12">

    </div>
      <div class="end-container">
        <router-link class="quit-btn" to="/">Quit Game</router-link>

      </div>
  </div>


    <div class="counter">
      24.223s
    </div>
    <img src="../assets/startView/shape_1.svg" draggable="false" class="shape shape-1" alt="Shape 1">
    <img src="../assets/startView/shape_2.svg" draggable="false" class="shape shape-2" alt="Shape 2">
  </main>
</template>

<style scoped>

.counter{
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  border-bottom-left-radius: 30px;
  border-left: #46bae4 2px solid;
  border-bottom: #46bae4 2px solid;

  font-size: 30px;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
}
.col{
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/*noinspection ALL*/
:deep(.input){
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

/*noinspection ALL*/
:deep(.input:focus){
  border: 0.04em solid #5482ac;
  background: #ebf5ff;
}

/*noinspection ALL*/
:deep(.input.correct){
  border: 0.04em solid #2ad394;
  background: #c8f8e6;
}

/*noinspection ALL*/
:deep(.input.incorrect){
  border: 0.04em solid #ed4040;
  background: #f4cbcb;
}

/*noinspection ALL*/
:deep(.input.misplaced){
  border: 0.04em solid #eda840;
  background: #f4e2cb;
}




/*noinspection ALL*/
:deep(.row){
  display: flex;
  justify-content: center;
  gap: 15px;

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
  animation: zoom-out-shape-1-anim ease-in-out 1s forwards;
  bottom: 0;
  right: 0;
}
.shape-2{
  width: 450px;
  animation: zoom-out-shape-2-anim ease-in-out 1s forwards;
  top: 0;
  left: 0;
}

.end-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.quit-btn{
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

  &:hover{
    color: #000000;

    background: rgba(221, 144, 144, 0.35);
  }
}

</style>
