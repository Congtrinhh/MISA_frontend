<template>
	<div class="main-content flex-column">
		<div class="main-view flex flex-column">
			<div class="flex">
				<TheSidebar />
				<router-view />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheSidebar from "@/components/base/TheSidebar/TheSidebar.vue";

export default defineComponent({
	components: { TheSidebar },
});
</script>

<style scoped lang="scss">
@import "./the-content.scss";
</style>
