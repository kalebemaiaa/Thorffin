const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config()

const bot = new Client({
    intents:[
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

const arquivosDeEventos = fs.readdirSync(`./eventos/`).filter(file=> file.endsWith(`.js`))

for (const arquivo of arquivosDeEventos){
    const evento = require(`./eventos/${arquivo}`)
    if(evento.once){
        bot.once(evento.name, (...args)=> evento.execute(...args))
    }
    else{
        bot.on(evento.name, (...args)=>evento.execute(...args))
    }
}

//-----------cria a coleção comandos
bot.comandos= new Collection()

//-----------comando handler
const arquivosDeComandos = fs.readdirSync(`./comandos`).filter(file => file.endsWith(`.js`));

for (const arquivo of arquivosDeComandos){
    const comando = require(`./comandos/${arquivo}`)
    bot.comandos.set(comando.data.name, comando)
}

bot.on('interactionCreate',async interaction=>{
    if(!interaction.isCommand())return;

    const comando = bot.comandos.get(interaction.commandName)

    if(!comando)return

    try{
        await comando.execute(interaction)
    }
    catch(err){
        console.error(err);
        await interaction.reply({content:`Houve um erro ao executar esse comando`, ephemeral:true
    })
    }
})


bot.login(process.env.token)