const {emoji} = require('../../config.json')
const execute = async (bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)
    if (!queue) return msg.channel.send(`${bot.emotes.error} | Não existe uma fila de músicas no momento!`)
    bot.distube.stop(msg)
    msg.channel.send(`${bot.emotes.success} | Stopped!`)
}

module.exports = {
    nome:'stop',
    descrição:'para a música quee está tocando',
    aliases:[''],
    argumentos:false,
    cooldown:0,
    inVoiceChannel:true,
    execute
}