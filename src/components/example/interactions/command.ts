import { ChatInputCommandInteraction, ComponentType } from 'discord.js';
import { BotCommand } from '../../../interfaces/interaction';
import button from './button';

export default {
    data: {
        name: 'example',
        description: 'An example command!',
    },
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({
            content: 'Click on the magic button!',
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [button.data],
                },
            ],
            ephemeral: true,
        });
    },
} as BotCommand;
