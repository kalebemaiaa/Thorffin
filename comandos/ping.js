const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde a mensagem com PONG!'),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(4000);
		await interaction.editReply('Pong again!');
	},
}
