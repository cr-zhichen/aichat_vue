<script setup>

//接收路由参数
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {Delete, Promotion} from '@element-plus/icons-vue'

const route = useRoute()
const id = ref(route.params.id)

import {globalState} from "../global/globalState.js";
import {
    addHistoryList,
    clearAll,
    clearHistory,
    deleteHistoryDetail, getHistoryDetail,
    getHistoryList,
    getRole,
    getToken, isHistoryDetailEmpty,
    isHistoryListEmpty
} from "../tool/operateLocalStorage.js";
import {
    deleteAllChatRecordTask,
    deleteChatRecordTask,
    findAllChatRecordTask, getChatRecordTask,
    touristsTask, wsChatTask, wsCloseTask
} from "../tool/httpRequest.js";
import {ElLoading, ElMessage, ElNotification} from "element-plus";
import {useGoToChat, useGoToChatWithId, useGoToHome} from "../router/goToRouter.js";
import {scrollToBottom} from "../tool/scrollToBottom.js";

// 将marked 引入
import {marked} from 'marked';
// 引入代码高亮样式
// import 'highlight.js/styles/atom-one-dark.css'
import '../css/codeHighlight.css'

globalState.activeIndex = '1';

const loading = ref(null);
const goToChat = useGoToChat();
const goToUser = useGoToChat();
const goToHome = useGoToHome();

const goToChatWithId = useGoToChatWithId();

const dialogTableVisible = ref(false);

const historyList = ref([]);
const historyDetail = ref([]);

const questionInputDisabled = ref(false);

const role = ref("");

//vue加载完后执行
onMounted(() => {

    historyList.value = getHistoryList();

    //判断Token是否存在
    if (getToken() === null) {
        touristsLogin();
    } else {
        if (isHistoryListEmpty()) {
            findAllChatRecord();
        }
    }

    //判断是否有id
    if (id.value !== '') {
        getChatRecord(id.value);
    }

    role.value = getRole();

})

//游客登录方法
const touristsLogin = () => {
    //请求游客登录方法
    touristsTask(
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        },
        (o) => {
            ElNotification({
                title: '欢迎使用AICHAT',
                type: 'success',
            })
            globalState.showLogin = true;
            role.value = '0';
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
    );
}

//请求历史列表方法
const findAllChatRecord = () => {

    newChat();

    //清除本地历史记录
    clearHistory();
    historyList.value = [];

    //请求全部历史记录
    findAllChatRecordTask(
        getToken(),
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        },
        (o) => {
            historyList.value = getHistoryList();
        },
        (o) => {
            ElNotification({
                title: '获取历史记录失败',
                message: o,
                type: 'error',
            })
        },
        () => {
            loading.value.close();
        }
    )
}

//请求历史详情方法
const getChatRecord = (o) => {

    //查询历史详情
    historyDetail.value = getHistoryDetail(o);

    if (isHistoryDetailEmpty()) {
        getChatRecordTask(
            getToken(),
            {
                id: o
            },
            () => {
                loading.value = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            },
            (p) => {
                historyDetail.value = p;
            },
            (p) => {
                ElNotification({
                    title: '获取聊天记录失败',
                    message: p,
                    type: 'error',
                })
                newChat();
            },
            () => {
                loading.value.close();
            }
        )
    }
}

//删除全部历史记录
const delAllChatRecord = () => {
    clearHistory();
    deleteAllChatRecordTask(
        getToken(),
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        },
        (o) => {
            ElNotification({
                title: '删除全部历史记录成功',
                type: 'success',
            })
            historyList.value = [];
            newChat();
        },
        (o) => {
            ElNotification({
                title: '删除全部历史记录失败',
                message: o,
                type: 'error',
            })
        },
        () => {
            loading.value.close();
            dialogTableVisible.value = false;
        }
    )

}

