<template>
	<div class="dialog-parent-wrapper">
		<div class="dialog-main-content flex flex-column" :style="{ width: `${config?.width}px` }">
			<div class="dialog-header">
				<slot name="dialog-header-content"
					><div class="title">{{ config?.headerTitle }}</div>
					<div id="topCloseBtn" class="btn-cancel" @click="raiseCancelBtnClickEvent">
						<i class="btn-cancel-icon"></i>
						<DxTooltip
							:hide-on-outside-click="false"
							show-event="dxhoverstart"
							hide-event="dxhoverend"
							target="#topCloseBtn"
						>
							Đóng
						</DxTooltip>
					</div>
				</slot>
			</div>
			<div class="dialog-body">
				<!-- slot mặc định -->
				<slot>Phần thân của dialog</slot>
			</div>
			<div class="dialog-footer">
				<slot name="dialog-footer-content">
					<slot name="dialog-footer-content-left-button"></slot>

					<slot name="dialog-footer-content-right-buttons"
						><div class="right-buttons">
							<MButton
								@click="raiseCancelBtnClickEvent"
								:btnClasses="config?.cancelBtn?.classes ? config.cancelBtn.classes : cancelBtnClasses"
								>{{ config?.cancelBtn?.text ? config.cancelBtn.text : "Huỷ" }}</MButton
							>
							<slot name="confirm-button">
								<MButton
									:class="config?.confirmBtn?.classes ? config.confirmBtn.classes : confirmBtnClasses"
									@click="raiseConfirmBtnClickEvent"
									>{{ config?.confirmBtn?.text ? config.confirmBtn.text : "Đồng ý" }}</MButton
								>
							</slot>
						</div></slot
					>
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MButton from "@/components/base/MButton.vue";
import { DxTooltip } from "devextreme-vue/tooltip";

export default defineComponent({
	components: { MButton, DxTooltip },
	data() {
		return {
			
		};
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