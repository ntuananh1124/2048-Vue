<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Repeat2 } from 'lucide-vue-next';

const store = useStore();

const score = computed(() => store.state.score);
const highScore  = computed(() => store.state.highScore);

const emit = defineEmits(['trigger-action'])

function emitTrigger() {
    emit('trigger-action');
}
</script>

<template>
    <div class="score">
        <div class="highest-score">
            <div class="content">
                <span>BEST</span>
                <div class="yellow">{{ highScore }}</div>
            </div>
        </div>
        <div class="play-again">
            <button @click="emitTrigger"><Repeat2 /></button>
        </div>
        <div class="current-score">
            <div class="content">
                <span>SCORE</span>
                <div class="yellow">{{ 0 || score }}</div>
            </div>
        </div>
    </div>
</template>

<style>
    .score {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        align-items: center;
    }

    .play-again button {
        border: 2px dashed #FEC32E;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        outline: none;
        background-color: #112763;
        cursor: pointer;
    }

    .play-again button svg {
        color:#FEC32E;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 30px;
        background-color: #112763;
        padding-top: 4px;
        border: 2px solid #FEC32E;
    }

    .content span {
        font-weight: bold !important;
    }

    .yellow {
        color: #FEC32E !important;
        font-weight: bold !important;
    }

    .highest-score, .current-score {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .highest-score div {
        width: 80px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-radius: 15px; */
        color: rgb(255, 255, 255);
        font-weight: bold;
    }

    .current-score div {
        width: 80px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
    }
</style>