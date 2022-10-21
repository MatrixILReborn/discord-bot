export default interface BotData {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
    save: () => Promise<void>;
}
