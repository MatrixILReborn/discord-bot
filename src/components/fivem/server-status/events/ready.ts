import { Message, TextChannel } from 'discord.js';
import BotEvent from '../../../../interfaces/event';
import { makeEmbed } from '../utils/embed';

export default {
    name: 'ready',
    type: 'once',
    async execute(client) {
        let statusChannel: TextChannel | undefined;
        if (process.env.FIVEM_STATUS_ID) {
            const channel = await client.channels.fetch(
                process.env.FIVEM_STATUS_ID
            );
            if (channel instanceof TextChannel) statusChannel = channel;
            else
                console.warn(
                    "Failed to fetch channel, server status won't work"
                );
        } else
            console.warn("FIVEM_STATUS_ID not found, server status won't work");

        if (!statusChannel) return;

        let interval = 10000;
        if (process.env.FIVEM_STATUS_INTERVAL)
            interval = parseInt(process.env.FIVEM_STATUS_INTERVAL) || 10000;

        let statusMessage: Message | undefined;
        const statusMessageId = client.data.get('serverStatusMessage');
        if (statusMessageId) {
            const msg = await statusChannel.messages
                .fetch(statusMessageId)
                .catch(() => {});
            if (msg instanceof Message) statusMessage = msg;
        }

        setInterval(async () => {
            if (statusMessage)
                await statusMessage.edit({ embeds: [await makeEmbed(client)] });
            else {
                statusMessage = await statusChannel?.send({
                    embeds: [await makeEmbed(client)],
                });
                client.data.set('serverStatusMessage', statusMessage?.id);
                await client.data.save();
            }
        }, interval);
    },
} as BotEvent<'ready'>;
