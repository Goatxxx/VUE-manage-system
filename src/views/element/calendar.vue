<template>
    <div class="container">
      <el-calendar v-model="value">
        <template #date-cell="{ data }" >
          <div @click="handleCellClick(data)">{{ data.date.getDate() }}</div>
          <div class="notes-container" v-if="notes[data.day.toString()]">
            <div class="notes" v-for="note in notes[data.day.toString()]" :key="note.title">
              <span :class="note.status === 1 ? 'text-success' : 'text-danger'"></span>
              <div class="note-title">{{ note.title }}</div>
            </div>
          </div>
        </template>
      </el-calendar>
  
      <!-- 创建笔记的对话框 -->
      <el-dialog title="创建笔记" v-model="dialogVisible" :visible.sync="dialogVisible" width="400px">
        <el-input
          v-model="newNote.title"
          placeholder="输入笔记标题"
          clearable
          style="margin-bottom: 10px;"
        />
        <el-radio-group v-model="newNote.status">
          <el-radio label="1">完成</el-radio>
          <el-radio label="0">未完成</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addNote">确定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
  



<script lang="ts" setup>
import { ref } from 'vue';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const value = ref(today);

const todayDate = today.toISOString().slice(0, 10);
const yesterdayDate = yesterday.toISOString().slice(0, 10);

// 初始的笔记数据
const notes = ref<any>({
  [todayDate]: [
    { title: '吃饭', status: 1 },
    //{ title: '睡觉', status: 0 }
  ],
  [yesterdayDate]: [{ title: '参加社区活动', status: 0 }],
});

// 用于控制创建笔记对话框的显示
const dialogVisible = ref(false);
const newNote = ref({ title: '', status: 0 });
const currentDay = ref<string>('');

// 处理点击日历单元格事件
const handleCellClick = (data: any) => {
  currentDay.value = data.day.toString(); // 设置当前点击的日期
  dialogVisible.value = true; // 打开创建笔记的对话框
};

// 创建新笔记
const addNote = () => {
  if (newNote.value.title.trim()) {
    // 检查日期是否已经有笔记，如果没有就初始化为一个空数组
    if (!notes.value[currentDay.value]) {
      notes.value[currentDay.value] = [];
    }
    // 将新笔记添加到该日期的笔记列表中
    notes.value[currentDay.value].push({ ...newNote.value });
    // 触发视图更新
    notes.value = { ...notes.value }; // 通过重新赋值来触发更新
    // 清空输入框
    newNote.value.title = '';
    newNote.value.status = 0;
    dialogVisible.value = false; // 关闭对话框
  } else {
    alert('请输入笔记标题');
  }
};
</script>
<style scoped>
.notes-container {
  margin-top: 10px;
}

.notes {
  margin-bottom: 5px;
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}

.el-dialog__body {
  display: flex;
  flex-direction: column;
}

.el-input {
  margin-bottom: 10px;
}
</style>
