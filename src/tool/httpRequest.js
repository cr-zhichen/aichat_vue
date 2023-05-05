//axios
import axios from 'axios';
import {setHistoryDetail, setHistoryList, setRole, setToken} from "./operateLocalStorage.js";

const config =
    {
        "Url": "https://aichat-back.ccrui.cn",
        "WsUrl": "wss://aichat-back.ccrui.cn",
        "Login": "/User/Login",
        "Register": "/User/Register",
        "ResetPassword": "/User/ResetPassword",
        "VenerateVerificationCode": "/User/VenerateVerificationCode",
        "GetUserInfo": "/User/ViewUserInformation",
        "UseCode": "/User/UseActivationCode",
        "Tourists": "/User/Tourists",
        "GetChatRecord": "/ApiRequest/GetChatRecord",
        "DeleteChatRecord": "/ApiRequest/DeleteChatRecord",
        "FindAllChatRecord": "/ApiRequest/FindAllHistoryRecord",
        "DeleteAllChatRecord": "/ApiRequest/DeleteAllChatRecord",
        "Chat": "/ApiRequest/Chat",
        "WS": "/ws"
    }


//游客登录
export async function touristsTask(start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.Tourists,
        '',
        data => {
            if (data.code === 0) {
                ok && ok(data.data);
                //将Token保存
                setToken(data.data.token);
                //将用户权限保存
                setRole(data.data.role);
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        }
    );
    end && end();
}

//登录
export async function loginTask(request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.Login,
        request,
        data => {
            if (data.code === 0) {
                ok && ok(data.data);
                //将Token保存
                setToken(data.data.token);
                //将用户权限保存
                setRole(data.data.role);
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        }
    );
    end && end();
}

//发送验证码
export async function sendCodeTask(email, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.VenerateVerificationCode + `?email=${email}`,
        '',
        data => {
            if (data.code === 0) {
                ok && ok();
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        }
    );
    end && end();
}

//重置密码
export async function resetTask(code, request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.ResetPassword + `?code=${code}`,
        request,
        data => {
            if (data.code === 0) {
                ok && ok(data.data);
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        }
    );
    end && end();
}

//注册
export async function registerTask(code, request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.Register + `?code=${code}`,
        request,
        data => {
            if (data.code === 0) {
                ok && ok(data.data);
                //将Token保存
                setToken(data.data.token);
                //将用户权限保存
                setRole(1);
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        }
    );
    end && end();
}

//获取用户信息
export async function getUserInfoTask(token, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.GetUserInfo,
        '',
        data => {
            if (data.code === 0) {
                config.Email = data.data.email;
                ok && ok(data.data);
            } else {
                err && err(data.msg);
            }
        },
        (code, message) => {
            err && err(message);
        },
        token
    );
    end && end();
}


//使用激活码
export async function useCodeTask(token, request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.UseCode,
        request,
        data => {
            if (data.code === 0) {
                ok && ok(data.data);
            } else {
                err && err(data.msg);
            }
            end && end();
        },
        (code, message) => {
            err && err(message);
            end && end();
        },
        token
    );
}

//获取聊天记录
export async function getChatRecordTask(token, request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.GetChatRecord,
        request,
        data => {
            if (data.code === 0) {
                setHistoryDetail(request.id, data.data);
                ok && ok(data.data);
            } else {
                err && err(data.msg);
            }
            end && end();
        },
        (code, message) => {
            err && err(message);
            end && end();
        },
        token
    );
}

//删除聊天记录
export async function deleteChatRecordTask(token, request, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.DeleteChatRecord,
        request,
        data => {
            if (data.code === 0) {
                ok && ok();
            } else {
                err && err(data.msg);
            }
            end && end();
        },
        (code, message) => {
            err && err(message);
            end && end();
        },
        token
    );
}

//删除所有聊天记录
export async function deleteAllChatRecordTask(token, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.DeleteAllChatRecord,
        '',
        data => {
            if (data.code === 0) {
                ok && ok();
            } else {
                err && err(data.msg);
            }
            end && end();
        },
        (code, message) => {
            err && err(message);
            end && end();
        },
        token
    );
}

//获取所有聊天记录
export async function findAllChatRecordTask(token, start, ok, err, end) {
    start && start();
    await httpHelp(
        config.Url + config.FindAllChatRecord,
        '',
        data => {
            if (data.code === 0) {
                setHistoryList(data.data);
                ok && ok(data.data);
            } else {
                err && err(data.msg);
            }
            end && end();
        },
        (code, message) => {
            err && err(message);
            end && end();
        },
        token
    );
}

let ws; // 在外部声明 WebSocket 实例

// ws 聊天方法
export async function wsChatTask(request, start, ok, err, tokenErr, close, end) {
    start && start();
    await wsHandler(
        config.WsUrl + config.WS,
        request,
        (data) => {
            if (data.length !== 0) {
                const chatTakeResponse = JSON.parse(data);

                switch (chatTakeResponse.route) {
                    case "chat":
                        if (chatTakeResponse.content === "[DONE]") {
                            end && end(chatTakeResponse);
                        } else {
                            ok && ok(chatTakeResponse);
                        }
                        break;
                    case "tokenErr":
                        tokenErr && tokenErr(chatTakeResponse.content);
                        break;
                    case "err":
                        err && err(chatTakeResponse.content);
                        break;
                }
            } else {
                err && err("服务器连接断开");
            }
        },
        err,
        close
    );
}

export async function wsHandler(url, data, ok, err, close) {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
        ws = new WebSocket(url); // 只在需要时初始化 WebSocket 实例

        ws.addEventListener("open", (event) => {
            ws.send(JSON.stringify(data));
        });

        ws.addEventListener("message", (event) => {
            ok && ok(event.data);
        });

        ws.addEventListener("error", (event) => {
            err && err(event);
            ws.close();
        });

        ws.addEventListener("close", (event) => {
            // close && close("服务器连接关闭");
            ws.close();
        });
    } else {
        // 如果已经连接，直接发送数据
        ws.send(JSON.stringify(data));
    }

    return new Promise((resolve, reject) => {
    });
}

//关闭ws
export async function wsCloseTask() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
    }
}

export async function httpHelp(url, data, ok, err, token = '') {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status !== 200) {
            err && err(response.statusText);
        }

        ok(response.data);
    } catch (error) {
        err && err(error.message);
    }
}
