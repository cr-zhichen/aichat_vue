<script setup>
import {globalState} from "../global/globalState.js";
import {useGoToChat, useGoToUser} from "../router/goToRouter.js";

globalState.activeIndex = "0";

const goToChat = useGoToChat();
const goToUser = useGoToUser();

</script>

<template>
    <div id="homePage">
        <el-card class="box-card">
            <h2>欢迎使用AI Chat</h2>
            <p>
                本网站，接入ChatGPT API，可以快速体验ChatGPT
            </p>
            <p>
                点击下方按钮，即可快速体验ChatGPT
            </p>
            <el-button type="primary" plain size="large" @click="goToChat">快速体验</el-button>
            <el-button type="success" plain size="large" @click="goToUser">登录/注册</el-button>
        </el-card>

    </div>
</template>

<style scoped>

h2 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
}

p {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
}

</style>
