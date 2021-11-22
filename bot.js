const {Client,Collection, MessageEmbed} = require('discord.js');
const bot = new Client({intents:['GUILDS','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGES','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_MEMBERS','GUILD_PRESENCES']})
const{token,prefix,emoji,color} = require('./config.json')
const fs = require('fs')

//array_to_save JSOn
let commandos_listo_old = []

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
		commandos_listo_old.push(comando)
        if(comando.aliases){
            comando.aliases.forEach(alias=> bot.aliases.set(alias, comando.nome))
        }
    }
}

//----SALVA COMMAND STRUCT IN JSON FILE
const salvando_commands_em_json = JSON.stringify(commandos_listo_old)
fs.writeFile("../Landing_Page_Thorfinn/all_commands_in_JSON.json", salvando_commands_em_json, function(err, result) {
    if(err) console.log('error', err);
});
//----EVENT READY----
bot.once('ready',()=>{
    console.log(`Thorfinn está pronto!`)
    bot.user.setActivity(`MD chefe`,{type:'LISTENING'})
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
    .on('playSong', (queue, song) =>{
		const embed= new MessageEmbed()
		.setTitle(`${emoji.play}Play${emoji.play}`)
		.setColor(`${color}`)
		.addField(`Música:`,`${song.name}-${song.formattedDuration}`)
		.setFooter(`${song.user.username} `, `${song.user.avatarURL()}`)
		.setImage(`${song.thumbnail}`)

		queue.textChannel.send({embeds: [embed] })
	})
	.on('addSong', (queue, song) =>{
		const embedqueue = new MessageEmbed()
		.setTitle(`${emoji.success}Adicionada à fila ${emoji.success}`)
		.setColor(`${color}`)
		.addFields(
			{name:`Nome da música:`,value:`${song.name}`, inline:false },
			{name:`Duração`, value:`${song.formattedDuration}`,inline:false},
			{name:`Status`,value:`${status(queue)}`,inline:false}
		)
		.setThumbnail(`${song.thumbnail}`)
		.setFooter(`${song.user.username} `, `${song.user.avatarURL()}`)

		queue.textChannel.send({embeds: [embedqueue] })
	})
	.on('addList', (queue, playlist) =>{
		const embedPlaylist = new MessageEmbed()
		.setTitle(`${emoji.queue}Playlist${emoji.queue}`)
		.setColor(`${color}`)
		.addFields(
			{name:`Playlist`,value:`${playlist.name}`, inline:false},
			{name:`Nº de músicas:`,value:`\`${playlist.songs.length}\``, inline:false},
			{name:`URL`,value:`${playlist.url}`, inline:false}
		)
		.setFooter(`${playlist.user.username}`, `${playlist.user.avatarURL()}`)
		.setImage(`${playlist.thumbnail}`)
		
	queue.textChannel.send({embeds: [embedPlaylist] })
	})
	.on("empty", (queue) => {
		const tentandoEmbed = new MessageEmbed()
		.setTitle(`VoiceChannel vazio`)
		.setDescription(`Sem ninguem no canal de voz, estou desconectando.\n Quando precisar é só chamar ${emoji.alien}`)
		.setColor(`${color}`)
		queue.textChannel.send({embeds: [tentandoEmbed]})
	}
	)
	.on("initQueue", queue => {
		queue.autoplay = true;
		queue.volume = 100;
	});

//----GUILD MEMBER ADD
bot.on('guildMemberAdd', (member)=>{
	const embed = new MessageEmbed()
	.setTitle(`いらっしゃいませ \nSeja bem vindo!\`@${member.user.username}\``)
	.setAuthor(`${member.guild.name}`,member.guild.iconURL())
	.addField(`ATENÇÃO!!`,`O server é livre para uso desde que observada algumas regras:\n\n(1)...Sem crimes (O FBI está de olho👀)\n\n(2)...Sem desrespeitar ninguem(Salvo se esse indivíduo pensar diferentemente -pode bater🥊👊)\n\n(3)...Se falar bem de Sword Art Online é ban sem direito a revisão`)
	.setThumbnail(`${member.user.avatarURL()}`)
	.setImage(`https://c.tenor.com/SdhYgrUfIIEAAAAC/rimuru-tempest-laughing.gif`)
	.setColor(color)
	member.guild.channels.cache.find(c=>c.name==="mulas").send({embeds:[embed]})
})

bot.login(token)