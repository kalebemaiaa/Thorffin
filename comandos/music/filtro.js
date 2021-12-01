const execute = async(bot,msg,args)=>{
    const queue = bot.distube.getQueue(msg)
    if (!queue) return msg.channel.send(`${bot.emotes.error} |Não há nenhuma música tocando no momento`)
    if (args[0] === "off" && queue.filter) bot.distube.setFilter(msg, queue.filter)
    else if (Object.keys(bot.distube.filters).includes(args[0])) bot.distube.setFilter(msg, args[0])
    else if (args[0]) return msg.channel.send(`${bot.emotes.error} | Filtro inválido`)
    msg.channel.send(`Filtro ajustado: \`${queue.filter || "Off"}\``)
}

module.exports={
    nome:'filtro',
    descricao:'colocar um filtro',
    aliases:[''],
    argumentos:true,
    cooldown:0,
    inVoiceChannel:true,
    execute,
    class_command: 'music',
    usage:'$filtro [nome]'
}
