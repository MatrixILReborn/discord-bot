import { TextChannel } from 'discord.js';
import BotEvent from '../../../interfaces/event';

export default {
    name: 'ready',
    type: 'once',
    async execute(client) {
        if (process.env.SUGGESTIONS_ID) {
            const channel = await client.channels.fetch(
                process.env.SUGGESTIONS_ID
            );
            if (channel instanceof TextChannel)
                client.suggestionsChannel = channel;
            else
                console.warn("Failed to fetch channel, suggestions won't work");
        } else console.warn("SUGGESTIONS_ID not found, suggestions won't work");
    },
} as BotEvent<'ready'>;
