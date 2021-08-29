const execute = (msg,args,bot)=>{
    msg.reply(`PONG!`)
}

module.exports = {
    nome:`ping`,
    descrição:`Mostra o seu ping`,
    aliases:['pa'],
    permissões:false,
    argumentos:false,
    cooldown:0,
    execute
}