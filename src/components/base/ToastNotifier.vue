<template>
	<div ref="toastContainer" class="container">
		<div class="icon" :style="{ backgroundColor: background }" v-html="icon"></div>
		<div class="text">{{ text }}</div>
		<span class="m-toast-button" @click="$emit('onCloseToast')" :style="{ color: background }">&times;</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// show toast or not
			show: this.showProp,
		};
	},

	props: {
		// prop show toast or not
		showProp: Boolean,

		// content of message
		text: {
			type: String,
			default: "Dòng thông báo",
		},

		// background of icon, close button
		background: {
			type: String,
			default: "blue",
		},

		// icon of toast (danger, success, info,..)
		icon: {
			type: String,
			default: "blue",
		},
	},

	created() {
		const me = this;
		// ẩn toast sau 1 khoảng thời gian xuất hiện
		setTimeout(() => {
			me.$refs.toastContainer.style.opacity = 0;
			setTimeout(() => {
				me.$emit("onCloseToast");
			}, 1000);
		}, 5000);
	},
};

export const toastModes = {
	success: {
		backgroundColor: "green",
		icon: '<i class="fa-solid fa-check"></i>',
		message: "Thành công",
	},
	danger: {
		backgroundColor: "red",
		icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
		message: "Lỗi",
	},
	info: {
		backgroundColor: "blue",
		icon: '<i class="fa-solid fa-info"></i>',
		message: "Thông báo",
	},
	warning: {
		backgroundColor: "yellow",
		icon: '<i class="fa-solid fa-exclamation"></i>',
		message: "Cảnh báo",
	},
};
</script>
<style scoped>
@import url(../../css/components/base/toast-notifier.css);
</style>
