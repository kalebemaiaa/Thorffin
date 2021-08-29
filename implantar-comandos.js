const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()


const comandos = []
const arquivosDeComandos = fs.readdirSync('./comandos').filter(File => File.endsWith('.js'))

//ARQUIVO HANDLER
for(const arquivo of arquivosDeComandos){
	const comando = require(`./comandos/${arquivo}`)
	comandos.push(comando.data.toJSON())
}



//NÃO FAÇO IDEIA
const rest = new REST({ version: '9' }).setToken(process.env.token);
(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(process.env.ID_do_cliente),
			{ body: comandos },
		);

		console.log('sucesso ao registrar comandos');
	} catch (err) {
		console.error(err);
	}
})();
