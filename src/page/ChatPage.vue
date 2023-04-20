<script setup>

//接收路由参数
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Delete, Promotion} from '@element-plus/icons-vue'

const route = useRoute()
const id = ref(route.params.id)

import {globalState} from "../global/globalState.js";
import {
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
    touristsTask
} from "../tool/httpRequest.js";
import {ElLoading, ElNotification} from "element-plus";
import {useGoToChat, useGoToChatWithId} from "../router/goToRouter.js";

globalState.activeIndex = '1';

const loading = ref(null);
const goToChat = useGoToChat();

const goToChatWithId = useGoToChatWithId();

const dialogTableVisible = ref(false);

const historyList = ref([]);
const historyDetail = ref([]);


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

    //清除本地历史记录
    clearHistory();
    historyList.value = getHistoryList();

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
            historyList.value = getHistoryList();
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
    console.log(row);
    goToChatWithId(row.id);
    getChatRecord(row.id);
    dialogTableVisible.value = false;
}

const questionInput = ref("");
const sendMsg = () => {
    if (questionInput.value === "") {
        ElNotification({
            title: '请输入内容',
            type: 'error',
        })
        return;
    }
    questionInput.value = "";
}

</script>


<template>
    <el-dialog v-model="dialogTableVisible" title="历史记录" id="chatPage-table">
        <el-table
                :data="historyList"
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
                      :closable="true" v-if="getRole()==='0'"/>

            <el-alert title="普通用户每日免费10条消息，每24小时重置提问次数，购买会员可增加次数" type="warning" center
                      :closable="true" v-if="getRole()==='1'"/>
        </el-affix>

        <el-alert title="在下方输入框输入内容，使用回车键发送消息" type="info" center :closable="false"/>


        <el-card shadow="hover" class="box-card box-card-user">
            <span>问题测试</span>
        </el-card>

        <el-card shadow="hover" class="box-card box-card-rebot">
            <span>回答测试</span>
        </el-card>

    </div>


    <div class="chatPage-affix-01">
        <div class="chatPage-affix-btns">
            <el-button type="primary" plain @click="goToChat()">新建会话</el-button>
            <el-button type="info" plain @click="dialogTableVisible=true">查看历史记录</el-button>
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
    /*    边框颜色*/
    /*border-color: rgba(60, 144, 231, 0.53);*/
}

.box-card-rebot {
    /*    边框颜色*/
    border-color: rgba(22, 82, 145, 0.53);
}

.box-card {
    margin-top: 10px;
    /*    宽度根据内容调整*/
    width: auto;
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