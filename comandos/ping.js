const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde a mensagem com PONG!'),
	async execute(interaction) {
		await interaction.reply('PONG!');
	},
}
