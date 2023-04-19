<script setup>
import {globalState} from "../global/globalState.js";
import {useGoToLogin} from "../router/goToRouter.js";
import {getToken} from "../tool/operateLocalStorage.js";

globalState.activeIndex = '2';

const goToLogin = useGoToLogin();

//未登录跳转到登录页面
if (getToken() === null) {
    goToLogin();
}

</script>


<template>
    <p>UserPage</p>
</template>


<style scoped>

</style>