<template>
	<v-app id="app" dark>
	<v-toolbar fixed dense app>
		<Logo class="pr-4" />
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn flat to="/" exact>Home</v-btn>
			<v-btn flat to="/style-guide">Style Guide</v-btn>
			<v-btn flat to="/protected">Protected</v-btn>
			<v-btn flat to="/about">{{ $t("About") }}</v-btn>
			<template v-if="!$authenticator.isAuthenticated()">
				<v-btn flat to="/login">Login</v-btn>
				<v-btn flat to="/signup">Sign Up</v-btn>
			</template>
			<template v-else>
				<v-btn flat @click="$authenticator.logout()">Logout</v-btn>
			</template>
		</v-toolbar-items>
	</v-toolbar>
	<v-content>
		<keep-alive>
			<router-view/>
		</keep-alive>
	</v-content>
  </v-app>
</template>

<script>
import store from "./store";
import Logo from "./components/account/partials/Logo";

export default {
	components: {
		Logo
	},
	created() {
		store.dispatch("init");
	}
};
</script>

<style lang="scss" scoped>

</style>
