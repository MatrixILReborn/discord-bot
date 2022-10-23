import { ChatInputCommandInteraction } from 'discord.js';
import { BotCommand } from '../../../interfaces/interaction';
import modal from './modal';

export default {
    data: {
        name: 'say',
        description: 'Send a message as the bot',
        defaultMemberPermissions: ['ManageGuild'],
    },
    execute(interaction: ChatInputCommandInteraction) {
        interaction.showModal(modal.data);
    },
} as BotCommand;
