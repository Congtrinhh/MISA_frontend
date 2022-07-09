<template>
	<div id="app">
		<TheHeader />
		<TheSidebar />
		<TheContent />
	</div>
</template>

<script>
import TheHeader from "./components/base/TheHeader.vue";
import TheSidebar from "./components/base/TheSidebar.vue";
import TheContent from "./components/base/TheContent.vue";
export default {
	name: "App",

	components: {
		TheSidebar,
		TheHeader,
		TheContent,
	},

	data: () => ({
		//
	}),
};
</script>
