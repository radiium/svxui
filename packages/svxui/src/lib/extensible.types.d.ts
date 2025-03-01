/**
 *
 * ColorMap
 *
 * The ColorMap type corresponds to the
 * radix color configuration used in the application.
 * It is declared in a TypeScript namespace to make it
 * easier for library consumers to extend the type.
 *
 * Default alias color = 'neutral' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
 * Radix accent color  => 'gold' | 'bronze' | 'brown' | 'yellow' | 'amber' | 'orange' | 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' | 'lime' | 'mint' | 'sky'
 * Radix gray color  > 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand'
 *
 */

declare global {
    namespace Svxui {
        export interface ColorMap {
            neutral: 'neutral';
            blue: 'blue';
            green: 'grass';
            yellow: 'amber';
            orange: 'orange';
            red: 'tomato';
        }
    }
}

export {};
