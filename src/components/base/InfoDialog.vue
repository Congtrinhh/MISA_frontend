<template>
	<div>
		<div class="m-dialog m-dialog-info">
			<div class="m-dialog-content">
				<div v-if="config.showDialogClose" class="m-dialog-close">
					<button class="m-button-cancel">
						<div class="m-button-cancel-icon"></div>
					</button>
				</div>
				<div class="m-dialog-header"></div>
				<div v-if="config.showBody" class="m-dialog-body">
					<div class="m-dialog-body-icon" :style="config.cssIcon"></div>
					<div class="m-dialog-body-text" v-html="bodyOfDialog"></div>
				</div>
				<div class="m-dialog-footer" :class="footerAlign">
					<div class="m-dialog-footer-button-wrapper">
						<button
							v-if="config.showDenyButton"
							class="m-button m-button-secondary m-button-deny"
							@click="$emit('onCloseInfoDialog', closeInfoDialogMode.closeInfoDialogAndParentDialog)"
						>
							Không
						</button>
						<button v-if="config.showConfirmButton" class="m-button" @click="$emit('onConfirm')">
							{{ config.confirmButtonText }}
						</button>
					</div>

					<button
						:class="config.closeButtonPrimary ? 'm-button' : 'm-button m-button-secondary'"
						@click="$emit('onCloseInfoDialog', closeInfoDialogMode.closeInfoDialogOnly)"
					>
						{{ config.closeButtonText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			closeInfoDialogMode: closeInfoDialogMode,
		};
	},

	props: {
		config: {
			type: Object,
			default: function () {
				return {
					// hiện nút close dialog trên phần dialog header
					showDialogClose: false,
					// nút "không". Khi bấm nút này, đóng info dialog hiện tại và đóng luôn dialog to
					showDenyButton: false,
					// show main content of dialog or not
					showBody: true,
					// content of the dialog
					body: null,
					// text cho nút close
					closeButtonText: "Close",
					// set style cho nút close là primary (màu xanh)
					closeButtonPrimary: false,
					// hiện nút đồng ý
					showConfirmButton: false,
					// text cho nút đồng ý
					confirmButtonText: "Agree",
					// cấu hình icon: background position
					cssIcon: {
						backgroundPosition: "-826px -456px",
					},
				};
			},
		},
	},

	computed: {
		/**
		 * class cho dialog footer: justify content: center/space between/..
		 * author: Trinh Quy Cong 24/7/22
		 */
		footerAlign() {
			if (this.config.showDenyButton == false && this.config.showConfirmButton == false) {
				return "center";
			} else {
				return "space-between";
			}
		},

		/**
		 * nếu body là mảng thông báo lỗi thì hiển thị lên từng dòng
		 * nếu là không phải mảng, hiển thị bình thường
		 * author: Trinh Quy Cong 24/7/22
		 */
		bodyOfDialog() {
			if (Array.isArray(this.config.body) && this.config.body.length > 0) {
				return this.config.body.join("</p><br><p>");
			}
			return this.config.body;
		},
	},
};

const closeInfoDialogMode = {
	closeInfoDialogOnly: 0,
	closeInfoDialogAndParentDialog: 1,
};
const cssInfoDialog = {
	info: {
		backgroundPosition: "-826px -456px",
	},
	danger: {
		backgroundPosition: "-24px -954px",
	},
	warning: {
		backgroundPosition: "-592px -456px",
	},
};
export { closeInfoDialogMode, cssInfoDialog };
</script>

<style scoped>
/* initial style */
.m-dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.4);
}

.m-dialog .m-dialog-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background: #fff;
	border-radius: 4px;
	padding: 32px 32px;
}

.m-dialog .m-dialog-content .m-dialog-header {
	margin-bottom: 24px;
	align-items: center;
}

.m-dialog .m-dialog-content .m-dialog-header h3 {
	font-size: 24px;
	color: #111;
	font-weight: 700;
}

.m-dialog .m-dialog-content .m-dialog-header .m-row {
	margin: 0 21px;
	align-items: center;
}

.m-dialog .m-dialog-content .m-row-input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.m-dialog .m-dialog-content .m-input-label {
	font-weight: bold;
}

