<script setup>
import GameBoard from './components/GameBoard.vue';
import Score from './components/Score.vue';
import {ref} from 'vue';

const componentBRef = ref(null)

// Hàm để gọi phương thức newGameBoard trong GameBoard
function handleTrigger() {
  if (componentBRef.value) {
    componentBRef.value.newGameBoard();  // Gọi phương thức newGameBoard của GameBoard
  }
}
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <div>
      <h2>2048 by <e>Ntuananh</e></h2>
    </div>
    <Score @trigger-action="handleTrigger" />
  </header>

  <main>
    <GameBoard ref="componentBRef" />
  </main>
</template>

<style scoped>
  header {
    line-height: 1.5;
    margin-bottom: 70px;
    position: relative;
  }

  header h2 {
    font-weight: bold;
    color: white;
  }

  header h2 e {
    color: #FEC32E;
  }
</style>
