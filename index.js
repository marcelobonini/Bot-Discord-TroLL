const Discord = require("discord.js");
const config = require("./config.js");
const bot = new Discord.Client();
const express = require("express");
const fs = require("fs");
const client = new Discord.Client();


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.commands = new Discord.Collection()


//inicio de tudo
bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'channel') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)//puxando a pasta comands + o comando
    commandFile.run(bot, message, args);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`${message.author}, O comando informado não existe ou ainda não foi adicionado, se isso for um erro chame por <@864517090588491846> \nUtilize **.help** para saber meus comandos.`)
    return message.channel.send(embed);
  }
});

//status
bot.on('ready', () => {
  console.log('Pai ta On!');
  var tabela = [
    { name: 'Counter-Strike: Global Offensive', type: 'PLAYING' },
    
  ];

  function setStatus() {
    var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
    bot.user.setActivity(altstatus)
  }
  setStatus("online")
  setInterval(() => setStatus(), 5000)
})




bot.login(config.token);