<script setup>
import {globalState} from "../global/globalState.js";
import {useGoToChat, useGoToUser} from "../router/goToRouter.js";
import {getRole, getToken} from "../tool/operateLocalStorage.js";
import "../css/box-card.css"

globalState.activeIndex = "0";

const goToChat = useGoToChat();
const goToUser = useGoToUser();

</script>

<template>
    <div id="homePage">
        <el-card
                shadow="hover"
                class="box-card">
            <h2>欢迎使用AI Chat</h2>
            <p>
                本站已支持GPT3.5和GPT4.0双模型
            </p>
            <p>
                GPT4.0因成本原因，暂时采取30倍计费
            </p>
            <p>
                本站不保证GPT4.0模型可长期使用
            </p>
            <br>
            <div v-if="getToken()==null">
                <el-button type="primary" plain size="large" @click="goToChat">快速体验</el-button>
                <el-button type="success" plain size="large" @click="goToUser">登录/注册</el-button>
            </div>
            <div v-else>
                <el-button type="primary" plain size="large" @click="goToChat">进入聊天</el-button>
                <el-button type="success" plain size="large" @click="goToUser">个人中心</el-button>
            </div>
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
