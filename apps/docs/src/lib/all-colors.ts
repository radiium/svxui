/* eslint-disable @typescript-eslint/no-namespace */

/**
 * theme.all.d.ts
 *
 * Extends Svxui.ColorMap with all 32 Radix colors (accent + gray + neutral).
 * Import theme.all.css alongside this file to enable full color support in the docs app.
 *
 * Accent (25): amber, blue, bronze, brown, crimson, cyan, gold, grass, green,
 *              indigo, iris, jade, lime, mint, orange, pink, plum, purple, red,
 *              ruby, sky, teal, tomato, violet, yellow
 * Gray (6):    gray, mauve, olive, sage, sand, slate
 * Neutral (1): neutral
 */

declare global {
    namespace Svxui {
        interface ColorMap {
            // Accent colors
            amber: 'amber';
            blue: 'blue';
            bronze: 'bronze';
            brown: 'brown';
            crimson: 'crimson';
            cyan: 'cyan';
            gold: 'gold';
            grass: 'grass';
            green: 'green';
            indigo: 'indigo';
            iris: 'iris';
            jade: 'jade';
            lime: 'lime';
            mint: 'mint';
            orange: 'orange';
            pink: 'pink';
            plum: 'plum';
            purple: 'purple';
            red: 'red';
            ruby: 'ruby';
            sky: 'sky';
            teal: 'teal';
            tomato: 'tomato';
            violet: 'violet';
            yellow: 'yellow';
            // Gray colors
            gray: 'gray';
            mauve: 'mauve';
            olive: 'olive';
            sage: 'sage';
            sand: 'sand';
            slate: 'slate';
            // Neutral
            neutral: 'neutral';
        }
    }
}

export {};
