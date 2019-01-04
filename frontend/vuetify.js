import Vue from "vue";
import Vuetify from "vuetify/lib";

import "./styles/main.styl";

Vue.use(Vuetify, {
	theme: {
		primary: "#7f9d23",
		secondary: "#c96b2c",
		accent: "#82B1FF",
		error: "#b43d3d",
		info: "#2196F3",
		success: "#38b73a",
		warning: "#b38118"
	},
	iconfont: "md",
});
