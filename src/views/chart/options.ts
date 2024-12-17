import { graphic } from 'echarts/core';
export const barOptions = {
    //xAxis — X 轴配置
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    //yAxis — Y 轴配置
    yAxis: {
        type: 'value',
    },
    //tooltip — 提示框配置
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    //color — 图表颜色配置
    color: ['#009688', '#f44336'],
    //series — 数据系列配置
    series: [        
        {
            //绿色的
            data: [150, 150, 150,150, 150, 150, 150],
            type: 'bar',
        },
        {
            data: [350, 230, 190, 120, 110, 230, 235],
            type: 'bar',
        },
    ],
};



export const lineOptions = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310],
        },
    ],
};

export const pieOptions = {
    title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};

export const wordOptions = {
    series: [
        {
            type: 'wordCloud',
            rotationRange: [0, 0],
            autoSize: {
                enable: true,
                minSize: 14,
            },
            textStyle: {
                fontFamily: '微软雅黑,sans-serif',
                color: function () {
                    return (
                        'rgb(' +
                        [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                        ].join(',') +
                        ')'
                    );
                },
            },
            data: [
                {
                    name: 'Vue',
                    value: 10000,
                },
                {
                    name: 'React',
                    value: 9000,
                },
                {
                    name: '图表',
                    value: 4000,
                },
                {
                    name: '产品',
                    value: 7000,
                },
                {
                    name: 'vue-manage-system',
                    value: 2000,
                },
                {
                    name: 'element-plus',
                    value: 6000,
                },
                {
                    name: '管理系统',
                    value: 5000,
                },
                {
                    name: '前端',
                    value: 4000,
                },
                {
                    name: '测试',
                    value: 3000,
                },
                {
                    name: '后端',
                    value: 8000,
                },
                {
                    name: '软件开发',
                    value: 6000,
                },
                {
                    name: '程序员',
                    value: 4000,
                },
            ],
        },
    ],
};

export const ringOptions = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        top: '5%',
        left: 'center',
    },

    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
        },
    ],
};






// 自定义折线图 心率变化趋势图
export const dashOpt1 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
        min: 0,  // 设置最小值
        max: 150,  // 设置最大值
        interval: 30,  // 设置间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            type: 'line',
            smooth: true,
            //更改数据的地方 绿色的线
            //我想的是计算平均值，然后设置为平均值
            data: [90, 90, 90, 90, 90, 90, 90],
        },
        {
            //更改数据的地方 红色的线
            type: 'line',
            smooth: true,
            data: [81, 122, 75, 83, 108, 130, 86],
        },
    ],
};




// 自定义折线图 血压变化趋势图
export const dashOpt12 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['07:00', '11:00', '15:00', '19:00', '23:00', '03:00', '07:00'],
    },
    yAxis: {
        type: 'value',
        min: 40,  // 设置最小值
        max: 180,  // 设置最大值
        interval: 20,  // 设置间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            type: 'line',
            smooth: true,
            //更改数据的地方 绿色的线
            //收缩压（上压）
            data: [110, 122, 135, 115, 108, 98, 114],
        },
        {
            //更改数据的地方 红色的线
            //舒张压（下压）
            type: 'line',
            smooth: true,
            data: [66, 85, 78, 81, 70, 67, 74],
        },
    ],
};







// 自定义折线图 血糖变化趋势图
export const dashOpt13 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['06:30', '08:00', '10:00', '12:00', '13:30', '15:00','17:00','19:00', '21:00','23:00'],
    },
    yAxis: {
        type: 'value',
        min: 4,  // 设置最小值
        max: 8,  // 设置最大值
        interval: 0.5,  // 设置间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            type: 'line',
            smooth: true,
            //更改数据的地方 绿色的线
            //血糖值 (mmol/L)
            data: [5.0, 7.8, 6.5, 5.2, 8.0, 6.3, 5.4 , 7.5, 6.1, 5.2],
        },
        {
            //更改数据的地方 红色的线
            //平均值
            type: 'line',
            smooth: true,
            data: [6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3],
        },
    ],
};







// 自定义折线图 某天的步数增长曲线
export const dashOpt14 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    },
    yAxis: {
        type: 'value',
        min: 0,  // 设置最小值
        max: 8000,  // 设置最大值
        interval: 500,  // 设置间隔
    },
    grid: {
        top: '2%',
        left: '2%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
    },
    color: ['#009688', '#f44336'],
    series: [
        {
            type: 'line',
            smooth: true,
            //更改数据的地方 绿色的线
            //步数
            data: [50, 200, 300, 450, 500, 600, 800, 1200, 1500, 1800, 2000, 2300, 2600, 2900, 3200, 3500, 3800, 4000, 4200, 4500, 4800, 5000, 5200, 5400] // 每小时的步数
        },
    ],
};






export const dashOpt2 = {
    legend: {
        bottom: '1%',
        left: 'center',
    },
    color: ['#3f51b5', '#009688', '#f44336', '#00bcd4', '#1ABC9C'],
    series: [
        {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            data: [
                { value: 1048, name: '1' },
                { value: 735, name: '2' },
                { value: 580, name: '3' },
                { value: 484, name: '4' },
                { value: 300, name: '5' },
            ],
        },
    ],
};




//这是地图设计
export const mapOptions = {
    tooltip: {
        trigger: 'item',
    },
    geo: {
        map: 'china',
        roam: false,
        emphasis: {
            label: {
                show: false,
            },
        },
    },
    visualMap: {
        show: false,
        min: 0,
        max: 100,
        realtime: false,
        calculable: false,
        inRange: {
            color: ['#d2e0f5', '#71A9FF'],
        },
    },
    series: [
        {
            geoIndex: 0,
            name: '地域分布',
            type: 'map',
            coordinateSystem: 'geo',
            map: 'china',
            data: [
                { name: '北京', value: 100 },
                { name: '上海', value: 100 },
                { name: '广东', value: 100 },
                { name: '浙江', value: 90 },
                { name: '江西', value: 80 },
                { name: '山东', value: 70 },
                { name: '广西', value: 60 },
                { name: '河南', value: 50 },
                { name: '河南', value: 40 },
                { name: '青海', value: 70 },
                { name: '河南', value: 30 },
                { name: '黑龙江', value: 20 },
                { name: '新疆', value: 20 },
                { name: '云南', value: 20 },
                { name: '甘肃', value: 20 },
            ],
        },
    ],
};
