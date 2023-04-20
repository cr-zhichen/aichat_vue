import {useRouter} from "vue-router";
import {id} from "element-plus/es/locale/index";

//跳转到首页
export function useGoToHome() {
    const router = useRouter();

    return function () {
        router.push("/");
    };
}

//跳转到聊天界面
export function useGoToChat() {
    const router = useRouter();

    return function (ok) {
        router.push(`/chat`);
    };
}

//跳转到有id的聊天界面
export function useGoToChatWithId() {
    const router = useRouter();

    return function (id) {
        router.push(`/chat/${id}`);
    };
}


//跳转到用户界面
export function useGoToUser() {
    const router = useRouter();

    return function () {
        router.push("/user");
    };
}

//跳转到登录界面
export function useGoToLogin() {
    const router = useRouter();

    return function () {
        router.push("/login");
    };
}

//跳转到注册界面
export function useGoToRegister() {
    const router = useRouter();

    return function () {
        router.push("/register");
    };
}