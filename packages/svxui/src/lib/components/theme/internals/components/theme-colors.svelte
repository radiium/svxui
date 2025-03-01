<script lang="ts">
    import type { ThemeColorsType } from '../../types.js';
    import { defaultThemeColors } from '../props.js';
    import type { ThemeColorsProps } from '../types.js';

    let { themeColors = {} }: ThemeColorsProps = $props();

    let colorsConfig = $derived(minifyCSS(buildCSS(themeColors)));

    function buildCSS(config: ThemeColorsType = {}): string {
        return Object.entries({ ...defaultThemeColors, ...config })
            .map(([aliasName, colorName]) => {
                return `
        [data-color=${aliasName}] {
            --accent-1: var(--${colorName}-1);
            --accent-2: var(--${colorName}-2);
            --accent-3: var(--${colorName}-3);
            --accent-4: var(--${colorName}-4);
            --accent-5: var(--${colorName}-5);
            --accent-6: var(--${colorName}-6);
            --accent-7: var(--${colorName}-7);
            --accent-8: var(--${colorName}-8);
            --accent-9: var(--${colorName}-9);
            --accent-10: var(--${colorName}-10);
            --accent-11: var(--${colorName}-11);
            --accent-12: var(--${colorName}-12);

            --accent-a1: var(--${colorName}-a1);
            --accent-a2: var(--${colorName}-a2);
            --accent-a3: var(--${colorName}-a3);
            --accent-a4: var(--${colorName}-a4);
            --accent-a5: var(--${colorName}-a5);
            --accent-a6: var(--${colorName}-a6);
            --accent-a7: var(--${colorName}-a7);
            --accent-a8: var(--${colorName}-a8);
            --accent-a9: var(--${colorName}-a9);
            --accent-a10: var(--${colorName}-a10);
            --accent-a11: var(--${colorName}-a11);
            --accent-a12: var(--${colorName}-a12);

            --accent-contrast: var(--${colorName}-contrast);
            --accent-surface: var(--${colorName}-surface);
            --accent-indicator: var(--${colorName}-indicator);
            --accent-track: var(--${colorName}-track);

            --accent-box-shadow: 0px 0px 0px 1px var(--accent-5);
            --accent-box-shadow-hover: 0px 0px 0px 1px var(--accent-8);
            --accent-box-shadow-focus: 0px 0px 0px 1px var(--accent-8);
        }`.trim();
            })
            .join('\n');
    }

    function minifyCSS(css: string): string {
        return (
            css
                // Remove comments
                .replace(/\/\*[\s\S]*?\*\//g, '')
                // Remove whitespace around selectors, braces, properties and values
                .replace(/\s*{\s*/g, '{')
                .replace(/\s*}\s*/g, '}')
                .replace(/\s*:\s*/g, ':')
                .replace(/\s*;\s*/g, ';')
                .replace(/\s*,\s*/g, ',')
                // Remove trailing semicolons
                .replace(/;\}/g, '}')
                // Remove unnecessary whitespace
                .replace(/[\r\n\t\s]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
        );
    }
</script>

<svelte:head>
    <!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<${''}style id="theme-color-config" type="text/css">${colorsConfig}</style>`}
</svelte:head>
