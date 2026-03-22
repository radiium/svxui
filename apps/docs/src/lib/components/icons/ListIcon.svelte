<script lang="ts">
    import type { IconProps } from './types.js';
    let { size = '20px', color = 'currentColor', mirrored = false, ...rest }: IconProps = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    transform={mirrored ? 'scale(-1, 1)' : undefined}
    viewBox="0 0 256 256"
    {...rest}
>
    <rect width="256" height="256" fill="none" /><line
        x1="40"
        y1="128"
        x2="216"
        y2="128"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <line
        x1="40"
        y1="64"
        x2="216"
        y2="64"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <line
        x1="40"
        y1="192"
        x2="216"
        y2="192"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
