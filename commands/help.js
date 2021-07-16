const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#d48d13')
    .setDescription(` Minha lista de comandos ${message.author}`)
    .setTimestamp()
    .setFooter(` Autor: ${message.author.username} `)
    .addFields(
        {
            name: '.avatar',
            value: `".avatar @user"`,
            
        },
        {
            name: '.clear',
            value: `".clear numero_de_mensagens"`,
            
        },
         {
            name: '.kick',
            value: `".kick @user"`,
            
        },
        {
            name: '.ban',
            value: `".ban @user motivo"`,
            
        },
        {
            name: '.play',
            value: `".play nome_da_musica`
        },
        {
            name: '.skip',
            value: `"Pular uma música"`,
            
        },
        {
            name: '.queue',
            value: `"Mostrar lista de músicas em reprodução"`,
            
        }
    )
    message.channel.send(embed);
}