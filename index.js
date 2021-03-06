const Discord = require("discord.js");
const config = require("./config.js");
const bot = new Discord.Client();
const express = require("express");
const fs = require("fs");
const app = express();
const client = new Discord.Client();
client.config = config;
client.queue = new Map()

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`${commandName} Foi Iniciado`);
    client.commands.set(commandName, props);
  });
});


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
client.on("ready", () => {
  // Playing in my support server
  client.user.setActivity(`Counter-Strike: Global Offensive`,
   { type: "PLAYING" });
  /* 
  // Listening to xxx users
  client.user.setActivity(
    `MC CHAMPIONS e MC GU - CORSINHA AMARELO`,
    { type: "LISTENING" }
  );
  */
  
});


client.login(config.token);
