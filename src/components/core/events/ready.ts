import { Guild } from 'discord.js';
import BotEvent from '../../../interfaces/event';

export default {
    name: 'ready',
    type: 'once',
    async execute(client) {
        console.log(`Ready as ${client.user?.tag}`);

        if (process.env.GUILD_ID) {
            const guild = await client.guilds.fetch(process.env.GUILD_ID);
            if (guild instanceof Guild) client.mainGuild = guild;
            else console.warn("Failed to fetch guild, commands won't work");
        } else console.warn("GUILD_ID not found, commands won't work");

        if (client.mainGuild?.available) {
            const cmds = client.commands.map((cmd) => cmd.data);
            await client.mainGuild.commands
                .set(cmds)
                .then(() => console.log('Successfully deployed commands'))
                .catch(console.error);
        }
    },
} as BotEvent<'ready'>;
