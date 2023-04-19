<script setup>
import {ref} from 'vue'
import {getThemeName, setTheme} from "../tool/themeChange.js";
import {useGoToChat, useGoToHome, useGoToLogin, useGoToUser} from "../router/goToRouter.js";
import {globalState} from "../global/globalState.js";
import {getRole} from "../tool/operateLocalStorage.js";

const goToHome = useGoToHome();
const goToChat = useGoToChat();
const goToUser = useGoToUser();
const goToLogin = useGoToLogin();

const handleSelect = (key, keyPath) => {
    switch (key) {
        case '0':
            goToHome()
            break
        case '1':
            goToChat()
            break
        case '2':
            goToUser()
            break
        case '3':
            goToLogin()
            break
        default:
            break
    }
}

globalState.showLogin = getRole() === '0';

</script>


<template>
    <el-menu
            :default-active="globalState.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
    >
        <el-menu-item index="0">AICHAT首页</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="1">聊天</el-menu-item>
        <el-menu-item index="2">用户</el-menu-item>
        <el-menu-item index="3" v-if="globalState.showLogin">登录</el-menu-item>

        <el-sub-menu index="4">
            <template #title>{{ getThemeName() }}</template>
            <el-menu-item @click="setTheme('light')">浅色模式</el-menu-item>
            <el-menu-item @click="setTheme('dark')">暗黑模式</el-menu-item>
            <el-menu-item @click="setTheme('auto')">跟随系统</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>


<style>
.flex-grow {
    flex-grow: 1;
}
</style>
