<script setup>
import {ref} from 'vue'
import {getThemeName, setTheme} from "../tool/themeChange.js";
import {useGoToChat, useGoToHome, useGoToUser} from "../router/goToRouter.js";

const goToHome = useGoToHome();
const goToChat = useGoToChat();
const goToUser = useGoToUser();

const activeIndex = ref('1')
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
            break
        default:
            break
    }

}
</script>


<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
    >
        <el-menu-item index="0">AICHAT首页</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="1">聊天</el-menu-item>
        <el-menu-item index="2">用户</el-menu-item>

        <el-sub-menu index="3">
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
