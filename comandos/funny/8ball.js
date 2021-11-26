const execute = (bot,msg,args)=>{
    const respostas = [
        'Sim',
        'Não',
        'Provavelmente sim',
        'Provavelmente não',
        'Isso não é verdade!',
        'Com toda certeza!',
        'Se deus quiser...',
        'Acredito que isso não seja verdade',
        'DEFINITIVAMENTE NÃO',
        'Se você diz...',
        'Eu não sei'
    ]
    let index = Math.floor(Math.random() * respostas.length);
    msg.reply(respostas[index])
}


module.exports = {
    nome:`8ball`,
    descrição:`The antiga 8ball`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute
}