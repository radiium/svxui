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
        d="M48,112V40a8,8,0,0,1,8-8h96l56,56v24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <polyline
        points="152 32 152 88 208 88"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <path
        d="M80,200.87A22.12,22.12,0,0,1,64,208c-13.26,0-24-12.54-24-28s10.74-28,24-28a22.12,22.12,0,0,1,16,7.13"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <path
        d="M139.9,153.6s-29.43-7.78-31.8,11,38.43,10.12,35.78,30.72c-2.47,19.16-31.78,11-31.78,11"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <path
        d="M203.9,153.6s-29.43-7.78-31.8,11,38.43,10.12,35.78,30.72c-2.47,19.16-31.78,11-31.78,11"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
