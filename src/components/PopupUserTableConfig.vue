<template>
	<div>
		<DxPopup
			v-model:visible="visible"
			id="popupTableConfig"
			content-template="popup-content"
			:drag-enabled="false"
			:hide-on-outside-click="true"
			:show-close-button="false"
			:show-title="false"
			:width="316"
			height="auto"
			container=".dx-viewport"
			:animation="{
				show: {
					type: 'fade',
					duration: 400,
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			}"
			:wrapper-attr="{ class: 'adjust-column-popover' }"
		>
			<template #popup-content>
				<div class="content-container">
					<div id="adjust-colum-popover" class="flex flex-col">
						<header>
							<div class="p-b-8 header">
								<div class="flex justify-between items-center p-b-12">
									<div class="title">Tùy chỉnh cột</div>
									<div
										class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
										style="cursor: pointer"
									>
										<div class="tooltip-container">
											<div
												class="con-ms-tooltip"
												aria-describedby="dx-2bd63976-aaec-3e94-126c-eaa4704b1e03"
											>
												<i
													class="ms-icon notranslate icon-scale ms-icon notranslate icon-scale mi-close-2"
												></i>
											</div>
										</div>
									</div>
								</div>
								<div sizeicon="20px" iconnoborder="true" inputbackground="#ffffff">
									<div title="" style="height: 35px; width: 100%">
										<div class="flex items-center w-full h-full">
											<div class="ms-input flex w-full">
												<div
													class="ms-icon-default flex items-center justify-center p-l-8 ms-icon-"
												>
													<i class="ms-icon notranslate icon-scale mi-search"></i>
												</div>
												<input
													maxlength="255"
													placeholder="Tìm kiếm"
													autofocus="autofocus"
													tabindex="1"
													type="text"
													class="ms-input-item"
												/>
											</div>
										</div>
										<div class="flex" style="display: none">
											<div class="root flex justify-between items-center text-border">
												<p class="w-full" style="height: 35px">
													<span title=""></span>
												</p>
												<div
													class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
												>
													<div class="tooltip-container">
														<div class="con-ms-tooltip">
															<i class="ms-icon notranslate icon-scale mi-pencil"></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</header>
						<main>
							<div class="list-group-wrap list-content p-b-12">
								<div class="list-group">
									<div class="list-group-item">
										<div class="flex items-center justify-between">
											<div class="popup-option-wrapper">
												<div class="input-wrapper">
													<input type="checkbox" disabled checked />
												</div>
												<label class="checkbox-label">Mã nhân viên</label>
											</div>
											<div
												class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
												style="cursor: all-scroll"
											>
												<i class="ms-icon notranslate icon-scale mi-drag"></i>
											</div>
										</div>
									</div>
									<div class="list-group-item">
										<div class="flex items-center justify-between">
											<div class="popup-option-wrapper">
												<div class="input-wrapper">
													<input type="checkbox" disabled checked />
												</div>
												<label class="checkbox-label">Họ và tên</label>
											</div>
											<div
												class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
												style="cursor: all-scroll"
											>
												<i class="ms-icon notranslate icon-scale mi-drag"></i>
											</div>
										</div>
									</div>
									<div
										class="list-group-item"
										v-for="(fieldName, index) in Object.keys(popupTableConfigFields)"
										:key="index"
									>
										<div class="flex items-center justify-between">
											<div class="popup-option-wrapper">
												<div class="input-wrapper">
													<input
														type="checkbox"
														v-model="popupTableConfigFields[fieldName].visible"
													/>
												</div>
												<label class="checkbox-label">{{
													popupTableConfigFields[fieldName].text
												}}</label>
											</div>
											<div
												class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
												style="cursor: all-scroll"
											>
												<i class="ms-icon notranslate icon-scale mi-drag"></i>
											</div>
										</div>
									</div>
								</div>
								<div
									class="no-data-wrapper flex-col items-center justify-center w-full p-y-24"
									style="height: 250px; display: none"
								>
									<div class="mi-empty-state-sheets"></div>
									<div style="font-style: italic; color: rgb(221, 221, 221)">Không có dữ liệu</div>
								</div>
							</div>
						</main>
						<footer>
							<div class="comand-wrap flex justify-flexend">
								<MButton
									btnClasses="ms-component ms-button ms-button-secondary ms-button-filled ms-button-null"
									>Lấy lại mặc định</MButton
								>
								<MButton
									btnClasses="ms-component ms-button ms-button-primary ms-button-filled ms-button-null"
									>Áp dụng</MButton
								>
							</div>
						</footer>
					</div>
				</div>
			</template>
		</DxPopup>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DxPopup, { DxPosition } from "devextreme-vue/popup";
import MButton from "@/components/base/MButton.vue";

export default defineComponent({
	components: { DxPopup, MButton },
	props: {
		// hiện popup hay không
		visible: Boolean,

		// mảng các cột thông tin người dùng để cấu hình ẩn/hiện trên bảng người dùng
		popupTableConfigFields: Object,
	},
	data() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import "@/components/popup-table-config.scss";
</style>
