<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg1">
                        <Location />
                    </el-icon>
                    <div class="card-content">
                        <div>身高</div>
                        <countup class="card-num color1" :end="170" />
                        <span class="unit">/cm</span> <!-- 添加单位 -->
                    </div>
                </el-card>
            </el-col> 


            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg2">
                        <Odometer />
                    </el-icon>
                    <div class="card-content">
                        <div>体重</div>
                        <countup class="card-num color2" :end="50" />
                        <span class="unit">/kg</span> <!-- 添加单位 -->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg3">
                        <Stopwatch />
                    </el-icon>
                    <div class="card-content">
                        <div>BMI</div>
                        <countup class="card-num color3" :end="15.42" />
                        <span class="unit"></span> <!-- 添加单位 -->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" body-class="card-body">
                    <el-icon class="card-icon bg4">
                        <User />
                    </el-icon>
                    <div class="card-content">
                        <div>年龄</div>
                        <countup class="card-num color4" :end="48" />
                        <span class="unit">/岁</span> <!-- 添加单位 -->
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">心率变化趋势图</p>
                        
                    </div>
                    <v-chart class="chart" :option="dashOpt1" />
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">血压变化趋势图</p>
                        
                    </div>
                    <v-chart class="chart" :option="dashOpt12" />
                </el-card>
            </el-col>
            
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="card-header">
                        <p class="card-header-title">血糖变化趋势图</p>
                        
                    </div>
                    <v-chart class="chart" :option="dashOpt13" />
                </el-card>
            </el-col>
        </el-row>




        <el-row :gutter="20">
            <el-col :span="7">
                <el-card shadow="hover" :body-style="{ height: '400px' }">
                    <div class="card-header">
                        <p class="card-header-title">日常活动时间线</p>
                        <p class="card-header-desc">最新的活动信息</p>
                    </div>
                    <el-timeline>
                        <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
                            <div class="timeline-item">
                                <div>
                                    <p>{{ activity.content }}</p>
                                    <p class="timeline-desc">{{ activity.description }}</p>
                                </div>
                                <div class="timeline-time">{{ activity.timestamp }}</div>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>



            <el-col :span="10">
                <el-card shadow="hover" :body-style="{ height: '400px' }">
                    <div class="card-header">
                        <p class="card-header-title">步数信息</p>
                        <p class="card-header-desc">某天的步数增长曲线</p>
                    </div>
                    <v-chart class="map-chart" :option="dashOpt14" />
                </el-card>
            </el-col>






            <!-- 健康指数 -->
            <!-- 健康指数 -->
            <el-col :span="7">
                <el-card shadow="hover" :body-style="{ height: '450px' }">
                    <div class="card-header">
                        <p class="card-header-title">健康指数</p>
                    </div>
                    <div>
                        <div class="rank-item" v-for="(rank, index) in ranks">
                            <div class="rank-item-avatar">{{ index + 1 }}</div>
                            <div class="rank-item-content">
                                <div class="rank-item-top">
                                    <div class="rank-item-title">{{ rank.title }}</div>
                                    <div class="rank-item-desc">百分比：{{ rank.value }}</div>
                                </div>
                                <el-progress
                                    :show-text="false"
                                    striped
                                    :stroke-width="10"
                                    :percentage="rank.percent"
                                    :color="rank.color"
                                />
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from '@/components/countup.vue';
import { onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { use, registerMap } from 'echarts/core';
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { dashOpt1,dashOpt12,dashOpt13,dashOpt14, dashOpt2, mapOptions } from './chart/options';
import chinaMap from '@/utils/china';
use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    LineChart,
    PieChart,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    MapChart,
]);
registerMap('china', chinaMap);




//日常活动
const activities = [
    {
        content: '早晨',
        description: '起床、梳洗，进行早晨散步，吃早餐',
        timestamp: '6:30 - 8:30 ',
        color: '#00bcd4',
    },
    {
        content: '上午',
        description: '从事自己感兴趣的爱好，保持愉悦心情',
        timestamp: '9:00 - 12:00',
        color: '#1ABC9C',
    },
    {
        content: '中午',
        description: '吃午餐，过后进行午间休息',
        timestamp: '12:00 - 14:00',
        color: '#3f51b5',
    },
    {
        content: '下午',
        description: '外出活动或散步，做一些放松的活动',
        timestamp: '14:00 - 17:00',
        color: '#f44336',
    },
    {
        content: '傍晚',
        description: '吃晚餐，进行轻松活动或家庭娱乐',
        timestamp: '17:00 - 20:00',
        color: '#009688',
    },
];







