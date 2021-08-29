const {emoji} = require('../../config.json')

const execute = (msg,bot,args)=>{
    bot.emotes = emoji
    const string =  msg.content.split(' ').slice(1).join(' ');
        if (!string) return msg.channel.send(`${bot.emotes.error} | Please enter a song url or query to search.`)
        try {
            bot.distube.play(msg, string)
        } catch (e) {
            msg.channel.send(`${bot.emotes.error} | Error: \`${e}\``)
        }
}

module.exports = {
    nome:`play`,
    descrição:`Dá play em uma pusica`,
    aliases:['p'],
    permissões:false,
    argumentos:false,
    cooldown:0,
    inVoiceChannel:true,
    execute
}