<script setup>
import {globalState} from "../global/globalState.js";
import {reactive, ref} from "@vue/reactivity";
import {useGoToChat, useGoToRegister} from "../router/goToRouter.js";
import {loginTask} from "../tool/httpRequest.js";
import {ElLoading, ElNotification} from "element-plus";

globalState.activeIndex = '2';

const goToChat = useGoToChat();

const loginForm = reactive({
    email: '',
    password: ''
});

const loginFormRef = ref(null);

const loginRules = reactive(
    {
        email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'},
            {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                message: '密码必须包含数字和字母',
                trigger: 'blur'
            }
        ]
    }
)

const loading = ref(null);
const login = ref(async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            loginTask(
                {
                    email: loginForm.email,
                    passwordMd5: loginForm.password
                },
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
                    goToChat();
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
            )
        }
    })
});

const goToRegister = useGoToRegister();

</script>


<template>
    <div id="loginPage">
        <el-card class="box-card">
            <h2>登录</h2>
            <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginFormRef"
                    label-width="80px"
                    label-position="top"
                    size="large">

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" link @click="goToRegister()">
                        注册
                    </el-button>
                    <el-button type="info" link @click="goToRegister()">
                        忘记密码
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login(loginFormRef)" class="loginPage-form-button">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<style scoped>

.loginPage-form-button {
    width: 100%;
}

</style>