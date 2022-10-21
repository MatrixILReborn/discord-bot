import BotEvent from '../../../interfaces/event';

export default {
    name: 'interactionCreate',
    type: 'on',
    execute(interaction) {
        const { client } = interaction;
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command || !('autocomplete' in command)) return;
            return command.autocomplete(interaction);
        } else if (interaction.isCommand()) {
            client.commands.get(interaction.commandName)?.execute(interaction);
        } else if (interaction.isButton()) {
            client.buttons.get(interaction.customId)?.execute(interaction);
        } else if (interaction.isSelectMenu()) {
            client.selectMenus.get(interaction.customId)?.execute(interaction);
        } else if (interaction.isModalSubmit()) {
            client.modals.get(interaction.customId)?.execute(interaction);
        }
    },
} as BotEvent<'interactionCreate'>;
