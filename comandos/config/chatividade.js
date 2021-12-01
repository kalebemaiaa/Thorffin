const execute = (bot,msg,args)=>{
    console.log(msg.member.permissions)
}
module.exports = {
    nome:`chatividade`,
    descricao:`Muda a tividade description do bot`,
    aliases:[],
    argumentos:false,
    cooldown:10,
    execute,
    class_command: 'config',
    usage:'$chatividade [atividade]'
}