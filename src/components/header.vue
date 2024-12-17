<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="header-left">
            <img class="logo" src="../assets/img/logo.svg" alt="" />
            <div class="web-title">智享天年（父母端）</div>
            <div class="collapse-btn" @click="collapseChage">
                <el-icon v-if="sidebar.collapse">
                    <Expand />
                </el-icon>
                <el-icon v-else>
                    <Fold />
                </el-icon>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user-con">

                <!-- 主题设置按钮 -->
                <div class="btn-icon" @click="router.push('/theme')" >
                    <el-tooltip effect="dark" content="设置主题" placement="bottom">
                        <i class="el-icon-lx-skin"></i>
                    </el-tooltip>
                </div>

                <!-- 消息显示按钮 -->
                <div class="btn-icon" @click="router.push('/ucenter')">
                    <el-tooltip
                        effect="dark"
                        :content="message ? `有${message}条未读消息` : `消息中心`"
                        placement="bottom"
                    >
                        <i class="el-icon-lx-notice"></i>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>

                <!-- 全屏按钮 -->
                <div class="btn-icon" @click="setFullScreen">
                    <el-tooltip effect="dark" content="全屏" placement="bottom">
                        <i class="el-icon-lx-full"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <el-avatar class="user-avator" :size="30" :src="imgurl" />
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!--菜单设置“使用说明”-->
                    
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item command="alter">使用说明</el-dropdown-item>
                            <el-dropdown-item command="info">作者信息</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import imgurl from '../assets/img/img.jpg';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const username: string | null = localStorage.getItem('vuems_name');
const message: number = 2;

const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
    sidebar.handleCollapse();
};

onMounted(() => {
    if (document.body.clientWidth < 1500) {
        collapseChage();
    }
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
    if (command == 'loginout') {
        localStorage.removeItem('vuems_name');
        router.push('/login');
    } else if (command == 'user') {
        router.push('/ucenter');
    } else if (command == 'alter') {
        // 定义要展示的内容
        const content = `
            应用简介：<br>
            “智享天年”应用程序旨在为父母群体提供便捷的生活服务、健康管理和社交互动功能，帮助提升生活品质和幸福感。本应用通过先进的技术手段、智能化的数据管理，帮助父母群体更好地管理健康，享受安全和便捷的数字生活。<br>

            主要功能：<br>
            1. 健康管理：<br>
            - 自动记录和储存健康数据，如血压、血糖、心率、步数等。<br>
            - 健康数据生成趋势图表，帮助父母和子女清晰了解健康变化。<br>
            - 提供健康预警功能，当健康指标超出正常范围时，及时发送提醒。<br>

            2. 生活服务：<br>
            - 提供便捷的日常生活服务提示。<br>
            - 提供老年人专属服务推荐，例如养生、运动、饮食健康等内容。<br>

            3. 健康数据趋势分析：<br>
            - 根据健康数据自动生成趋势图表，帮助父母和子女了解健康变化趋势。<br>
            - 定期分析健康数据并提出健康建议，提醒父母保持健康生活方式。<br>

            产品特色：<br>
            1. 便捷的健康管理 <br>
            - 自动健康数据监测：该产品可以自动记录并存储父母的健康数据，如血压、血糖、心率、步数等，提供全面的健康管理。 <br>
            - 健康趋势图表：根据记录的健康数据生成趋势图表，帮助父母和子女清晰直观地了解健康变化，方便进行健康评估与决策。 <br>
            - 健康预警功能：当某项健康指标超出正常范围时，产品会及时向父母发送提醒，确保及时处理健康问题。 <br>
            2. 个性化生活服务 <br>
            - 智能推荐服务：根据父母的需求，提供个性化的生活服务推荐，帮助父母保持健康的生活方式。 <br>
            - 日常提醒功能：展示每天的日常活动线，避免遗忘。 <br>
            3. 简单易用的图形用户界面 <br>
            - 符合父母群体的操作习惯：界面设计简洁明了。通过清晰的按钮和指引，减少操作复杂性，帮助父母轻松上手。 <br>
            - 高对比度与放大功能：为了适应老年人视力需求，采用高对比度设计和可调节的字体大小，确保所有界面元素清晰可见。 <br>
        `;

        // 使用说明弹窗 内容更改
        ElMessageBox.alert(content , 
        '智享天年（父母端）应用程序使用说明:',         
        {
        // if you want to disable its autofocus
        // autofocus: false,
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
            callback: (action: Action) => {
            ElMessage({
                type: 'info',
                message: `action: ${action}`,
            })
            },
        })
    }else if (command == 'info'){
        //开发者信息
        const content = `开发者：ymnnb`;
        // 使用说明弹窗 内容更改
        ElMessageBox.alert(content , 
        '作者信息:',         
        {
        // if you want to disable its autofocus
        // autofocus: false,
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true,
            callback: (action: Action) => {
                ElMessage({
                    type: 'info',
                    message: `action: ${action}`,
                })
            },
        })
    }
};

const setFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.body.requestFullscreen.call(document.body);
    }
};
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    border-bottom: 1px solid #ddd;
}

.header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 100%;
}

.logo {
    width: 35px;
}

.web-title {
    margin: 0 40px 0 10px;
    font-size: 22px;
}

.collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.8;
    font-size: 22px;
}

.collapse-btn:hover {
    opacity: 1;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-icon {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--header-text-color);
    margin: 0 5px;
    font-size: 20px;
}

.btn-bell-badge {
    position: absolute;
    right: 4px;
    top: 0px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: var(--header-text-color);
}

.user-avator {
    margin: 0 10px 0 20px;
}

.el-dropdown-link {
    color: var(--header-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
<style>
.el-message-box {
    --el-messagebox-width: 683px !important;
    --el-font-line-height-primary: 30px !important;
}
.el-message-box__title {
    line-height: 20px !important;
}
.el-message-box__message p{
    line-height: 30px !important;
}
</style>
