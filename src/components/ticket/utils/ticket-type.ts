import {
    APIButtonComponentWithCustomId,
    APIModalInteractionResponseCallbackData,
    ChannelType,
    EmbedBuilder,
    TextChannel,
} from 'discord.js';
import { BotButton, BotModal } from '../../../interfaces/interaction';
import ticketTypes from '../ticket-types/index';

const names = {
    repro: 'Reproduction',
    expected: 'Expected Result',
    actual: 'Actual Result',
} as { [prop: string]: string };

for (const ticketType of Object.values(ticketTypes)) {
    const [button, modal] = ticketType;
    names[modal.data.custom_id] = button.data.label ?? button.data.custom_id;
}

export const createTicketType = (
    buttonData: APIButtonComponentWithCustomId,
    modalData: APIModalInteractionResponseCallbackData
): [BotButton, BotModal] => {
    const button: BotButton = {
        data: buttonData,
        async execute(interaction) {
            await interaction.showModal(modal.data);
        },
    };
    const modal: BotModal = {
        data: modalData,
        async execute(interaction) {
            const { channel, user, fields } = interaction;
            const label = button.data.label;
            const thread = await (channel as TextChannel).threads.create({
                name: label ?? 'Ticket',
                invitable: true,
                type: ChannelType.PublicThread,
                reason: `Opened ${label} ticket`,
            });
            await thread.members.add(user, 'User created the ticket');
            const embed = new EmbedBuilder().setColor('Blurple');
            fields.fields.forEach((input, id) => {
                if (!input.value) return;
                embed.addFields([
                    {
                        name: names[id] ?? id,
                        value: input.value,
                    },
                ]);
            });
            await thread.send({
                content: `Opened by ${user}`,
                embeds: [embed],
            });
            await interaction.reply({
                content: `Successfully created the ticket. ${thread.toString()}`,
                ephemeral: true,
            });
        },
    };
    return [button, modal];
};
