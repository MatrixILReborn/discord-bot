import {
    APIButtonComponentWithCustomId,
    ApplicationCommandOptionType,
    ChannelType,
    ChatInputCommandInteraction,
    ComponentType,
    TextBasedChannel,
} from 'discord.js';
import {
    BotButton,
    BotCommand,
    BotModal,
} from '../../../interfaces/interaction';
import TicketType from '../ticket-types';

export default {
    data: {
        name: 'ticket',
        description: 'Manage the ticket component',
        options: [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: 'prompt',
                description: 'Send a ticket creation prompt',
                options: [
                    {
                        type: ApplicationCommandOptionType.String,
                        name: 'ticket_types',
                        description:
                            'The ticket types to include in' +
                            'the prompt, seperated by a space',
                        required: true,
                    },
                    {
                        type: ApplicationCommandOptionType.Channel,
                        name: 'channel',
                        description: 'The channel to send the prompt to',
                        channelTypes: [ChannelType.GuildText],
                    },
                    {
                        type: ApplicationCommandOptionType.String,
                        name: 'message',
                        description: 'Optional prompt message',
                    },
                ],
            },
        ],
    },
    async execute(interaction: ChatInputCommandInteraction) {
        const { client, options } = interaction;
        const channel = await client.channels.fetch(
            options.getChannel('channel')?.id ?? interaction.channelId
        );
        if (!channel) {
            await interaction.reply('Failed to get channel.');
            return;
        }
        const messageOption =
            options.getString('message') ??
            'Click on one of the buttons below to create a ticket.';
        const errors: string[] = [];
        const ticketTypes = options
            .getString('ticket_types', true)
            .split(' ')
            .map((x) => {
                if (!(typeof TicketType[x] === 'object'))
                    return errors.push(`Couldn't find ticket type ${x}.`);
                return (TicketType[x] as [BotButton, BotModal])[0].data;
            });
        if (errors.length > 0) {
            await interaction.reply(errors.join('\n'));
            return;
        }
        let content: string = 'Placeholder message';
        await (channel as TextBasedChannel)
            .send({
                content: messageOption,
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            ...(ticketTypes as APIButtonComponentWithCustomId[]),
                        ],
                    },
                ],
            })
            .then(() => (content = 'Successfully sent the prompt!'))
            .catch(() => (content = 'Failed to send the prompt.'));
        await interaction.reply({ content, ephemeral: true });
    },
} as BotCommand;
