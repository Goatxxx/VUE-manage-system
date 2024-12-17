<template>
    <div class="container">
        <el-radio-group class="mgb20" v-model="labelPosition">
            <el-radio-button value="left">Left</el-radio-button>
            <el-radio-button value="right">Right</el-radio-button>
            <el-radio-button value="top">Top</el-radio-button>
        </el-radio-group>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="120px" :label-position="labelPosition">
            <el-row :gutter="50">
                <el-col :span="10">
                    <el-form-item label="日程安排" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input-number v-model="form.num" :min="1" :max="10" />
                    </el-form-item>
                    <el-form-item label="日期选择" prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="时间选择" prop="time">
                        <el-time-picker placeholder="选择时间" v-model="form.time">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="选择器" prop="region">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="选择1" label="选择1" value="选择1"></el-option>
                            <el-option key="选择2" label="选择2" value="选择2"></el-option>
                            <el-option key="选择3" label="选择3" value="选择3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地点" prop="options">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="具体内容" prop="desc">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重要程度" prop="rate">
                        <el-rate v-model="form.rate" allow-half />
                    </el-form-item>
                    <el-form-item label="人数滑块" prop="num">
                        <el-slider v-model="form.num" :step="1" show-stops :max="10" />
                    </el-form-item>
                    <el-form-item label="开关" prop="delivery">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="颜色选择" prop="color">
                        <el-color-picker v-model="form.color" />
                    </el-form-item>
                    <el-form-item label="多选框" prop="type">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="小明" value="小明" name="type"></el-checkbox>
                            <el-checkbox label="小红" value="小红" name="type"></el-checkbox>
                            <el-checkbox label="小白" value="小白" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框" prop="resource">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="小明" value="小明"></el-radio>
                            <el-radio label="小红" value="小红"></el-radio>
                            <el-radio label="小白" value="小白"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选择框" prop="transfer">
                        <el-transfer v-model="form.transfer" :data="transferData" />
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
                        <el-button @click="onReset(formRef)">重置表单</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="ts" name="forms">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormProps, FormRules } from 'element-plus';
