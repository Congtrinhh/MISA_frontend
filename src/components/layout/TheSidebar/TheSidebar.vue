<template>
	<div class="sidebar flex flex-column">
		<router-link to="/setting/user" class="setting-tab-item flex align-items-center cursor-pointer">
			<div class="icon-tab icon-employee"></div>
			<div class="name-tab">Người dùng</div>
		</router-link>
		<router-link to="/setting/role" class="setting-tab-item flex align-items-center cursor-pointer">
			<div class="icon-tab icon-protect"></div>
			<div class="name-tab">Vai trò</div>
		</router-link>
		<router-link to="/setting/group" class="setting-tab-item flex align-items-center cursor-pointer">
			<div class="icon-tab icon-multiple-user"></div>
			<div class="name-tab">Nhóm người dùng</div>
		</router-link>
		<router-link to="/setting/connection" class="setting-tab-item flex align-items-center cursor-pointer">
			<div class="icon-tab icon-share-link"></div>
			<div class="name-tab">Kết nối</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="scss">
@import "./the-sidebar.scss";
</style>
