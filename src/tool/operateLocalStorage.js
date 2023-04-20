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

//将历史记录列表存储到本地
export function setHistoryList(historyList) {
    localStorage.setItem("historyList", JSON.stringify(historyList));
}

//从本地存储获取历史记录列表
export function getHistoryList() {
    let historyList = localStorage.getItem("historyList");
    if (!historyList) {
        return null;
    } else {
        return JSON.parse(historyList);
    }
}

//向历史记录列表中添加一条记录
export function addHistoryList(history) {
    let historyList = localStorage.getItem("historyList");
    if (!historyList) {
        historyList = [];
    } else {
        historyList = JSON.parse(historyList);
    }
    historyList.push(history);
    localStorage.setItem("historyList", JSON.stringify(historyList));
}

//判断历史记录列表是否为空
export function isHistoryListEmpty() {
    let historyList = localStorage.getItem("historyList");
    if (!historyList) {
        return true;
    } else {
        return false;
    }
}

// 将历史记录详细信息存储到本地
export function setHistoryDetail(id, historyDetail) {
    let historyDetailMap = localStorage.getItem("historyDetail");
    if (!historyDetailMap) {
        historyDetailMap = {};
    } else {
        historyDetailMap = JSON.parse(historyDetailMap);
    }

    // 修改了这里
    historyDetailMap[id] = historyDetail;

    localStorage.setItem("historyDetail", JSON.stringify(historyDetailMap));
}


//通过id获取历史记录详细信息
export function getHistoryDetail(id) {
    let historyDetail = localStorage.getItem("historyDetail");
    if (!historyDetail) {
        return null;
    } else {
        historyDetail = JSON.parse(historyDetail);
        return historyDetail[id];
    }
}

//判断历史记录详细信息是否为空
export function isHistoryDetailEmpty(id) {
    let historyDetail = localStorage.getItem("historyDetail");
    if (!historyDetail) {
        return true;
    } else {
        historyDetail = JSON.parse(historyDetail);
        if (historyDetail[id]) {
            return false;
        } else {
            return true;
        }
    }
}

//通过id删除历史记录详细信息
export function deleteHistoryDetail(id) {

    //从historyDetail中删除对应的id
    let historyDetail = localStorage.getItem("historyDetail");
    if (!historyDetail) {
    } else {
        historyDetail = JSON.parse(historyDetail);
        delete historyDetail[id];
        localStorage.setItem("historyDetail", JSON.stringify(historyDetail));
    }

    //从historyList中删除对应的id
    let historyList = localStorage.getItem("historyList");
    if (!historyList) {
    } else {
        historyList = JSON.parse(historyList);
        for (let i = 0; i < historyList.length; i++) {
            if (historyList[i].id == id) {
                historyList.splice(i, 1);
                localStorage.setItem("historyList", JSON.stringify(historyList));
            }
        }
    }
}

//删除历史记录本地缓存
export function clearHistory() {
    localStorage.removeItem("historyList");
    localStorage.removeItem("historyDetail");
}

//删除全部本地存储
export function clearAll() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("historyList");
    localStorage.removeItem("historyDetail");
    globalState.showLogin = false;
}