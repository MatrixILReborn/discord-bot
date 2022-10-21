import { ActivityType } from 'discord.js';
import fetch from 'node-fetch';
import BotEvent from '../../interfaces/event';

export default {
    name: 'ready',
    type: 'once',
    async execute(client) {
        let interval = 60000;
        if (process.env.BOT_STATUS_INTERVAL)
            interval = parseInt(process.env.BOT_STATUS_INTERVAL) || 60000;

        let i = 0;
        setInterval(async () => {
            switch (i) {
                default:
                    client.user.setPresence({
                        activities: [
                            {
                                type: ActivityType.Watching,
                                name: `${client.users.cache.size - 1} members`,
                            },
                        ],
                    });
                    i = 0;
                    break;
                case 1:
                    const players = await (
                        await fetch(
                            `http://${process.env.FIVEM_IP}/players.json`
                        ).catch(() => {})
                    )?.json();
                    if (!players) break;
                    client.user.setPresence({
                        activities: [
                            {
                                type: ActivityType.Watching,
                                name: `${players.length} players`,
                            },
                        ],
                    });
                    break;
            }
            i++;
        }, interval);
    },
} as BotEvent<'ready'>;
