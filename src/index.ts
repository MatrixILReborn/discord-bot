import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import glob from 'glob';
import { lstat, readdir, readFile, writeFile } from 'node:fs/promises';
import { isEvent } from './interfaces/event';
import {
    isButton,
    isCommand,
    isModal,
    isSelectMenu,
} from './interfaces/interaction';

dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

const processObject = (obj: object) => {
    if (isEvent(obj)) client[obj.type](obj.name, obj.execute);
    else if (isCommand(obj)) client.commands.set(obj.data.name, obj);
    else if (isButton(obj)) client.buttons.set(obj.data.custom_id, obj);
    else if (isSelectMenu(obj)) client.selectMenus.set(obj.data.custom_id, obj);
    else if (isModal(obj)) client.modals.set(obj.data.custom_id, obj);
};

(async () => {
    const dirs = await readdir(`${__dirname}/components`, {
        encoding: 'utf-8',
        withFileTypes: true,
    });
    for (const dir of dirs) {
        if (!dir.isDirectory() || dir.name === 'example') continue;
        const files = glob.sync(`./dist/components/${dir.name}/**/*.js`);
        for (const filePath of files) {
            const obj = require(filePath.replace('dist/', '')).default;
            if (Array.isArray(obj)) obj.forEach((x) => processObject(x));
            else processObject(obj);
        }
        console.log(`Loaded ${dir.name} component`);
    }

    let config: Record<string, any> = {};
    if ((await lstat('./data.json').catch(() => {}))?.isFile())
        config = JSON.parse(
            await readFile('./data.json', { encoding: 'utf-8' })
        );

    client.data = {
        get: (key) => config[key],
        set: (key, value) => (config[key] = value),
        save: async () =>
            await writeFile('./data.json', JSON.stringify(config), {
                encoding: 'utf-8',
            }),
    };
    await client
        .login(process.env.BOT_TOKEN)
        .then(() => console.log('Successfully logged in'))
        .catch(console.error);
})();
