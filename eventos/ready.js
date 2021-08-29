module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`HELLO! Logado como ${client.user.tag}`);
	},
};