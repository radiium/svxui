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
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Svxui {
        interface ColorMap {
            // Neutral
            neutral: 'neutral';
            // Gray colors
            gray: 'gray';
            mauve: 'mauve';
            slate: 'slate';
            sage: 'sage';
            olive: 'olive';
            sand: 'sand';
            // Accent colors
            tomato: 'tomato';
            red: 'red';
            ruby: 'ruby';
            crimson: 'crimson';
            pink: 'pink';
            plum: 'plum';
            purple: 'purple';
            violet: 'violet';
            iris: 'iris';
            indigo: 'indigo';
            blue: 'blue';
            cyan: 'cyan';
            teal: 'teal';
            jade: 'jade';
            green: 'green';
            grass: 'grass';
            bronze: 'bronze';
            gold: 'gold';
            brown: 'brown';
            orange: 'orange';
            amber: 'amber';
            yellow: 'yellow';
            lime: 'lime';
            mint: 'mint';
            sky: 'sky';
        }
    }
}

export {};
