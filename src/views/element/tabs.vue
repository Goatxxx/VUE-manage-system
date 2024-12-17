<template>
	<el-tabs v-model="message" type="card">
		<el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
			<el-table :data="state.unread" :show-header="false" style="width: 100%">
				<el-table-column>
					<template #default="scope">
						<span class="message-title">{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="date" width="180"></el-table-column>
				<el-table-column width="120">
					<template #default="scope">
						<el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="handle-row">
				<el-button type="primary">全部标为已读</el-button>
			</div>
		</el-tab-pane>
		<el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
			<template v-if="message === 'second'">
				<el-table :data="state.read" :show-header="false" style="width: 100%">
					<el-table-column>
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" width="180"></el-table-column>
					<el-table-column width="120">
						<template #default="scope">
							<el-button type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="handle-row">
					<el-button type="danger">删除全部</el-button>
				</div>
			</template>
		</el-tab-pane>
		<el-tab-pane :label="`回收站(${state.recycle.length})`" name="third">
			<template v-if="message === 'third'">
				<el-table :data="state.recycle" :show-header="false" style="width: 100%">
					<el-table-column>
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" width="180"></el-table-column>
					<el-table-column width="120">
						<template #default="scope">
							<el-button size="small" @click="handleRestore(scope.$index)">还原</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="handle-row">
					<el-button type="danger">清空回收站</el-button>
				</div>
			</template>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup lang="ts" name="tabs">
import { ref, reactive } from 'vue';




//消息的记录
//消息的记录
//消息的记录
//消息的记录
//消息的记录
//消息的记录
const message = ref('first');
const state = reactive({
	unread: [
		{
			date: '2024-12-15 12:00:00',
			title: '你娃叫你回家吃饭了。'
		},
		{
			date: '2024-12-16 15:00:00',
			title: '你娃提醒你该吃药了。'
		}
	],
	read: [
		{
			date: '2024-12-15 12:00:00',
			title: '你娃叫你回家吃饭了。'
		}
	],
	recycle: [
		{
			date: '2024-12-16 15:00:00',
			title: '你娃提醒你该吃药了。'
		}
	]
});

const handleRead = (index: number) => {
	const item = state.unread.splice(index, 1);
	state.read = item.concat(state.read);
};
const handleDel = (index: number) => {
	const item = state.read.splice(index, 1);
	state.recycle = item.concat(state.recycle);
};
const handleRestore = (index: number) => {
	const item = state.recycle.splice(index, 1);
	state.read = item.concat(state.read);
};
</script>

<style>
.message-title {
	cursor: pointer;
	color: var(--el-color-primary);
}

.handle-row {
	margin-top: 30px;
}
</style>
