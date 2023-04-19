<script setup>
import {globalState} from "../global/globalState.js";
import {reactive, ref} from "@vue/reactivity";
import {useGoToLogin} from "../router/goToRouter.js";

globalState.activeIndex = '2';

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
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                message: '密码必须包含数字和字母',
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
            console.log(loginForm)
        }
    })
});

const goToLogin = useGoToLogin();

</script>


<template>
    <div id="registerPage">
        <el-card class="box-card">
            <h2>注册</h2>
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
                <el-button type="primary" size="default" class="registerPage-form-button">
                    获取验证码
                </el-button>
                <el-form-item label="密码" prop="password">
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
            </el-form>
        </el-card>
    </div>
</template>


<style scoped>

.registerPage-form-button {
    width: 100%;
    margin-bottom: 10px;
}

</style>