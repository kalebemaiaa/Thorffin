const {Client,Collection} = require('discord.js');
const{prefix,token,emoji} = require('./config.json')
const DisTube = require("distube")
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

bot.emotes = emoji
bot.distube = new DisTube.default(bot, { searchSongs: 1, emitNewSongOnly: true, leaveOnFinish: true })
//----------comando HANDLER----------
bot.comandos = new Collection()
bot.aliases = new Collection()

const pasta_Comandos = fs.readdirSync('./comandos')

for (const pasta of pasta_Comandos){
    const subpastas_Comandos = fs.readdirSync(`./comandos/${pasta}`).filter(file=>file.endsWith(`.js`))
    for(const arquivo of subpastas_Comandos){
        const comando = require(`./comandos/${pasta}/${arquivo}`)
        console.log(`Loaded ${arquivo}`)
        bot.comandos.set(comando.nome, comando)
        if(comando.aliases){
            comando.aliases.forEach(alias=> bot.aliases.set(alias, comando.nome))
        }
    }
}
//----------END OF THE HANDLER-------


bot.on('messageCreate', async msg=>{
    if (!msg.content.startsWith(prefix) || msg.author.bot||msg.channel.type==="DM") return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const nomeDoComando = args.shift().toLowerCase();

	if (!bot.comandos.has(nomeDoComando)) return;

    const comando = bot.comandos.get(nomeDoComando)||bot.comandos.get(bot.aliases.get(nomeDoComando))

    if (comando.argumentos && !args.length) {
        return msg.channel.send(`Você não colocou os argumentos necessários, ${msg.author}!`);
    }
	
    if(!comando)return

    if (comando.inVoiceChannel && !msg.member.voice.channel) return msg.channel.send(`${bot.emotes.error} | VocÊ precisa estar em um canal de voz!`)
    

    try {
		comando.execute(msg,bot,args)
	} catch (err) {
		console.error(err);
		msg.reply('Houve um erro ao tentar executar esse comando!');
	}
})

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

    bot.distube.on("playSong", (msg, queue, song) => msg.channel.send(
        `${bot.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    bot.distube.on("addSong", (msg, queue, song) => msg.channel.send(
        `${bot.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    bot.distube.on("playList", (msg, queue, playlist, song) => msg.channel.send(
        `${bot.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    bot.distube.on("addList", (msg, queue, playlist) => msg.channel.send(
        `${bot.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))


bot.once('ready',()=>{
    console.log(`Thorfinn está pronto!`)
    bot.user.setActivity(`Eu sou`)
})


bot.login(token)