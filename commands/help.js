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
            value: `Exibir o avatar da pessoa desejada`,
            
        },
        {
            name: '.clear',
            value: `Limpa o chat de 0 a 99 mensagens`,
            
        },
         {
            name: '.kick',
            value: `Kickar o amiguinho`,
            
        },
        {
            name: '.ban',
            value: `Banir o amiguinho`,
            
        },
        {
            name: '!play',
            value: `Iniciar uma musica no canal`
        }
    )
    message.channel.send(embed);
}