//健康百分比
//健康百分比
//健康百分比
const ranks = [
    {
        title: '星期一:',
        value: 55,
        percent: 55,
        //健康百分比
        color: '#f25e43',
    },
    {
        title: '星期二:',
        value: 68,
        percent: 68,
        color: '#00bcd4',
    },
    {
        title: '星期三:',
        value: 70,
        percent: 70,
        color: '#64d572',
    },
    {
        title: '星期四:',
        value: 90,
        percent: 90,
        color: '#e9a745',
    },
    {
        title: '星期五:',
        value: 72,
        percent: 72,
        color: '#009688',
    },
    {
        title: '星期六:',
        value: 77,
        percent: 77,
        color: '#DA70D6',
    },
    {
        title: '星期日:',
        value: 81,
        percent: 81,
        color: '#FFFF00',
    },
];
const assessHealthIndicators = () => {
    // 获取当前星期几的名称，例如 "星期一"、"星期二" 等
    let currentWeek = new Date().toLocaleString('zh-CN', { weekday: 'long' });
    // 将当前星期几的名称调整为符合 ranks 数据结构的格式（去掉最后的冒号）
    currentWeek = currentWeek.slice(0, 3) + currentWeek.slice(4); // 比如 "星期一" -> "星期一:"
    currentWeek = currentWeek + ':';
    
    // 找到与 currentWeek 相匹配的对象
    const currentRank = ranks.find(rank => rank.title === currentWeek);

    //90-100 正常，70-89 较为危险，else 非常危险
    const content1 = `今天是${currentWeek}<br>当前健康指数为：${currentRank.value}，状态正常`;
    const content2 = `今天是${currentWeek}<br>当前健康指数为：${currentRank.value}，状态较为危险，请引起重视!`;
    const content3 = `今天是${currentWeek}<br>当前健康指数为：${currentRank.value}，状态非常危险，请注意检查身体状况!`;

    // 如果找到匹配的元素，输出对应的 value，否则返回 undefined
    if (currentRank) {
        let message = '';
        let type: 'success' | 'warning' | 'error' ;  // 设置合法的 type 类型

        // 根据 currentRank.value 的值范围来设置弹窗消息和类型
        if (currentRank.value >= 90) {
            message = content1;
            type = 'success'; // 正常情况下使用绿色成功提示
        } else if (currentRank.value >= 70) {
            message = content2;
            type = 'warning'; // 70到90之间的值使用警告提示
        } else {
            message = content3;
            type = 'error'; 
        }

        // 显示弹窗
        ElMessageBox.alert(message, '健康提示', {
            confirmButtonText: 'OK',
            dangerouslyUseHTMLString: true, // 允许使用 HTML 字符串
            type: type, // 设置不同的类型以改变弹窗颜色
            customClass: 'custom-alert-box', // 自定义 CSS 类，方便进一步定制样式
            callback: (action) => {
                ElMessage({
                    type: 'info',
                    message: `action: ${action}`,
                });
            },
        });
    }
};

// 通过 onMounted 调用
onMounted(() => {
    assessHealthIndicators();
});
</script>









<!--下面是样式代码-->
<!--下面是样式代码-->
<!--下面是样式代码-->
<!--下面是样式代码-->
<style>
.card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;
}
.el-message-box {
    --el-messagebox-width: 800px !important;
    --el-font-line-height-primary: 200px !important;
}
.el-message-box__title {
    line-height: 20px !important;
}
.el-message-box__content {
    color: #e72020!important;
    font-size: 25px!important;
}
</style>
<style scoped>
.card-content {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    padding: 0 20px;
}

.card-num {
    font-size: 30px;
}

.card-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.bg1 {
    background: #2d8cf0;
}

.bg2 {
    background: #64d572;
}

.bg3 {
    background: #f25e43;
}

.bg4 {
    background: #e9a745;
}

.color1 {
    color: #2d8cf0;
}

.color2 {
    color: #64d572;
}

.color3 {
    color: #f25e43;
}

.color4 {
    color: #e9a745;
}

.chart {
    width: 100%;
    height: 400px;
}

.card-header {
    padding-left: 10px;
    margin-bottom: 20px;
}

.card-header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-header-desc {
    font-size: 14px;
    color: #999;
}

.timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #000;
}

.timeline-time,
.timeline-desc {
    font-size: 12px;
    color: #787878;
}

.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.rank-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f2f2f2;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
}

.rank-item-content {
    flex: 1;
}

.rank-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343434;
    margin-bottom: 10px;
}

.rank-item-desc {
    font-size: 14px;
    color: #999;
}
.map-chart {
    width: 100%;
    height: 350px;
}



/* 自定义弹窗的样式 */
.custom-alert-box {
    font-size: 16px; /* 增大字体 */
    font-weight: bold; /* 加粗字体 */
    text-align: center; /* 文字居中 */
    padding: 20px; /* 增加内边距 */
    border-radius: 8px; /* 圆角边框 */
    transition: all 0.3s ease; /* 加入平滑过渡效果 */
}

/* 针对不同类型的弹窗设置背景色和文字颜色 */
.custom-alert-box.success {
    background-color: #4CAF50; /* 绿色 */
    color: white;
}

.custom-alert-box.warning {
    background-color: #FF9800; /* 橙色 */
    color: white;
}

.custom-alert-box.error {
    background-color: #F44336; /* 红色 */
    color: white;
}

/* 添加弹窗显示的动画效果 */
.el-message-box__wrapper {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}



/* 如果要设置标题字体样式 */
.custom-alert-box .el-message-box__header {
    font-size: 18px; /* 标题字体大小 */
    font-weight: bold; /* 标题加粗 */
    color: #4CAF50; /* 标题字体颜色 */
}

/* 如果要设置按钮字体样式 */
.custom-alert-box .el-message-box__btns {
    font-size: 14px; /* 按钮字体大小 */
    color: #2196F3; /* 按钮颜色 */
}


.el-message-box .el-message-box__content {
    color: #f25e43;
    font-size: 30px;
}



</style>

