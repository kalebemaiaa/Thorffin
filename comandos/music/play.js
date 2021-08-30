const { MessageEmbed } = require('discord.js')
const {emoji, color} = require('../../config.json')

const execute =async (bot,msg,args)=>{
    bot.emotes = emoji
    const string =  args.join(' ')
    try {
        await bot.distube.play(msg, string)
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