<script setup>

import {useDark, useToggle} from '@vueuse/core'
import {globalState} from "./global/globalState.js";

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>

  |
    <router-link to="/">首页</router-link>
  |
    <router-link to="/chat">聊天</router-link>
  |
    <router-link to="/user">用户</router-link>
  |
    <router-link to="/login">登录</router-link>
  |
    <router-link to="/register">注册</router-link>
  |
    <router-link to="/404">404</router-link>
  |
    <router-view/>
    <div>
        <button @click="toggleDark()">
            <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
    </div>

</template>

<style scoped>

</style>
