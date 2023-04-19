//从本地存储获取Token
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

//删除全部本地存储
export function clearAll() {
    localStorage.clear();
}