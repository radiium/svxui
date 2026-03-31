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
    <rect width="256" height="256" fill="none" /><path
        d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <circle
        cx="128"
        cy="128"
        r="40"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
