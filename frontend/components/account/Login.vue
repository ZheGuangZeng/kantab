<template>
	<v-container fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12" color="grey darken-4">

					<div class="pa-4">
						<v-card-title>
							<span class="title">Sign In</span>
						</v-card-title>
						<v-card-text>
							<v-form @submit.prevent="submit">
								<div v-if="error" class="alert error">{{ error }}</div>
								<div v-if="success" class="alert success">{{ success }}</div>

								<v-text-field name="email" v-model="email" label="E-mail or username" append-icon="person"></v-text-field>
								<v-text-field name="password" type="password" v-model="password" label="Password" append-icon="lock"></v-text-field>
								<div class="forgot">
									<router-link to="/forgot-password">
										<span class="caption" small>Forgot password?</span>
									</router-link>
								</div>
								<v-text-field v-if="need2FAToken" name="token" v-model="token" ref="token" label="Two-factor code" append-icon="unlock"></v-text-field>

								<social-auth />

								<span class="caption">Don't have an account?
									<router-link to="/signup">Sign Up</router-link>
								</span>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" :loading="processing" type="submit" large>Login</v-btn>
						</v-card-actions>
					</div>

				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AuthPanel from "./mixins/AuthPanel";

export default {
	mixins: [
		AuthPanel
	],

	data() {
		return {
			need2FAToken: false,
			token: ""
		};
	},

	methods: {
		async process() {
			try {
				const res = await this.$authenticator.login(this.email, this.password, this.need2FAToken ? this.token : null);
				if (res.passwordless) {
					this.success = `Magic link has been sent to '${res.email}'. Use it to sign in.`;
				}
			} catch(err) {
				console.log(err);
				if (err.type == "ERR_MISSING_2FA_CODE") {
					this.need2FAToken = true;
					this.token = "";
					this.success = "Open your authenticator app and enter the verification code";

					this.$nextTick(() => this.$refs.token.focus());

					return;
				}

				throw err;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.forgot {
		margin-top: -24px;
		text-align: right;
	}
</style>
