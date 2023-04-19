<script setup>

import {globalState} from "./global/globalState.js";
import Menu from "./components/Menu.vue";

</script>

<template>


    <Menu id="app-menu"/>
    <router-view/>

</template>

<style scoped>

#app-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

</style>
