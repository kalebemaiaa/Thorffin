const { MessageEmbed } = require("discord.js")
const{color}= require('../../config.json')

const execute = async(bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)
    if (!queue) return msg.channel.send(`${bot.emotes.error} Não há uma fila de músicas no momento`)
    const q = queue.songs.map((song, i) => `${i+1}`)
    const s = queue.songs.map((song,i)=>`${song.name} - \`${song.formattedDuration}\``)
    if(queue.songs.length<=20){
        for(i=0; i<q.length; i++){
            const embed = new MessageEmbed()
            .addFields(
                {name:q[i], value:s[i]}
            )
            .setColor(color)
            
            msg.channel.send({embeds:[embed]})
        }
    }
    else{
        for(i=0; i<20; i++){
            const embed = new MessageEmbed()
            .addFields(
                {name:q[i], value:s[i]}
            )
            .setColor(color)
            
            msg.channel.send({embeds:[embed]})
        }
    }
}
module.exports={
    nome:`fila`,
    descrição:`exibe a fila de músicas`,
    aliases:[],
    argumentos:false,
    cooldown:0,
    inVoiceChannel:true,
    execute
}