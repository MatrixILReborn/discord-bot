import { ButtonStyle, ComponentType } from 'discord.js';
import { BotButton } from '../../../interfaces/interaction';
import selectmenu from './selectmenu';

export default {
    data: {
        custom_id: 'example_button',
        style: ButtonStyle.Primary,
        type: ComponentType.Button,
        emoji: '🎉',
    },
    async execute(interaction) {
        await interaction.reply({
            content: "Now there's a select menu!",
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [selectmenu.data],
                },
            ],
            ephemeral: true,
        });
    },
} as BotButton;
