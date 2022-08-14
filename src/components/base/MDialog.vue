<template>
	<div class="dialog-parent-wrapper">
		<div class="dialog-main-content flex flex-column" :style="{ width: `${config?.width}px` }">
			<div class="dialog-header">
				<slot name="dialog-header-content"
					><div class="title">{{ config?.headerTitle }}</div>
					<div class="btn-cancel" @click="raiseCancelBtnClickEvent">
						<i class="btn-cancel-icon"></i></div
				></slot>
			</div>
			<div class="dialog-body">
				<slot name="dialog-body-content"> Phần thân của dialog </slot>
			</div>
			<div class="dialog-footer">
				<slot name="dialog-footer-content">
					<slot name="dialog-footer-content-left-button"></slot>

					<slot name="dialog-footer-content-right-buttons"
						><div class="right-buttons">
							<button
								tabindex="1"
								type="button"
								name="button"
								class=":class"
								:class="config?.cancelBtn?.classes ? config.cancelBtn.classes : cancelBtnClasses"
								@click="raiseCancelBtnClickEvent"
							>
								{{ config?.cancelBtn?.text ? config.cancelBtn.text : "Huỷ" }}
							</button>
							<slot name="confirm-button"
								><button
									tabindex="1"
									type="button"
									name="button"
									:class="config?.confirmBtn?.classes ? config.confirmBtn.classes : confirmBtnClasses"
									@click="raiseConfirmBtnClickEvent"
								>
									{{ config?.confirmBtn?.text ? config.confirmBtn.text : "Đồng ý" }}
								</button></slot
							>
						</div></slot
					>
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {};
	},

	props: {
		config: null,
	},

	methods: {
		/**
		 * emit event lên component cha khi nút xác nhận được click
		 * author TQCONG 12/8/2022
		 */
		raiseConfirmBtnClickEvent() {
			this.$emit("confirmBtnClick");
		},

		/**
		 * emit event lên component cha khi nút huỷ được click
		 * author TQCONG 12/8/2022
		 */
		raiseCancelBtnClickEvent() {
			this.$emit("cancelBtnClick");
		},
	},

	computed: {
		confirmBtnClasses() {
			return "ms-component ms-button ms-button-primary ms-button-filled ms-button-null";
		},
		cancelBtnClasses() {
			return "btn-left ms-component ms-button m-r-12 ms-button-secondary ms-button-filled ms-button-null";
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/base/dialog.scss";
</style>
