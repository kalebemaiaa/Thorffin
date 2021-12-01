const execute = (bot,msg,args)=>{
    const text = msg.content.split(' ').slice(1).join(' ');
    msg.channel.send(text)
}

module.exports = {
    nome:`say`,
    descricao:`Diz o que você quiser.`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute,
    class_command: 'funny',
    usage:'$say [argumento]'
}