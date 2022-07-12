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
					<div class="m-dialog-body-icon"></div>
					<div class="m-dialog-body-text" v-html="mainContentDisplay"></div>
				</div>
				<div class="m-dialog-footer" :class="{ 'space-between': showConfirmButton }">
					<button v-if="showConfirmButton" class="m-button" @click="$emit('onConfirm')">
						{{ confirmButtonText }}
					</button>
					<button
						:class="closeButtonPrimary ? 'm-button' : 'm-button m-button-secondary'"
						@click="$emit('onCloseInfoDialog')"
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
		return {};
	},

	props: {
		// show close dialog button in the header of dialog
		showDialogClose: Boolean,

		// input for icon
		icon: {
			show: {
				type: Boolean,
				default: true,
			},
			css: {
				backgroundUrl: String,
				backgroundPositionX: Number,
				backgroundPositionY: Number,
				width: Number,
				height: Number,
			},
		},

		// show main content of dialog or not
		showBody: {
			type: Boolean,
			default: true,
		},

		// content of the dialog
		body: null,

		// show confirm button or not
		showConfirmButton: Boolean,

		// text for close button
		closeButtonText: {
			type: String,
			default: "Close",
		},

		// set style button primary
		closeButtonPrimary: Boolean,

		// text for confirm button
		confirmButtonText: {
			type: String,
			default: "Agree",
		},
	},

	computed: {
		mainContentDisplay(){
			if (Array.isArray(this.body) && this.body.length > 0) {
				return this.body.join('<br></span><span>')
			}
			return this.body;
		},
	}
};
</script>

<style scoped>
@import url(../../css/components/base/info-dialog.css);
</style>
