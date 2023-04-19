<script setup>

import { useGoToHome } from "../router/goToRouter.js";
const goToHome = useGoToHome();

</script>

<template>
    <div class="not-found-container">
        <el-row class="not-found-row">
            <el-col :span="24">
                <div class="not-found-image">
                    <!-- 这里可以添加一张404图片 -->
                    <!--<img src="@/assets/404_image.png" alt="404" />-->
                </div>
                <h1 class="not-found-title">404</h1>
                <h2 class="not-found-subtitle">抱歉，您访问的页面未找到</h2>
                <el-button type="primary" @click="goToHome">返回首页</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<style scoped>
.not-found-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
}

.not-found-row {
    text-align: center;
}

.not-found-image {
    width: 100%;
    max-width: 300px;
    margin-bottom: 2rem;
}

.not-found-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.not-found-subtitle {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
}
</style>
