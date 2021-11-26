const listando_all = require('../../bot')
const execute = async (bot,msg,args)=>{
    msg.reply(`Te enviei uma DM com todos meus comandos, mas você pode passar no meu site (PLEASE!!): https://thorfinn.netlify.app/index.html`)
}

module.exports = {
    nome:`help`,
    descrição:`Lista todos os comandos ou um específico`,
    aliases:[],
    argumentos:false,
    cooldown:10,
    execute
}