const {MessageEmbed, MessageFlags} = require('discord.js');
const execute = (bot,msg,args)=>{
        if(!msg.member.permissions.has('BAN_MEMBERS')) return msg.reply('Sem permissão')
        if(!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.channel.send('Eu não tenho essa permissão.')

        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

        if(!member) return msg.channel.send('Não achei esse usuário');
        if(!member.bannable) return msg.channel.send('Esse usuário não pode ser banido');

        if(member.id === msg.author.id) return msg.channel.send('Você não pode se auto banir!');

        let motivo = args.slice(1).join(" ");

        if(!motivo){motivo = 'Sem motivo'}

        member.ban({ days: 7, reason: motivo }).catch(err => { 
          msg.channel.send('Alguma coisa deu errado :(')
          console.log(err)
        })

        let embed = new MessageEmbed()
        .setAuthor(`${msg.author.username}`,`${msg.author.avatarURL()}`)
        .setTitle(`O usuário ${member.nickname} foi banido por 7 dias`)
        .addField(`MOTIVO:`,`${motivo}`)
        msg.channel.send({embeds:[embed]})
}

module.exports = {
    nome:`ban`,
    descricao:`bane um usuário`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute,
    class_command: 'admin',
    usage:'$ban [@user_nickname] [motivo]'
}