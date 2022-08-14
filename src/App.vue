<template>
	<div class="main">
		<TheHeader />
		<TheContent />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/base/TheHeader.vue";
import TheContent from "@/components/base/TheContent.vue";

export default defineComponent({
	components: {
		TheHeader,
		TheContent,
	},
});
</script>

<style lang="scss">
#app {
	color: $text-color;
}
</style>
