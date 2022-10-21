import {
    APIButtonComponentWithCustomId,
    APIModalInteractionResponseCallbackData,
    APISelectMenuComponent,
    ApplicationCommandData,
    AutocompleteInteraction,
    Awaitable,
    ButtonInteraction,
    CommandInteraction,
    ModalSubmitInteraction,
    SelectMenuInteraction,
} from 'discord.js';

export interface BotCommand {
    data: ApplicationCommandData;
    execute: (interaction: CommandInteraction) => Awaitable<void>;
    autocomplete?: (interaction: AutocompleteInteraction) => Awaitable<void>;
}

export interface BotButton {
    data: APIButtonComponentWithCustomId;
    execute: (interaction: ButtonInteraction) => Awaitable<void>;
}

export interface BotSelectMenu {
    data: APISelectMenuComponent;
    execute: (interaction: SelectMenuInteraction) => Awaitable<void>;
}

export interface BotModal {
    data: APIModalInteractionResponseCallbackData;
    execute: (interaction: ModalSubmitInteraction) => Awaitable<void>;
}

export const isCommand = (
    obj?: unknown & {
        data?: unknown & {
            name?: unknown;
            description?: unknown;
        };
        execute?: unknown;
        autocomplete?: unknown;
    }
): obj is BotCommand => {
    return (
        typeof obj === 'object' &&
        typeof obj.data === 'object' &&
        typeof obj.data.name === 'string' &&
        typeof obj.data.description === 'string' &&
        typeof obj.execute === 'function' &&
        (!obj.autocomplete || typeof obj.autocomplete === 'function')
    );
};

export const isButton = (
    obj?: unknown & {
        data?: unknown & {
            style?: unknown;
            custom_id?: unknown;
            type?: unknown;
        };
        execute?: unknown;
    }
): obj is BotButton => {
    return (
        typeof obj === 'object' &&
        typeof obj.data === 'object' &&
        typeof obj.data.style === 'number' &&
        typeof obj.data.custom_id === 'string' &&
        obj.data.type === 2 &&
        typeof obj.execute === 'function'
    );
};

export const isSelectMenu = (
    obj?: unknown & {
        data?: unknown & {
            custom_id?: unknown;
            options?: unknown;
            type?: unknown;
        };
        execute?: unknown;
    }
): obj is BotSelectMenu => {
    return (
        typeof obj === 'object' &&
        typeof obj.data === 'object' &&
        typeof obj.data.custom_id === 'string' &&
        typeof obj.data.type === 'number' &&
        [3, 5, 6, 7, 8].includes(obj.data.type) &&
        (obj.data.type !== 3 || Array.isArray(obj.data.options)) &&
        typeof obj.execute === 'function'
    );
};

export const isModal = (
    obj?: unknown & {
        data?: unknown & {
            custom_id?: unknown;
            title?: unknown;
            components?: unknown;
        };
        execute?: unknown;
    }
): obj is BotModal => {
    return (
        typeof obj === 'object' &&
        typeof obj.data === 'object' &&
        typeof obj.data.custom_id === 'string' &&
        typeof obj.data.title === 'string' &&
        Array.isArray(obj.data.components) &&
        typeof obj.execute === 'function'
    );
};
