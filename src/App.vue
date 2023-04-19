<script setup>

import {globalState} from "./global/globalState.js";
import Menu from "./components/Menu.vue";

</script>

<template>


    <Menu/>
    <router-view/>

  <!--返回顶部-->
    <el-backtop :right="100" :bottom="100"/>

</template>

<style scoped>

</style>
