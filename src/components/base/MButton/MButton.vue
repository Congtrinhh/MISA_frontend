<template>
	<button
		tabindex="1"
		:type="type"
		name="button"
		class="ms-component ms-button"
		:class="btnClasses"
		:disabled="disabled"
		:id="id"
	>
		<div
			v-if="hasIcon"
			class="ms-icon-default flex items-center justify-center ms-button--icon ms-icon-white"
			size="16px"
		>
			<i size="16px" class="ms-icon" :class="iconClasses"></i>
		</div>
		<span class="ms-button-text ms-button--text"><slot></slot></span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {};
	},
	props: {
		// id của button
		id: String,

		// type của button
		type: { type: String, default: "button" },

		// trạng thái disabled của button
		disabled: Boolean,

		// các class truyền vào element button
		btnClasses: {
			type: String,
			default: "ms-component ms-button ms-button-primary ms-button-filled ms-button-null",
		},
		// các class truyền vào element i
		iconClasses: {
			type: String,
			default: "ms-icon",
		},
		// nếu được set bằng true, button sẽ không có min-width
		noDefaultMinWidth: {
			type: Boolean,
			required: false,
		},
	},
	computed: {
		/**
		 * check xem button thuộc loại chứa icon hay không
		 * author TQCONG 14/8/2022
		 */
		hasIcon() {
			return this.iconClasses && this.iconClasses.trim();
		},
	},
});
</script>

<style lang="scss" scoped>
@import "./button.scss";
</style>