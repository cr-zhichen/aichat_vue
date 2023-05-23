<script setup>
import {globalState} from "../global/globalState.js";
import {useGoToLogin, useGoToRegister} from "../router/goToRouter.js";
import {clearAll, getRole, getToken, setRole} from "../tool/operateLocalStorage.js";
import {getUserInfoTask, useCodeTask} from "../tool/httpRequest.js";
import {onMounted} from "vue";
import {ElLoading, ElNotification} from "element-plus";
import {ref} from "@vue/reactivity";
import "../css/box-card.css"

globalState.activeIndex = '2';

const goToLogin = useGoToLogin();
const goToRegister = useGoToRegister();
const loading = ref(null);

const activeCode = ref("");

const userInfo = ref({
    userName: '',
    email: '',
    role: '',
    remainingTimes: '',
    expireDate: ''
});

const start = () => {
    //未登录跳转到登录页面
    if (getToken() === null) {
        goToLogin();
        return;
    }

    //获取用户信息
    getUserInfoTask(
        getToken(),
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
        },
        (o) => {
            // ElNotification({
            //     title: '获取用户信息成功',
            //     message: '',
            //     type: 'success'
            // });
            let role = '';
            if (o.grade === -1) {
                role = '管理员';
            } else if (o.grade === 0) {
                role = '游客';
            } else if (o.grade === 1) {
                role = '注册用户';
            } else if (o.grade === 2) {
                role = 'VIP用户';
            }

            userInfo.value.userName = o.grade === 0 ? "游客用户" : o.userName;
            userInfo.value.email = o.grade === 0 ? "游客用户无邮箱" : o.email;
            userInfo.value.role = role;
            userInfo.value.remainingTimes = o.remainingTimes;
            userInfo.value.expireDate = o.expireDate;

            setRole(o.grade);

        },
        (o) => {
            ElNotification({
                title: '错误',
                message: o,
                type: 'error'
            });
            clearAll();
            //跳转到登录页面
            goToLogin();
        },
        () => {
            loading.value.close();
        }
    );
};

//vue加载完成后触发
onMounted(() => {
    start();
});

//激活账户
const activation = ref(() => {

    if (getRole() === '-1') {
        ElNotification({
            title: '错误',
            message: '管理员账户无需激活',
            type: 'error'
        });
        return;
    }

    useCodeTask(
        getToken(),
        {
            code: activeCode.value
        },
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
        },
        (o) => {
            ElNotification({
                title: '激活成功',
                message: '',
                type: 'success'
            });
            start();
        },
        (o) => {
            ElNotification({
                title: '错误',
                message: o,
                type: 'error'
            });
        },
        () => {
            loading.value.close();
        }
    )
});

//跳转到购买页面
const goToBuy = ref(() => {
    window.open("https://buy.ccrui.cn/");
});

//退出登录
const exitLogin = ref(() => {
    clearAll();
    goToLogin();
});


</script>


<template>
    <div id="userPage">
        <el-card
            shadow="hover"
            class="box-card">
            <h2>个人中心</h2>
            <p>用户名：{{ userInfo.userName }}</p>
            <p>邮箱：{{ userInfo.email }}</p>
            <p>用户权限：{{ userInfo.role }}</p>
            <p>剩余次数：{{ userInfo.remainingTimes }}</p>
            <p>到期时间：{{ userInfo.expireDate }}</p>
            <el-button
                    type="danger"
                    @click="exitLogin"
                    v-if="getRole() !== '0'"
                    plain>
                退出登录
            </el-button>
        </el-card>

        <el-card
            shadow="hover"
            class="box-card">
            <h2>账户激活</h2>
            <div v-if="getRole() !== '0'">
                <p>如需增加请求次数，请购买激活码并激活</p>
                <!--            输入框-->
                <el-input
                        placeholder="请输入激活码"
                        v-model="activeCode"
                        class="userPage-card2-input"></el-input>
                <br>
                <el-button type="primary" @click="activation" plain>激活</el-button>
                <el-button type="warning" @click="goToBuy" plain>购买激活码</el-button>
            </div>
            <div v-else>
                <p>游客用户需先登录或注册</p>
                <el-button type="primary" @click="goToLogin" plain>登录</el-button>
                <el-button type="warning" @click="goToRegister" plain>注册</el-button>
            </div>
        </el-card>
    </div>
</template>


<style scoped>

.box-card {
    margin-bottom: 20px;
    padding-bottom: 30px;
}

.userPage-card2-input {
    margin-bottom: 20px;
    width: 80%;
}

</style>