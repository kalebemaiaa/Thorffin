
const execute =async (bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)

        if (!queue) return msg.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)

        const volume = parseInt(args[0])

        if (isNaN(volume)) return msg.channel.send(`${bot.emotes.error} | Please enter a valid number!`)

        bot.distube.setVolume(msg, volume)

        msg.channel.send(`${bot.emotes.success} | Volume set to \`${volume}\``)

}

module.exports = {
    nome:`volume`,
    descrição:`Muda o volume do bot`,
    aliases:[''],
    argumentos:true,
    cooldown:0,
    inVoiceChannel:true,
    execute
}