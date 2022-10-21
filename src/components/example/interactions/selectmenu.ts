import { ComponentType } from 'discord.js';
import { BotSelectMenu } from '../../../interfaces/interaction';
import modal from './modal';

export default {
    data: {
        custom_id: 'example_selectmenu',
        type: ComponentType.SelectMenu,
        options: [
            {
                label: 'First option',
                value: 'first',
            },
            {
                label: 'Second option',
                value: 'second',
            },
        ],
    },
    async execute(interaction) {
        const { components: rows } = modal.data;
        if (rows[0] && rows[0].components[0])
            rows[0].components[0].label = `You chose the ${interaction.component.options[0]?.value} option`;
        await interaction.showModal(modal.data);
    },
} as BotSelectMenu;
