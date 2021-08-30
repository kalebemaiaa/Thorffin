const execute = async (bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)
    if (!queue) return msg.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
    try {
        bot.distube.skip(msg)
    } catch (e) {
        msg.channel.send(`${bot.emotes.error} | ${e}`)
    }
}

module.exports = {
    nome: "skip",
    aliases:[''],
    argumentos:false,
    descrição:"Passa para a próxima música",
    cooldown:0,
    inVoiceChannel:true,
    execute
}