const labelPosition = ref<FormProps['labelPosition']>('right')
    const options = [
    {
        value: 'sichuan',
        label: '四川省',
        children: [
            {
                value: 'chengdu',
                label: '成都市',
                children: [
                    {
                        value: 'jinjiang',
                        label: '锦江区',
                    },
                    {
                        value: 'qingyang',
                        label: '青羊区',
                    },
                    {
                        value: 'wuhou',
                        label: '武侯区',
                    },
                    {
                        value: 'longquanyi',
                        label: '龙泉驿区',
                    },
                    {
                        value: 'chendu',
                        label: '成都郊区',
                    },
                ],
            },
            {
                value: 'mianyang',
                label: '绵阳市',
                children: [
                    {
                        value: 'jiangyou',
                        label: '江油市',
                    },
                    {
                        value: 'beichuan',
                        label: '北川县',
                    },
                    {
                        value: 'youxian',
                        label: '游仙区',
                    },
                    {
                        value: 'anzhou',
                        label: '安州区',
                    },
                ],
            },
            {
                value: 'guangyuan',
                label: '广元市',
                children: [
                    {
                        value: 'yuechi',
                        label: '岳池县',
                    },
                    {
                        value: 'liubei',
                        label: '刘备区',
                    },
                    {
                        value: 'gongxian',
                        label: '广元市',
                    },
                ],
            },
            {
                value: 'zigong',
                label: '自贡市',
                children: [
                    {
                        value: 'gongjing',
                        label: '贡井区',
                    },
                    {
                        value: 'da\'an',
                        label: '大安区',
                    },
                    {
                        value: 'renshou',
                        label: '仁寿县',
                    },
                    {
                        value: 'fushun',
                        label: '富顺县',
                    },
                ],
            },
            {
                value: 'neijiang',
                label: '内江市',
                children: [
                    {
                        value: 'shizhong',
                        label: '市中区',
                    },
                    {
                        value: 'dongxing',
                        label: '东兴区',
                    },
                    {
                        value: 'weiyuan',
                        label: '威远县',
                    },
                    {
                        value: 'longchang',
                        label: '隆昌市',
                    },
                ],
            },
            {
                value: 'deyang',
                label: '德阳市',
                children: [
                    {
                        value: 'jingyang',
                        label: '旌阳区',
                    },
                    {
                        value: 'luojiang',
                        label: '罗江区',
                    },
                    {
                        value: 'shifang',
                        label: '什邡市',
                    },
                    {
                        value: 'mianzhu',
                        label: '绵竹市',
                    },
                ],
            },
            {
                value: 'leshan',
                label: '乐山市',
                children: [
                    {
                        value: 'shizhong',
                        label: '市中区',
                    },
                    {
                        value: 'jingxing',
                        label: '井研县',
                    },
                    {
                        value: 'mabu',
                        label: '马边彝族自治县',
                    },
                    {
                        value: 'nanhua',
                        label: '南华县',
                    },
                ],
            },
            {
                value: 'suining',
                label: '遂宁市',
                children: [
                    {
                        value: 'chuanshan',
                        label: '船山区',
                    },
                    {
                        value: 'anxian',
                        label: '安居区',
                    },
                    {
                        value: 'shizhong',
                        label: '市中区',
                    },
                    {
                        value: 'dazhou',
                        label: '达州市',
                    },
                ],
            },
            {
                value: 'yibin',
                label: '宜宾市',
                children: [
                    {
                        value: 'nanxi',
                        label: '南溪区',
                    },
                    {
                        value: 'gongxian',
                        label: '贡溪区',
                    },
                    {
                        value: 'xingwen',
                        label: '兴文县',
                    },
                    {
                        value: 'yibin',
                        label: '宜宾县',
                    },
                ],
            },
            {
                value: 'dazhou',
                label: '达州市',
                children: [
                    {
                        value: 'donghu',
                        label: '东湖区',
                    },
                    {
                        value: 'yongchuan',
                        label: '永川区',
                    },
                    {
                        value: 'dazhou',
                        label: '达州市区',
                    },
                    {
                        value: 'kuchuan',
                        label: '开江县',
                    },
                ],
            },
            {
                value: 'yanan',
                label: '雅安市',
                children: [
                    {
                        value: 'yucheng',
                        label: '雨城区',
                    },
                    {
                        value: 'hanyuan',
                        label: '汉源区',
                    },
                    {
                        value: 'baoxing',
                        label: '宝兴县',
                    },
                    {
                        value: 'lushan',
                        label: '芦山县',
                    },
                ],
            },
            {
                value: 'bazhong',
                label: '巴中市',
                children: [
                    {
                        value: 'pingchang',
                        label: '平昌县',
                    },
                    {
                        value: 'bazhong',
                        label: '巴中市区',
                    },
                ],
            },
            {
                value: 'leshan',
                label: '乐山市',
                children: [
                    {
                        value: 'shizhong',
                        label: '市中区',
                    },
                    {
                        value: 'jingxing',
                        label: '井研县',
                    },
                    {
                        value: 'mabu',
                        label: '马边彝族自治县',
                    },
                ],
            },
            {
                value: 'panzhihua',
                label: '攀枝花市',
                children: [
                    {
                        value: 'dongfang',
                        label: '东方区',
                    },
                    {
                        value: 'tianlong',
                        label: '天龙区',
                    },
                ],
            },
            // 更多市区...
        ],
    },
];




const rules: FormRules = {
    name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};



const formRef = ref<FormInstance>();


const form = reactive({
    name: '',
    region: '',
    date: '',
    time: '',
    delivery: true,
    type: ['小明'],
    resource: '小红',
    desc: '',
    options: [],
    color: '',
    num: 1,
    rate: 0,
    transfer: [],

});
const generateData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
        })
    }
    return data
}

const transferData = ref(generateData())
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
    // 表单校验
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log(form);
            ElMessage.success('提交成功！');
        } else {
            return false;
        }
    });
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>