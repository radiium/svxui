export type HotkeysBinding = {
    combo: string[];
    callback: (event: KeyboardEvent) => void;
};
