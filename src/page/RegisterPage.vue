<script setup>
import {globalState} from "../global/globalState.js";
import {reactive, ref} from "@vue/reactivity";
import {useGoToChat, useGoToLogin} from "../router/goToRouter.js";
import {ElLoading, ElNotification} from "element-plus";
import {registerTask, resetTask, sendCodeTask} from "../tool/httpRequest.js";

if (globalState.showLogin === true) {
    globalState.activeIndex = '3';
} else {
    globalState.activeIndex = '2';
}

const loading = ref(null);

const loginForm = reactive({
    username: '',
    email: '',
    verificationCode: '',
    password: ''
});

const loginFormRef = ref(null);

const loginRules = reactive(
    {
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'},
            {
                pattern: /^[a-zA-Z0-9_]{3,16}$/,
                message: '用户名只能包含数字、字母和下划线',
                trigger: 'blur'
            }
        ],
        email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '长度为 6 个字符', trigger: 'blur'},
            {
                pattern: /^[0-9]{6}$/,
                message: '验证码只能包含数字',
                trigger: 'blur'
            }
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'},
            {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?]*$/,
                message: '密码必须包含数字和字母，可以包含特殊字符',
                trigger: 'blur'
            }
        ]
    }
)

const Register = ref(async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //这里写注册逻辑
            registerTask(
                loginForm.verificationCode,
                {
                    userName: loginForm.username,
                    passwordMd5: loginForm.password,
                    email: loginForm.email
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
                        title: '注册成功',
                        message: '欢迎使用AICHAT',
                        type: 'success',
                    })
                    goToChat();
                },
                (o) => {
                    ElNotification({
                        title: '注册失败',
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

const Reset = ref(async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //这里写重置密码逻辑
            resetTask(
                loginForm.verificationCode,
                {
                    userName: loginForm.username,
                    passwordMd5: loginForm.password,
                    email: loginForm.email
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
                        title: '重置成功',
                        message: '请重新登录',
                        type: 'success',
                    })
                    goToLogin();
                },
                (o) => {
                    ElNotification({
                        title: '重置失败',
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


const sendCode = ref(() => {
    //这里写发送验证码逻辑
    sendCodeTask(
        loginForm.email,
        () => {
            snedCodeLoading.value = true;
            //倒计时
            sendCodeCountDown.value = 60;
            const timer = setInterval(() => {
                if (sendCodeCountDown.value <= 0) {
                    clearInterval(timer);
                    snedCodeLoading.value = false;
                } else {
                    sendCodeCountDown.value--;
                }
            }, 1000);
        },
        (o) => {
            ElNotification({
                title: '发送成功',
                message: '验证码已发送至邮箱',
                type: 'success',
            })
        },
        (o) => {
            ElNotification({
                title: '发送失败',
                message: o,
                type: 'error',
            })
            snedCodeLoading.value = false;
        },
        () => {
        }
    )
});

const goToLogin = useGoToLogin();
const goToChat = useGoToChat();

const sendCodeCountDown = ref(0);
const snedCodeLoading = ref(false);

</script>


<template>
    <div id="registerPage">
        <el-card class="box-card">
            <h2>注册 / 忘记密码</h2>
            <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginFormRef"
                    label-width="80px"
                    label-position="top"
                    size="large">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="验证码" prop="verificationCode">
                    <el-input v-model="loginForm.verificationCode" placeholder="请输入邮箱验证码"/>
                </el-form-item>
                <el-button type="primary" size="default" class="registerPage-form-button-code" :loading=snedCodeLoading
                           @click="sendCode()">
                    <template #loading>
                        <div class="custom-loading">
                            <svg class="circular" viewBox="-10, -10, 50, 50">
                                <path
                                        class="path"
                                        d=
                                            "M 30 15
                                            L 28 17
                                            M 25.61 25.61
                                            A 15 15, 0, 0, 1, 15 30
                                            A 15 15, 0, 1, 1, 27.99 7.5
                                            L 15 15"
                                        style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                                />
                            </svg>
                        </div>
                    </template>
                    {{ snedCodeLoading ? sendCodeCountDown + 's后可重新发送' : '获取验证码' }}
                </el-button>

                <el-form-item label="密码 / 新密码" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" link @click="goToLogin()">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Register(loginFormRef)" class="registerPage-form-button">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Reset(loginFormRef)" class="registerPage-form-button">
                        重置密码
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<style scoped>

.registerPage-form-button-code {
    width: 100%;
    margin-bottom: 10px;
    margin-top: -10px;
}

.registerPage-form-button {
    width: 100%;
    margin-bottom: -5px;
    margin-top: -10px;
}

.el-button .custom-loading .circular {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
}

.el-button .custom-loading .circular .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-button-text-color);
    stroke-linecap: round;
}


</style>