//删除单条历史记录
const deleteChatRecord = (o) => {

    deleteChatRecordTask(
        getToken(),
        {
            id: o
        },
        () => {
            loading.value = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        },
        (p) => {
            ElNotification({
                title: '删除历史记录成功',
                type: 'success',
            })
            deleteHistoryDetail(o);
            if (id.value == o) {
                newChat();
            }
            historyList.value = getHistoryList();
        },
        (o) => {
            ElNotification({
                title: '删除历史记录失败',
                message: o,
                type: 'error',
            })
        },
        () => {
            loading.value.close();
        }
    )
}

//显示历史记录
const showRecords = (row) => {
    goToChatWithId(row.id);
    getChatRecord(row.id);
    dialogTableVisible.value = false;
    id.value = row.id;
}

const questionInput = ref("");
const isFirst = ref(true);

//发送消息
const sendMsg = () => {
    if (questionInput.value === "") {
        ElNotification({
            title: '请输入内容',
            type: 'error',
        })
        return;
    }

    if (questionInputDisabled.value) {
        ElNotification({
            title: '请等待服务器响应',
            type: 'error',
        })
        return;
    }

    //这里写发送消息的方法
    historyDetail.value.push({
        role: "user",
        content: questionInput.value,
    })

    wsChatTask(
        {
            data: {
                messages: questionInput.value,
                chatHistory: id.value == '' ? null : id.value
            },
            token: getToken()
        },
        () => {
            questionInputDisabled.value = true;
            historyDetail.value.push({
                role: "assistant",
                content: "等待服务器响应，请稍后...",
            })
            isFirst.value = true;
        },
        (o) => {
            if (isFirst.value) {
                isFirst.value = false;
                historyDetail.value[historyDetail.value.length - 1].content = o.content;
                return;
            }
            //获取historyDetail.value最后一条数据并修改
            historyDetail.value[historyDetail.value.length - 1].content += o.content;

            //将页面滚动到最底部
            setTimeout(scrollToBottom, 100);

        },
        (o) => {
            questionInputDisabled.value = false;
            ElNotification({
                title: '发送消息失败',
                message: o,
                type: 'error',
            })
            //删除最后一条数据
            historyDetail.value.pop();
        },
        (o) => {
            questionInputDisabled.value = false;
            ElNotification({
                title: '登录过期',
                message: o,
                type: 'error',
            })
            clearAll();
            goToHome();
        },
        (o) => {
            questionInputDisabled.value = false;
            ElNotification({
                title: o,
                type: 'error',
            })
            //删除最后一条数据
            historyDetail.value.pop();
        },
        (o) => {
            questionInputDisabled.value = false;
            goToChatWithId(o.historyId);
            id.value = o.historyId;

            if (role.value == '0') {
                return;
            }

            let preview = historyDetail.value[historyDetail.value.length - 2].content;
            //取前10个字符
            if (preview.length > 10) {
                preview = preview.substring(0, 10);
            }

            //判断historyList中是否存在该id 若不存在则添加
            for (let i = 0; i < historyList.value?.length; i++) {
                if (historyList.value[i].id === o.historyId) {
                    return;
                }
            }

            addHistoryList({
                id: o.historyId,
                preview: preview
            });

            historyList.value = getHistoryList();
        }
    )

    questionInput.value = "";
}

const newChat = () => {
    goToChat();
    historyDetail.value = [];
    id.value = '';
    questionInputDisabled.value = false;
    wsCloseTask();
}

const historyDetailIsEmpty = () => {
    if (historyDetail.value === null || historyDetail.value == '') {
        return true;
    } else {
        return false;
    }
}

//计算属性
const sortedHistoryList = computed(() => {
    return historyList.value.slice().sort((a, b) => b.id - a.id);
})