.m-dialog .m-dialog-content .m-dialog-close {
	position: absolute;
	right: 12px;
	top: 12px;
}

.m-dialog .m-dialog-content .m-dialog-close button {
	cursor: pointer;
	appearance: none;
	border: none;
	background: transparent;
	font-size: 1.5rem;
}

.m-dialog .m-dialog-footer {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row-reverse;

	margin-top: 38px;
	padding-top: 20px;
	border-top: 1px solid #aaa;
}

.m-dialog .m-dialog-footer.space-between {
	justify-content: space-between;
}

.m-dialog .m-dialog-footer .m-button-group {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
}

.m-dialog .m-dialog-footer .m-button-group .m-button-secondary {
	margin-right: 10px;
}

/* +, dialog confirm delete */
.m-dialog.m-confirm-delete-dialog .m-dialog-content {
	min-width: 444px;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body {
	display: flex;
	justify-content: space-between;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body .m-dialog-body-text {
	overflow: auto;
	max-height: 400px;
	padding-left: 16px;
	padding-top: 12px;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body .m-dialog-body-icon {
	/* background-image: url(../../assets/img/Sprites.64af8f61.svg); */
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 48px;
	height: 48px;
	min-width: 48px;
	min-height: 48px;
}

/* main dialog additional styles */
.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon,
.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	/* background-image: url(../../assets/img/Sprites.64af8f61.svg); */
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 24px;
	height: 24px;
	min-width: 24px;
	min-height: 24px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon {
	background-position: -89px -144px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	background-position: -144px -144px;
}

/* delete */
.m-dialog .m-dialog-content {
	min-width: 444px;
}

.m-dialog .m-dialog-body {
	display: flex;
}

.m-dialog .m-dialog-body .m-dialog-body-text {
	overflow: auto;
	max-height: 400px;
	padding-left: 16px;
}

.m-dialog .m-dialog-body .m-dialog-body-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 48px;
	height: 48px;
	min-width: 48px;
	min-height: 48px;
}

.m-dialog.m-dialog-info .m-dialog-footer {
	margin-top: 0;
}
.m-dialog.m-dialog-info .m-dialog-body .m-dialog-body-text {
	overflow: auto;
	max-height: 400px;
	margin-bottom: 32px;
	padding-left: 16px;
	padding-top: 12px;
}

/* ----- new  */
/* +, dialog confirm delete */
.m-dialog.m-confirm-delete-dialog .m-dialog-content {
	min-width: 444px;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body {
	display: flex;
	justify-content: space-between;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body .m-dialog-body-text {
	overflow: auto;
	max-height: 400px;
	padding-left: 16px;
	padding-top: 12px;
}

.m-dialog.m-confirm-delete-dialog .m-dialog-body .m-dialog-body-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 48px;
	height: 48px;
	min-width: 48px;
	min-height: 48px;
}

.m-error-message-dialog.m-dialog .m-dialog-content {
	min-width: 444px;
}

.m-error-message-dialog.m-dialog .m-dialog-body {
	display: flex;
	align-items: center;
}

.m-error-message-dialog.m-dialog .m-dialog-body .m-dialog-body-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -24px -954px;

	width: 48px;
	height: 48px;
	min-width: 48px;
	min-height: 48px;

	margin-right: 20px;
}

.m-error-message-dialog.m-dialog .m-dialog-footer {
	justify-content: center;
}

/* main dialog additional styles */
.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon,
.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 24px;
	height: 24px;
	min-width: 24px;
	min-height: 24px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon {
	background-position: -89px -144px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	background-position: -144px -144px;
}

/* end of initial style */

.m-dialog.m-dialog-info {
	z-index: 999999;
}

.m-dialog-footer-button-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.m-dialog .m-dialog-footer.center {
	justify-content: center;
}
.m-dialog .m-dialog-footer.space-between {
	justify-content: space-between;
}

.m-dialog .m-dialog-footer .m-button-deny {
	margin-right: 6px;
}

.m-dialog.m-dialog-info .m-dialog-content {
	padding: 32px;
	box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	width: 444px;
}

.m-dialog .m-dialog-content .m-dialog-header {
	margin-bottom: 0;
}
</style>
