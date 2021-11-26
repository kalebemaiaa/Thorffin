const execute = (bot,msg,args)=>{
    console.log(msg.member.permissions)
}
module.exports = {
    nome:`chatividade`,
    descrição:`Muda a tividade description do bot`,
    aliases:[],
    argumentos:false,
    cooldown:10,
    execute
}