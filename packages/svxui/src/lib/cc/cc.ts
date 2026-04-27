/**
 * cc() — generate CSS class names from a typed object.
 *
 * Works with svxui's pre-built CSS utility files.
 * Import the utility CSS you need before using the generated classes:
 *   import 'svxui/styles/utilities.css'
 */

import type { CcProps } from './types.ts';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const P = 'svx-';

function resolveMargin(prop: string, value: string): string {
    if (value.startsWith('-')) return `-${P}${prop}-${value.slice(1)}`;
    return `${P}${prop}-${value}`;
}

// ─── cc ───────────────────────────────────────────────────────────────────────

export function cc(props: CcProps): string {
    const cls: string[] = [];

    // Margin
    if (props.m !== undefined) cls.push(resolveMargin('m', props.m));
    if (props.mt !== undefined) cls.push(resolveMargin('mt', props.mt));
    if (props.mb !== undefined) cls.push(resolveMargin('mb', props.mb));
    if (props.ml !== undefined) cls.push(resolveMargin('ml', props.ml));
    if (props.mr !== undefined) cls.push(resolveMargin('mr', props.mr));
    if (props.mx !== undefined) cls.push(resolveMargin('mx', props.mx));
    if (props.my !== undefined) cls.push(resolveMargin('my', props.my));

    // Padding
    if (props.p !== undefined) cls.push(`${P}p-${props.p}`);
    if (props.pt !== undefined) cls.push(`${P}pt-${props.pt}`);
    if (props.pb !== undefined) cls.push(`${P}pb-${props.pb}`);
    if (props.pl !== undefined) cls.push(`${P}pl-${props.pl}`);
    if (props.pr !== undefined) cls.push(`${P}pr-${props.pr}`);
    if (props.px !== undefined) cls.push(`${P}px-${props.px}`);
    if (props.py !== undefined) cls.push(`${P}py-${props.py}`);

    // Width
    if (props.w !== undefined) cls.push(`${P}w-${props.w}`);
    if (props.minW !== undefined) cls.push(`${P}min-w-${props.minW}`);
    if (props.maxW !== undefined) cls.push(`${P}max-w-${props.maxW}`);

    // Height
    if (props.h !== undefined) cls.push(`${P}h-${props.h}`);
    if (props.minH !== undefined) cls.push(`${P}min-h-${props.minH}`);
    if (props.maxH !== undefined) cls.push(`${P}max-h-${props.maxH}`);

    // Size
    if (props.size !== undefined) cls.push(`${P}size-${props.size}`);

    // Flex child
    if (props.flex !== undefined) cls.push(`${P}flex-${props.flex}`);
    if (props.grow !== undefined) cls.push(`${P}grow-${props.grow}`);
    if (props.shrink !== undefined) cls.push(`${P}shrink-${props.shrink}`);
    if (props.self !== undefined) cls.push(`${P}self-${props.self}`);

    // Grid child
    if (props.colSpan !== undefined) cls.push(`${P}col-span-${props.colSpan}`);
    if (props.rowSpan !== undefined) cls.push(`${P}row-span-${props.rowSpan}`);
    if (props.colStart !== undefined) cls.push(`${P}col-start-${props.colStart}`);
    if (props.rowStart !== undefined) cls.push(`${P}row-start-${props.rowStart}`);

    return cls.join(' ');
}
