import { ChatInputCommandInteraction } from 'discord.js';
import { BotCommand } from '../../interfaces/interaction';

export default {
    data: {
        name: 'ip',
        description: 'Check the IP of the server',
    },
    async execute(interaction: ChatInputCommandInteraction) {
        if (!process.env.FIVEM_IP) return;
        await interaction.reply({
            content: `The IP of the sever is ${process.env.FIVEM_IP}`,
            ephemeral: true,
        });
    },
} as BotCommand;
