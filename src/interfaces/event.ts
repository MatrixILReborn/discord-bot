import { Awaitable, ClientEvents } from 'discord.js';

export default interface BotEvent<K extends keyof ClientEvents> {
    name: K;
    type: 'on' | 'once';
    execute: (...args: ClientEvents[K]) => Awaitable<void>;
}

export const isEvent = (
    obj?: unknown & {
        name?: unknown;
        type?: unknown;
        execute?: unknown;
    }
): obj is BotEvent<keyof ClientEvents> => {
    return (
        typeof obj === 'object' &&
        typeof obj.name === 'string' &&
        (obj.type === 'on' || obj.type === 'once') &&
        typeof obj.execute === 'function'
    );
};
