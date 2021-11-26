const execute = async (bot,msg,args)=>{
    let amount = args.join(' ')
    if (!amount){amount= 1 }
    if (isNaN(amount)) return msg.reply('O valor passado não é um número!')
    if (amount > 100) return msg.reply('Você não pode deletar mais de 100 mensagens em um movimento!'); 

    await msg.channel.messages.fetch({ limit: amount }).then(messages => {msg.channel.bulkDelete(messages)})
}
module.exports = {
    nome:`clear`,
    descrição:`Limpa as mensagens digitas no chat`,
    aliases:[],
    argumentos:false,
    cooldown:10,
    execute
}