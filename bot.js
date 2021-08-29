const {Client,Collection} = require('discord.js');
const bot = new Client({intents:['GUILDS','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGES','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_MEMBERS','GUILD_PRESENCES']})
const{prefix,token,emoji} = require('./config.json')
const fs = require('fs')

//implementando distube
const DisTube = require("distube")
bot.distube = new DisTube.default(bot, { 
    searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
})

bot.emotes = emoji

//--fim
bot.comandos = new Collection()
bot.aliases = new Collection()

//----HANDLER----
const pasta_Comandos = fs.readdirSync('./comandos')
for (const pasta of pasta_Comandos){
    const subpastas_Comandos = fs.readdirSync(`./comandos/${pasta}`).filter(file=>file.endsWith(`.js`))
    for(const arquivo of subpastas_Comandos){
        const comando = require(`./comandos/${pasta}/${arquivo}`)
        console.log(`${arquivo.toLocaleUpperCase()} carregado`)
        bot.comandos.set(comando.nome, comando)
        if(comando.aliases){
            comando.aliases.forEach(alias=> bot.aliases.set(alias, comando.nome))
        }
    }
}
//----EVENT READY----
bot.once('ready',()=>{
    console.log(`Thorfinn está pronto!`)
    bot.user.setActivity(`Virtual Studio Code`)
})
//----EVENT MSGCREATE----
bot.on('messageCreate', async msg=>{
    if (!msg.content.startsWith(prefix) || msg.author.bot||msg.channel.type==="DM") return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const nomeDoComando = args.shift().toLowerCase();

	if (!bot.comandos.has(nomeDoComando)) return;

    const comando = bot.comandos.get(nomeDoComando)||bot.comandos.get(bot.aliases.get(nomeDoComando))

    if (comando.argumentos && !args.length) {
        return msg.channel.send(`Você não colocou os argumentos necessários, ${msg.author}!`);
    }
	
    if(!comando)return

    if (comando.inVoiceChannel && !msg.member.voice.channel) return msg.channel.send(`${bot.emotes.error} | VocÊ precisa estar em um canal de voz!`)
    
    try {
		comando.execute(bot,msg,args)
	} catch (err) {
		console.error(err);
		msg.reply(`Houve um erro ao tentar executar esse comando!\n${err}`);
	}
})
//---STATUS/QUEUE
const status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
		|| 'Off'}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

//---EVENTOS DISTUBE
bot.distube
    .on('playSong', (queue, song) =>
		queue.textChannel.send(
			`Playing \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nRequested by: ${song.user}\n${status(queue)}`,
		))
	.on('addSong', (queue, song) =>
		queue.textChannel.send(
			`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
		))
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		))

bot.login(token)