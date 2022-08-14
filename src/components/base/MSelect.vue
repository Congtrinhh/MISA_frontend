<template>
	<div>
		<div class="ms-select">
			<!-- <button class="btn-select" @click="toggleDropdown">{{ selected }}</button> -->
			<button type="button" width="50" height="40" class="btn-select ms-con-dropdown parent-dropdown">
				<button
					tabindex="1"
					@click="toggleDropdown"
					type="button"
					name="button"
					class="ms-component ms-button flex justify-between items-center p-l-12 p-r-8 ms-button-secondary ms-button-filled ms-button-mi-chevron-down includeIcon"
				>
					<div
						class="ms-icon-default flex items-center justify-center ms-button--icon ms-icon-white"
						size="16px"
						style="order: 2; margin-right: 0px; margin-left: 4px"
					>
						<i size="16px" class="ms-icon notranslate icon-scale mi-chevron-down"></i>
					</div>
					<span class="ms-button-text ms-button--text">{{ selected }}</span>
				</button>
			</button>

			<div class="ms-dropdown-wrapper" v-show="showDropdown">
				<div class="ms-dropdown">
					<template v-for="(option, index) in options" :key="index">
						<div class="ms-dropdown-item" @click="handleSetSelected(option)" :class="{ selected: option == selected }">
							<a class="ms-dropdown-item-link flex justify-between checked">
								<div>{{ option }}</div>
								<div class="icon-check" :class="option == selected ? 'mi-check' : ''"></div>
							</a>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	components: {},
	data() {
		return {
			// giá trị được chọn
			selected: this.value,

			// hiện dropdown
			showDropdown: false,
		};
	},
	props: {
		// giá trị được chọn mặc định (dùng v-model để truyền từ parent  vào)
		value: null,
		// danh sách options
		options: null,
	},
	methods: {
        handleSetSelected(newValue:any):void{
            // update selected
            this.selected = newValue;
            // emit sự kiện để update prop khi dùng v-model ở component cha
            this.$emit('valueChange', newValue);
            // ẩn dropdown
            this.toggleDropdown();
        },
		/**
		 * ẩn/hiện dropdown
		 * author TQCONG 12/8/2022
		 */
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},

		/**
		 * ẩn dropdown khi nhấn ra ngoài dropdown
		 * author TQCONG 12/8/2022
		 */
		closeDropdown(e: any): void {
			if (!this.$el.contains(e.target)) {
				this.showDropdown = false;
			}
		},
	},

	created() {
		window.addEventListener("click", this.closeDropdown);
	},
	beforeUnmount() {
		window.removeEventListener("click", this.closeDropdown);
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/base/select.scss";
</style>
