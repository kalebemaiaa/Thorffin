
const execute =async (bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)

        if (!queue) return msg.channel.send(`${bot.emotes.error}Não há nenhum música em execução no momento.`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return msg.channel.send(`${bot.emotes.error}Por favor coloque um número valido`)
        bot.distube.setVolume(msg, volume)

        msg.channel.send(`${bot.emotes.success} | Volume ajustado para \`${volume}\``)
}

module.exports = {
    nome:`volume`,
    descricao:`Muda o volume do bot`,
    aliases:[''],
    argumentos:true,
    cooldown:0,
    inVoiceChannel:true,
    execute,
    class_command: 'music',
    usage:'$volume [number]'
}