<template>
	<div customizedControl>
		<div class="m-select" @blur="open = false">
			<div class="m-select-input-wrapper">
				<input
					v-model="keyword"
					class="m-select-input"
					:class="{ open: open }"
					@focus="handleInputFocus"
					@input="handleOnInput"
				/>
				<div class="m-select-icon" @click="open = !open"><i class="mi-16"></i></div>
			</div>

			<div class="m-select-items" :class="{ selectHide: !open }">
				<div class="m-select-items-header">
					<div class="m-select-items-header-title">Mã đơn vị</div>
					<div class="m-select-items-header-title">Tên đơn vị</div>
				</div>
				<div class="m-select-items-wrapper">
					<template v-for="(item, i) of filtered">
						<div
							:key="i"
							@click="handleListItemClick($event, item)"
							class="m-select-item"
							:class="{ selectedItem: currentIndex == i }"
						>
							<div class="m-select-item-title">{{ item.DepartmentId }}</div>
							<div class="m-select-item-title">{{ item.DepartmentName }}</div>
						</div>
					</template>
					<div v-if="filtered.length == 0" class="m-select-item">
						<div class="m-select-item-title">Không tìm thấy đơn vị</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		// departmentId ban đầu lấy được từ v-model của compoent cha (vì v-model chính là :value + @input)
		value: String,

		// danh sách tất cả option
		options: {
			type: Array,
			required: true,
		},

		// option mặc định
		default: {
			type: Object,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			// mở dropdown danh sách option
			open: false,

			// keyword để lọc option - đồng thời là giá trị hiển thị lên textbox (lưu ý
			// là hiển thị chứ không lấy làm giá trị cho thẻ select)
			keyword: this.default
				? this.default.DepartmentName
				: this.options.length > 0
				? this.options[0].DepartmentName
				: null,

			// mảng option được hiện lên dropdown
			filtered: this.options,

			// option được chọn
			selectedItem: null,

			// lưu index khi bấm phím lên/xuống/enter để chọn dropdown option
			currentIndex: 0,
		};
	},

	watch: {
		/**
		 *  bắt sự kiện ngay sau khi bấm "cất và thêm" hoàn tất, reset tất cả dữ liệu để thêm 1 bản ghi mới,
		 * nên cần reset thẻ select
		 * author: Trinh Quy Cong 25/7/22
		 */
		value(newVal) {
			// bắt sự kiện ngay sau khi bấm "cất và thêm" hoàn tất, reset tất cả dữ liệu để thêm 1 bản ghi mới,
			// nên cần reset thẻ select
			if (!newVal) {
				// hiện tất cả option
				this.filterArray("");
				// reset keyword về rỗng để ô input hiện text trắng
				this.keyword = "";
				this.selectedItem = null;
				this.currentIndex = 0;
				this.open=false;
			}
		},

		/**
		 * ngay khi mảng options có giá trị (tức là vừa được lấy từ API về),
		 * thực hiện lấy ra mảng result lần đầu để hiển thị
		 * (hàm này chỉ chạy 1 lần - trừ khi prop từ component cha thay đổi)
		 * author: Trinh Quy Cong 25/7/22
		 */
		options(newVal, oldVal) {
			// nếu mảng options có bất kỳ sự thay đổi nào về số item
			if (oldVal.length != newVal.length) {
				// lấy ra danh sách tất cả options mà không cần search (nếu không có bước này thì danh sách ban đầu sẽ rỗng)
				this.filterArray("");
				// bind department name lên nếu có
				if (this.value) {
					for (let i = 0; i < this.options.length; i++) {
						if (this.options[i].DepartmentId == this.value) {
							this.keyword = this.options[i].DepartmentName;
							this.selectedItem = this.options[i];
							// selectedItem sẽ được sáng lên
							this.currentIndex = i;
							break;
						}
					}
				}
			}
		},

		/**
		 * author: Trinh Quy Cong 25/7/22 (NEW)
		 */
		filtered(newVal) {
			// index của item được chọn trong mảng đã được lọc
			const index = newVal.indexOf(this.selectedItem);
			// nếu item trong mảng này, update currentIndex ddeer highlight item này
			if (index !== -1) {
				this.currentIndex = index;
			}
			// nế index lớn hơn độ lớn mảng mới lọc, gán index về 0
			if (this.currentIndex >= newVal.length) {
				this.currentIndex = 0;
			}
		},

		/**
		 * author: Trinh Quy Cong 25/7/22 (NEW)
		 */
		selectedItem(newVal) {
			// update mảng lọc
			this.filterArray(newVal.DepartmentName);
			// update keyword
			this.keyword = newVal.DepartmentName;
		},
	},

	methods: {
		/**
		 * lắng nghe từ khoá tìm kiếm thay đổi (NEW)
		 * author: Trinh Quy Cong 25/7/22
		 */
		handleOnInput($event) {
			this.keyword = $event.target.value;

			this.filterArray(this.keyword);
			this.open = true;
		},
		/**
		 * xử lý khi bấm vào một item trong list các option của dropdown
		 * author: Trinh Quy Cong 25/7/22 (NEW)
		 */
		handleListItemClick($event, item) {
			this.open = false;
			this.selectedItem = item;
			this.$emit("input", item.DepartmentId);
			this.keyword = item.DepartmentName;

			this.$emit("change", $event);
		},

		/**
		 * xử lý khi input control được bấm vào hoặc tab vào bằng phím tab trên bàn phím
		 * author: Trinh Quy Cong 24/7/22 (NEW)
		 */
		handleInputFocus($event) {
			// // lọc mảng option theo keyword
			// // kiểm tra, nếu đã có selected item -> return??
			this.filterArray(this.keyword);
			// // hiện dropdown
			this.open = true;
		},

		/**
		 * lọc ra mảng option theo keyword
		 * author: Trinh Quy Cong 24/7/22
		 */
		filterArray(keyword) {
			try {
				this.filtered = this.options.filter((option) => {
					const depName = option.DepartmentName.toLowerCase();
					keyword = keyword ? keyword.toLowerCase() : "";
					return depName.indexOf(keyword) !== -1;
				});
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * xử lý sự kiện khi bấm phím lên/xuống/enter để chọn dropdown option
		 * author: Trinh Quy Cong 25/7/22
		 */
		handleKeydown($event) {
			const key = $event.key;

			const map = {
				Enter: () => {
					this.selectItem();
				},
				ArrowDown: () => {
					const index = (this.currentIndex + 1) % this.filtered.length;
					this.currentIndex = index;
				},
				ArrowUp: () => {
					let index = this.currentIndex - 1;
					index = index < 0 ? this.filtered.length - 1 : index;
					this.currentIndex = index;
				},
				Escape: () => {
					this.open = false;
				}
			};

			const func = map[key];
			if (func) {
				func();
			}

			console.log(this.currentIndex);
		},

		/**
		 * thực hiện việc chọn item các nghiệp vụ liên quan (đóng dropdown)
		 * author: Trinh Quy Cong 25/7/22
		 */
		selectItem() {
			const selectedItem = this.filtered[this.currentIndex];
			if (selectedItem) {
				this.open = false;
				this.keyword = selectedItem.DepartmentName;
				this.$emit("input", selectedItem.DepartmentId);
				// this.$emit("change", $event);
			}
		},
	},

	created() {
		// đăng ký sự kiện cho toàn trang khi khởi tạo component
		window.addEventListener("keydown", this.handleKeydown);
	},
	beforeDestroy() {
		// huỷ sự kiện trước khi unmount component
		window.removeEventListener("keydown", this.handleKeydown);
	},
};
</script>

<style scoped>
.m-select {
	position: relative;
	text-align: left;
	outline: none;
	line-height: 32px;
	height: 32px;
	width: 100%;
}

.m-select .m-select-input-wrapper {
	position: relative;
}

.m-select .m-select-input-wrapper .m-select-icon {
	position: absolute;
	right: 1px;
	top: 1px;
	width: 32px;
	height: 30px;
	background-color: transparent;
	text-align: center;
	line-height: 32px;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
}

.m-select .m-select-input-wrapper .m-select-icon i {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -560px -359px;
}

.m-select .m-select-input-wrapper .m-select-icon:hover {
	background-color: #e0e0e0;
	border-color: #e0e0e0;
}

.m-select .m-select-input-wrapper .m-select-input {
	cursor: pointer;
	user-select: none;

	font-size: 13px;
	color: inherit;
	border-radius: 2px;
	border: 1px solid #babec5;
	padding: 0 12px 0 10px;
	outline: none;
	height: 32px;
	width: calc(100%);
}

.m-select .m-select-input-wrapper .m-select-input.open,
.m-select .m-select-input-wrapper .m-select-input:focus {
	border: 1px solid #2ca01c;
}

.m-select .m-select-items {
	position: absolute;
	left: 0;
	right: 0;
	top: calc(100% + 2px);

	z-index: 9999;
	background-color: #fff;
	border: 1px solid #babec5;
	border-radius: 2px;
	box-shadow: 0 -8px 34px 0 rgba(0, 0, 0, 0.05);
	font-size: 13px;
}

.m-select .m-select-items .m-select-items-header {
	display: flex;
	height: 32px;
	padding: 0 10px;
	background: #f4f5f8;
	color: #111;
	margin-bottom: 2px;
	font-weight: 700;
	font-family: "misa-bold";
}

.m-select .m-select-items .m-select-items-header > *:first-child {
	width: 40%;
}

.m-select .m-select-items .m-select-items-header > *:last-child {
	flex-grow: 1;
}

.m-select .m-select-items .m-select-item {
	display: flex;
	cursor: pointer;
	padding: 0 10px;
	user-select: none;
	background-color: #fff;
	color: #111;
	margin-bottom: 2px;
}

.m-select .m-select-items .m-select-item:hover,
.m-select .m-select-items .m-select-item.selectedItem {
	background-color: #ebedf0;
	color: #35bf22;
}

.m-select .m-select-items .m-select-items-wrapper {
	max-height: 200px;
	overflow-y: auto;
}

.m-select .m-select-items .m-select-item > *:first-child {
	width: 40%;
	width: 40%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	padding-right: 16px;
}

.m-select .m-select-items .m-select-item > *:last-child {
	flex-grow: 1;
}

.selectHide {
	display: none;
}
</style>
