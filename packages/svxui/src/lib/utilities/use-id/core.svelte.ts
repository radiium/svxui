const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/**
 * @description Generates a random id
 * Credit: {@link https://github.com/ai/nanoid}
 *
 * @param size id size
 * @returns generated id
 */
export function useId(size = 10): string {
    let id = '';
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size;
    while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id;
}
