let numeros_roletados_list = []

const execute = async (bot,msg,args)=>{
    if(args.length==2||args.length==3){
        if(isNaN(args[0])){
            msg.reply(`Isso não é um número:\n\`${args[0]}\``)
        }
        else{
            let type_dice = args[1].slice(1)
            if(isNaN(type_dice)){
                msg.reply(`Não consigo encontrar esse tipo de dado.`)
            }
            else{
                numeros_roletados_list.length = 0
                for(i=0;i<args[0];i++){
                    gerar_randomico(type_dice)
                }
                numeros_roletados_list.sort((a,b)=>{return b-a})
                if(args.length==2){
                    return msg.reply(`Dados roledatos:\n\`${numeros_roletados_list}\``)
                }
                else if(args[2][0]=='k'||args[2][0]=='K'){
                    let mostra_n = args[2].slice(1)
                    if(isNaN(mostra_n)){

                    }
                    else{
                        let soma = 0
                        let anterior = []
                        for(j=0;j<numeros_roletados_list.length;j++){
                            anterior[j] = numeros_roletados_list[j]
                        }
                        for(k=0;k<mostra_n;k++){
                            numeros_roletados_list.pop()
                        }
                        for(i=0;i<numeros_roletados_list.length;i++){
                            soma = soma + numeros_roletados_list[i]
                        }
                        return msg.reply(`Dados roledatos:\n\`${soma}\` :arrow_left: ${numeros_roletados_list}\nNumero originais:${anterior}`)
                    }
                }
            }
        }
    }
    else{
        msg.reply(`Você deve digitar 2 argumentos obrigatoriamente, sendo eles o numero de dados a serem roletados e seu tipo.\nExemplo: \`$roll 2 d6\``)
    }
}

function gerar_randomico(number){
    let random_gerado =  Math.floor(Math.random() * number+1);
    numeros_roletados_list.push(random_gerado)
}

  

module.exports = {
    nome:`roll`,
    descricao:`Roleta alguns dados`,
    aliases:[],
    argumentos:true,
    cooldown:10,
    execute,
    class_command: 'util',
    usage:'$roll [number] [type]'
}