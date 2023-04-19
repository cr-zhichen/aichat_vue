<script setup>

//接收路由参数
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const id = ref(route.params.id)

import {globalState} from "../global/globalState.js";

globalState.activeIndex = '1';

</script>


<template>
    <p>ChatPage /{{ id }}</p>
</template>


<style scoped>

</style>