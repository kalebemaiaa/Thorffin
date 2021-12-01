const execute = (bot,msg,args)=>{
    msg.reply(`🏓Sua latência é ${Date.now() - msg.createdTimestamp}ms. Já a latência API é ${Math.round(bot.ws.ping)}ms`)
}

module.exports = {
    nome:`ping`,
    descricao:`Mostra o seu ping`,
    aliases:[],
    argumentos:false,
    cooldown:0,
    execute,
    class_command: 'info',
    usage:'$ping'
}