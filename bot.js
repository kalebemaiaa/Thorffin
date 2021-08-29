const {Client,Collection} = require('discord.js');
const{prefix,token} = require('./config.json')
const fs = require('fs')

const bot = new Client({
    intents:[
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

//----------comando HANDLER----------
bot.comandos = new Collection()

const pasta_Comandos = fs.readdirSync('./comandos')

for (const pasta of pasta_Comandos){
    const subpastas_Comandos = fs.readdirSync(`./comandos/${pasta}`).filter(file=>file.endsWith(`.js`))
    for(const arquivo of subpastas_Comandos){
        const comando = require(`./comandos/${pasta}/${arquivo}`)
        bot.comandos.set(comando.nome, comando)
    }
}
//----------END OF THE HANDLER-------


bot.on('messageCreate', async msg=>{
    if (!msg.content.startsWith(prefix) || msg.author.bot||msg.channel.type==="DM") return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const nomeDoComando = args.shift().toLowerCase();

	if (!bot.comandos.has(nomeDoComando)) return;

    const comando = bot.comandos.get(nomeDoComando)

    if (comando.argumentos && !args.length) {
        return msg.channel.send(`Você não colocou os argumentos necessários, ${msg.author}!`);
    }
	
    if(!comando)return
    

    try {
		comando.execute(msg,args,bot)
	} catch (err) {
		console.error(err);
		msg.reply('Houve um erro ao tentar executar esse comando!');
	}
})


bot.once('ready',()=>{
    console.log(`Thorfinn está pronto!`)
    bot.user.setActivity(`Eu sou`)
})


bot.login(token)