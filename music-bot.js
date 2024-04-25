const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const streamOptions = { seek: 0, volume: 1 };

const token = 'TOKEN DO SEU BOT';
bot.login(token);

bot.on('ready', () => {
    console.log('Estou pronto!');
});

bot.on('message', msg => {
    if (msg.author.bot) return;
    
    if (msg.content.toLowerCase().startsWith("?play")) {
        const voiceChannel = msg.guild.channels.cache.find(channel => channel.id === "ID DA CALL DO SEU SERVIDOR");

        if (!voiceChannel) {
            console.log("O canal de voz não foi encontrado.");
            return;
        }

        console.log("O canal foi encontrado.");

        voiceChannel.join().then(connection => {
            const stream = ytdl("LINK DO YOUTUBE", { filter: 'audioonly' });
            const dispatcher = connection.play(stream, streamOptions);

            dispatcher.on('finish', () => {
                voiceChannel.leave();
            });
        }).catch(console.error);
    }
});
