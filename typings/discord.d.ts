import { Collection } from 'discord.js';
import BotData from '../src/interfaces/data';
import {
    BotButton,
    BotCommand,
    BotModal,
    BotSelectMenu,
} from '../src/interfaces/interaction';

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, BotCommand>;
        buttons: Collection<string, BotButton>;
        selectMenus: Collection<string, BotSelectMenu>;
        modals: Collection<string, BotModal>;
        mainGuild?: Guild;
        data: BotData;
        suggestionsChannel?: TextChannel;
    }
}
