<template>
    <div class="fade-animation" >
        <img class="logo-fade" src="../assets/2048_logo.png" alt="">
    </div>
</template>

<script setup>

</script>

<style>
    @keyframes FadeOutAni {
        0% {
            opacity: 1;
            /* display: block; */
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes LogoScale {
        0% {
            scale: 1;
        }
        30% {
            scale: 1;
        }
        100% {
            scale: 0;
        }
    }

    .fade-animation {
        background-color: antiquewhite;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
        z-index: 1;
        animation: FadeOutAni 2s forwards;
    }

    .logo-fade {
        animation: LogoScale 1.8s forwards;
    }
</style>