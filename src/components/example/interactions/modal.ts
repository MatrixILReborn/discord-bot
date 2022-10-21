import {
    APITextInputComponent,
    ComponentType,
    TextInputStyle,
} from 'discord.js';
import { BotModal } from '../../../interfaces/interaction';

export default {
    data: {
        title: 'Example Modal',
        custom_id: 'example_modal',
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: 'feel',
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Paragraph,
                        required: true,
                        label: 'Placeholder Label',
                        placeholder: 'How do you feel about this?',
                        max_length: 1935,
                    } as APITextInputComponent,
                ],
            },
        ],
    },
    async execute(interaction) {
        await interaction.reply(
            `Very inspiring! <@${
                interaction.user.id
            }> wrote:\n\`\`\`${interaction.fields.getTextInputValue(
                'feel'
            )}\`\`\``
        );
    },
} as BotModal;
