const {emoji} = require('../../config.json')

const execute =async (bot,msg,args)=>{
    bot.emotes = emoji
    const string =  args.join(' ')
    try {
        await bot.distube.play(msg, string)
        const queue = bot.distube.getQueue(msg)
        if (!queue) return msg.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        msg.channel.send(queue.songs[0].thumbnail)
    } 
    catch (e) {
        msg.channel.send(`${bot.emotes.error} | Error: \`${e}\``)
        
    }
}

module.exports = {
    nome:`play`,
    descrição:`Dá play em uma musica`,
    aliases:['p'],
    argumentos:true,
    cooldown:0,
    inVoiceChannel:true,
    execute
}