const copyToClipboard = (copyToClipboard) => {

    let isCopySelected = false;

    //如果用户选中了文本，则复制选中内容
    if (window.getSelection().toString() !== '') {
        copyToClipboard = window.getSelection().toString();
        isCopySelected = true;
    }

    navigator.clipboard.writeText(copyToClipboard).then(
        () => {
            ElMessage({
                message: isCopySelected ? '复制选中内容成功' : '复制成功',
                type: 'success',
            })
        },
        (err) => {
            ElMessage({
                message: isCopySelected ? '复制选中内容失败' : '复制失败',
                type: 'error',
            })
        }
    );
}

</script>


<template>
    <el-dialog v-model="dialogTableVisible" title="历史记录" id="chatPage-table">
        <el-table
                :data="sortedHistoryList"
                height="450"
                @cell-click="showRecords">

            <el-table-column property="id" label="记录id"/>
            <el-table-column property="preview" label="记录内容"/>

            <el-table-column width="80px">
                <template v-slot="scope">
                    <el-button
                            type="danger"
                            link
                            @click="deleteChatRecord(scope.row.id)">
                        <el-icon>
                            <Delete/>
                        </el-icon>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div id="chatPage-table-btns">
            <el-button type="danger" plain @click="delAllChatRecord()">删除全部</el-button>
            <el-button type="info" plain @click="findAllChatRecord()">重新同步</el-button>
        </div>

    </el-dialog>


    <div id="chatPage">

        <el-affix target="#chatPage" :offset="80">
            <el-alert title="游客用户每日限制10条消息，无法使用历史记录联想功能，限制回复字数" type="warning" center
                      :closable="true" v-if="role==='0'"/>

            <el-alert title="普通用户每日免费10条消息，每24小时重置提问次数，购买会员可增加次数" type="warning" center
                      :closable="true" v-if="role==='1'"/>
        </el-affix>

        <el-alert
                title="在下方输入框输入内容，使用回车键发送消息"
                type="info"
                center :closable="false"
                v-if="historyDetailIsEmpty()"
        />

        <div v-for="(val, key, index) in historyDetail">
            <el-card
                    shadow="hover"
                    class="box-card box-card-user"
                    v-if="val.role=='user'"
                    @click="copyToClipboard(val.content)">

                <div v-highlight v-html="marked(val.content)" class="markdown-body"></div>

            </el-card>

            <el-card
                    shadow="hover"
                    class="box-card box-card-rebot"
                    v-if="val.role=='assistant'"
                    @click="copyToClipboard(val.content)">

                <div v-highlight v-html="marked(val.content)" class="markdown-body"></div>

            </el-card>
        </div>

    </div>


    <div class="chatPage-affix-01">
        <div class="chatPage-affix-btns">
            <el-button type="primary" plain @click="newChat();">新建会话</el-button>
            <el-button type="info" plain @click="dialogTableVisible=true" v-if="role!=0">查看历史记录</el-button>
        </div>
    </div>

    <div class="chatPage-affix-02">
        <el-input
                v-model="questionInput"
                class="chatPage-affix-input"
                size="large"
                placeholder="请输入你的问题"
                :suffix-icon="Promotion"
                @keyup.enter.native="sendMsg"
        />
    </div>


</template>


<style scoped>

#chatPage-table-btns {
    text-align: center;
    margin-top: 30px;
}

.box-card-user {
    /*    背景颜色*/
    background-color: rgba(177, 180, 183, 0.05);
    /*    右侧对齐*/
    text-align: right;
}

.box-card-rebot {
    /*    背景颜色*/
    background-color: rgba(177, 180, 183, 0.05);
}

.box-card {
    margin-top: 10px;
    /*    宽度根据内容调整*/
    width: auto;

    /*    删除边框*/
    border: none;
}

.chatPage-affix-02 {
    position: fixed;
    bottom: 50px;
    right: 0;
    width: 100%;
    /*    内部元素居中*/
    display: flex;
    justify-content: center;
    align-items: center;
}

.chatPage-affix-01 {
    position: fixed;
    bottom: 110px;
    right: 0;
    width: 100%;
    /*    内部元素居中*/
    display: flex;
    justify-content: left;
    align-items: center;
}

</style>