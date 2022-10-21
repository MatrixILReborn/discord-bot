import { Client, EmbedAuthorOptions, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

const baseEmbed = (client: Client) => {
    const embed = new EmbedBuilder()
        .setFooter({ text: 'Last Updated' })
        .setTimestamp();
    if (client.mainGuild?.available) {
        const iconURL = client.mainGuild.iconURL();
        const author: EmbedAuthorOptions = {
            name: client.mainGuild.name,
        };
        if (iconURL) author.iconURL = iconURL;
        embed.setAuthor(author);
    }
    return embed;
};

const offlineEmbed = (client: Client) => {
    const embed = baseEmbed(client).setTitle('Server Status: `🔴 Offline`');
    return embed;
};

const onlineEmbed = (
    client: Client,
    info: object & { vars?: unknown & { sv_maxClients?: unknown & string } },
    players: unknown
) => {
    const maxPlayers = info.vars?.sv_maxClients ?? '48';
    const embed = baseEmbed(client)
        .setTitle('Server Status: `🟢 Online`')
        .setDescription(
            [
                `**Online Players:** \`${
                    Array.isArray(players) ? players.length : 'Unknown'
                }/${maxPlayers}\``,
            ].join('\n')
        );
    return embed;
};

export const makeEmbed = async (client: Client) => {
    const baseUrl = `http://${process.env.FIVEM_IP}`;
    const info = await (
        await fetch(`${baseUrl}/info.json`).catch(() => {})
    )?.json();
    const players = await (
        await fetch(`${baseUrl}/players.json`).catch(() => {})
    )?.json();
    if (!info) return offlineEmbed(client);
    return onlineEmbed(client, info, players);
};
