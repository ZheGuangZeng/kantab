<template>
	<dir>
		<h4>Home</h4>
		<v-btn color="primary" @click="getBoards">Get boards</v-btn>
		<pre v-if="boards"><code>{{ boards }}</code></pre>
	</dir>
</template>

<script>
export default {
	data() {
		return {
			boards: null
		};
	},

	methods: {
		getBoards() {
			this.$socket.emit("call", "v1.boards.list", { page: 1, pageSize: 5 }, (err, res) => {
				if (err)
					return alert(err.message);

				this.boards = res;
			});
		}
	}
};
</script>
