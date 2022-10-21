import { ComponentType, TextInputStyle } from 'discord.js';
import { BotModal } from '../../../interfaces/interaction';

export default {
    data: {
        custom_id: 'say',
        title: 'Say',
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        custom_id: 'message',
                        label: 'What would you like to say?',
                        style: TextInputStyle.Paragraph,
                        max_length: 2000,
                        required: true,
                        placeholder: 'An awesome message for everyone to see',
                    },
                ],
            },
        ],
    },
    async execute(interaction) {
        await interaction.channel
            ?.send(interaction.fields.getTextInputValue('message'))
            .then(() => interaction.reply('Successfully sent the message!'))
            .catch(() => interaction.reply('Failed to send the message!'));
    },
} as BotModal;
