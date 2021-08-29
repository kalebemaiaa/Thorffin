const execute = (msg,args,bot)=>{
    const text = msg.content.split(' ').slice(1).join(' ');
    msg.channel.send(text)
}

module.exports = {
    nome:`say`,
    descrição:`Diz o que você quiser.`,
    aliases:[],
    permissões:false,
    argumentos:true,
    cooldown:10,
    execute
}