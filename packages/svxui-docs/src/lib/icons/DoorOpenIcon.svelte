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
        x1="24"
        y1="224"
        x2="232"
        y2="224"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <path
        d="M56,224V40a8,8,0,0,1,8-8H192a8,8,0,0,1,8,8V224"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
    <circle cx="132" cy="132" r="12" /><line
        x1="168"
        y1="32"
        x2="168"
        y2="224"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
