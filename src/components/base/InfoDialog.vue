<template>
	<div>
		<div class="m-dialog m-dialog-info">
			<div class="m-dialog-content">
				<div v-if="showDialogClose" class="m-dialog-close">
					<button class="m-button-cancel">
						<div class="m-button-cancel-icon"></div>
					</button>
				</div>
				<div class="m-dialog-header"></div>
				<div v-if="showBody" class="m-dialog-body">
					<div class="m-dialog-body-icon" :style="cssIcon"></div>
					<div class="m-dialog-body-text" v-html="mainContentDisplay"></div>
				</div>
				<div class="m-dialog-footer" :class="footerAlign">
					<div class="m-dialog-footer-button-wrapper">
						<button
							v-if="showDenyButton"
							class="m-button m-button-secondary m-button-deny"
							@click="$emit('onCloseInfoDialog', closeInfoDialogMode.closeInfoDialogAndParentDialog)"
						>
							Không
						</button>
						<button v-if="showConfirmButton" class="m-button" @click="$emit('onConfirm')">
							{{ confirmButtonText }}
						</button>
					</div>

					<button
						:class="closeButtonPrimary ? 'm-button' : 'm-button m-button-secondary'"
						@click="$emit('onCloseInfoDialog', closeInfoDialogMode.closeInfoDialogOnly)"
					>
						{{ closeButtonText }}
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
		// hiện nút close dialog trên phần dialog header
		showDialogClose: Boolean,

		// nút "không". Khi bấm nút này, đóng info dialog hiện tại và đóng luôn dialog to
		showDenyButton: Boolean,

		// show main content of dialog or not
		showBody: {
			type: Boolean,
			default: true,
		},

		// content of the dialog
		body: null,

		// text cho nút close
		closeButtonText: {
			type: String,
			default: "Close",
		},

		// set style cho nút close là primary (màu xanh)
		closeButtonPrimary: Boolean,

		// hiện nút đồng ý
		showConfirmButton: Boolean,

		// text cho nút đồng ý
		confirmButtonText: {
			type: String,
			default: "Agree",
		},

		// cấu hình icon
		cssIcon: {
			backgroundPositionX: Number,
			backgroundPositionY: Number,
		},
	},

	computed: {
		// trả về nội dung content chính của dialog theo định dạng
		mainContentDisplay() {
			if (Array.isArray(this.body) && this.body.length > 0) {
				return this.body.join("<br></span><span>");
			}
			return this.body;
		},

		// class cho dialog footer: justify content: center/space between/..
		footerAlign() {
			if (this.showDenyButton == false && this.showConfirmButton == false) {
				return "center";
			} else {
				return "space-between";
			}
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
@import url(../../css/components/base/info-dialog.css);

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
}

.m-dialog .m-dialog-content .m-dialog-header {
	margin-bottom: 0;
}
</style>
