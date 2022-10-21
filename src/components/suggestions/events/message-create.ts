import BotEvent from '../../../interfaces/event';

export default {
    name: 'messageCreate',
    type: 'on',
    async execute(message) {
        const { client, channel } = message;
        if (!client.suggestionsChannel || client.suggestionsChannel !== channel)
            return;
        await message.react('⭐');
        await message.react('❌');
    },
} as BotEvent<'messageCreate'>;
