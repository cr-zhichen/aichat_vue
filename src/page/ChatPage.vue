<script setup>

//接收路由参数
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute()
const id = ref(route.params.id)

import {globalState} from "../global/globalState.js";
import {getToken} from "../tool/operateLocalStorage.js";
import {touristsTask} from "../tool/httpRequest.js";
import {ElLoading, ElNotification} from "element-plus";

globalState.activeIndex = '1';

const loading = ref(null);

//vue加载完后执行
onMounted(() => {
    //判断Token是否存在
    if (getToken() === null) {
        //请求游客登录方法
        touristsTask(
            () => {
                loading.value = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            },
            (o) => {
                ElNotification({
                    title: '登录成功',
                    message: '欢迎使用AICHAT',
                    type: 'success',
                })
            },
            (o) => {
                ElNotification({
                    title: '登录失败',
                    message: o,
                    type: 'error',
                })
            },
            () => {
                loading.value.close();
            }
        );
    }
})

</script>


<template>
    <p>ChatPage /{{ id }}</p>
</template>


<style scoped>

</style>