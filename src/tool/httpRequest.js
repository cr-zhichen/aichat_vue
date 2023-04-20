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

//ws聊天方法
export async function wsChatTask(token, request, start, ok, err, tokenErr, end) {
    start && start();
    await wsHandler(
        config.WsUrl + config.WS,
        request,
        data => {
            if (data.length !== 0) {
                const chatTakeResponse = JSON.parse(data);

                switch (chatTakeResponse.route) {
                    case 'chat':
                        if (chatTakeResponse.content === '[DONE]') {
                            end && end(chatTakeResponse);
                        } else {
                            ok && ok(chatTakeResponse);
                        }
                        break;
                    case 'tokenErr':
                        tokenErr && tokenErr(chatTakeResponse.content || 'Token错误');
                        break;
                    case 'err':
                        err && err(chatTakeResponse.content || '其他错误，请重试');
                        break;
                }
            } else {
                err && err('服务器连接断开');
            }
        },
        err,
        token
    );
}

export async function wsHandler(url, data, ok, err, token) {
    const ws = new WebSocket(url, {headers: {Authorization: 'Bearer ' + token}});

    ws.on('open', () => {
        ws.send(JSON.stringify(data));
    });

    ws.on('message', message => {
        ok && ok(message);
    });

    ws.on('error', error => {
        err && err(error.message);
    });

    ws.on('close', () => {
        // Connection closed
    });
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

