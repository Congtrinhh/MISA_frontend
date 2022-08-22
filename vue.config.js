const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
	transpileDependencies: true,

	// không được bỏ phần cấu hình này + phần import file global.scss trong file main.ts để có thể dùng file global.scss
	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "scss",
			patterns: [path.resolve(__dirname, "./src/assets/global.scss")],
		},
	},

	css: {
		loaderOptions: {
			sass: {
				// gồm những file chỉ có biến sass, mixin, function dùng chung cho toàn bộ app
				additionalData: `
				@import "~@/assets/css/setup/normalize.scss";
				@import "~@/assets/css/setup/variables.scss";
				@import "~@/assets/css/setup/mixins.scss";
				`,
			},
		},
	},

	configureWebpack: {
		devtool: "source-map",
	},
});
