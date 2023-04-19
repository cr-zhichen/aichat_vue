<script setup>

import {globalState} from "./global/globalState.js";
import Menu from "./components/Menu.vue";

</script>

<template>

  <!--  |-->
  <!--    <router-link to="/">首页</router-link>-->
  <!--  |-->
  <!--    <router-link to="/chat">聊天</router-link>-->
  <!--  |-->
  <!--    <router-link to="/user">用户</router-link>-->
  <!--  |-->
  <!--    <router-link to="/login">登录</router-link>-->
  <!--  |-->
  <!--    <router-link to="/register">注册</router-link>-->
  <!--  |-->
  <!--    <router-link to="/404">404</router-link>-->
  <!--  |-->

    <Menu/>
    <router-view/>

  <!--返回顶部-->
    <el-backtop :right="100" :bottom="100"/>

</template>

<style scoped>

</style>
