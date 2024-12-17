<template>
    <div class="container">
        <div class="content-title">文件上传</div>
        <div class="plugins-tips">
            Element Plus自带上传组件 支持拖拽
        </div>
        <!-- 上传组件 -->
        <!-- 这里的action是上传的接口地址,jsonplaceholder.typicode.com 是一个假数据 API，用来模拟网络请求。multiple表示可以上传多个文件 -->
        <!-- 这里的on-change是上传成功后的回调函数，可以获取到上传的文件列表 -->
        <!-- 这里的drag表示可以拖拽上传 -->
        <el-upload class="upload-demo" drag action="http://jsonplaceholder.typicode.com/api/posts/" multiple
            :on-change="handle">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>

    </div>
</template>

<script setup lang="ts">
const handle = (rawFile: any) => {
    console.log(rawFile);
};
</script>

<style scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.upload-demo {
    width: 360px;
}
</style>
