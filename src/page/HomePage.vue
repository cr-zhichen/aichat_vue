<script setup>
import {globalState} from "../global/globalState.js";

globalState.activeIndex = "0";
</script>

<template>
    <div id="homePage">
        <h2>欢迎使用AI Chat</h2>
        <p>
            本网站，接入ChatGPT API，可以快速体验ChatGPT
        </p>
        <p>
            点击下方按钮，即可快速体验ChatGPT
        </p>
        <el-button type="primary" plain size="large">快速体验</el-button>
        <el-button type="success" plain size="large">登录/注册</el-button>

    </div>
</template>

<style scoped>

#homePage {
    /*    竖直和水平居中*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*    内部文字居中*/
    text-align: center;
}

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
