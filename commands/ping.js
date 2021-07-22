module.exports = {
    name: "ping",
    category: "info",
    description: "Get bot ping :/",
    usage: "ping",
    run: (client, message) => {
      message.channel.send(`**Latência: ${Math.round(client.ws.ping)} ms.      :ping_pong:**`);
    }
    
  }