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
    <rect width="256" height="256" fill="none" />
    <path
        d="M128,88a32,32,0,0,1,32-32h72V200H160a32,32,0,0,0-32,32"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <path
        d="M24,200H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H24Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <line
        x1="160"
        y1="96"
        x2="200"
        y2="96"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <line
        x1="160"
        y1="128"
        x2="200"
        y2="128"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <line
        x1="160"
        y1="160"
        x2="200"
        y2="160"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
