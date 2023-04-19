//从本地存储获取Token
import {globalState} from "../global/globalState.js";

export function getToken() {
    let token = localStorage.getItem("token");
    if (!token) {
        return null;
    } else {
        return token;
    }
}

//将Token存储到本地
export function setToken(token) {
    localStorage.setItem("token", token);
}

//从本地存储获取用户权限
export function getRole() {
    let role = localStorage.getItem("role");
    if (!role) {
        return null;
    } else {
        return role;
    }
}

//将用户权限存储到本地
export function setRole(role) {
    localStorage.setItem("role", role);
}

//删除全部本地存储
export function clearAll() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    globalState.showLogin = false;
}