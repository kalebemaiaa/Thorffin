const execute = ()=>{
    const usuario = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if(!usuario) return msg.channel.send('Não achei esse usuário');
    msg.reply(`VOCE BEIJOU O USUÁRIO:${usuario.nickname}`)
}

module.exports = {
    nome:`kiss`,
    descrição:`beija um usuário`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute
}