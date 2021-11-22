const execute = (bot,msg,args)=>{
    if(!msg.member.permissions.has('KICK_MEMBERS')) return msg.reply('Você não tem permissão para dar kick em ninguem')
    if(!msg.guild.me.permissions.has("KICK_MEMBERS")) return msg.channel.send('Eu não tenho essa permissão.')

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if(!member) return msg.channel.send('Não achei esse usuário');
    if(!member.kickable) return msg.channel.send('Esse usuário não pode ser banido');

    if(member.id === msg.author.id) return msg.channel.send('Você não pode se auto kickar!');

    let motivo = args.slice(1).join(" ");

    if(!motivo){motivo = 'Sem motivo'}

    member.ban({ days: 7, reason: motivo }).catch(err => { 
      msg.channel.send('Alguma coisa deu errado :(')
      console.log(err)
    })

    let embed = new MessageEmbed()
    .setAuthor(`${msg.author.username}`,`${msg.author.avatarURL()}`)
    .setTitle(`O usuário ${member.nickname} foi kickado por 7 dias`)
    .addField(`MOTIVO:`,`${motivo}`)
    msg.channel.send({embeds:[embed]})
}

module.exports = {
    nome:`kick`,
    descrição:`da kick em um usuário`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute
}