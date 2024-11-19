<script lang="ts">
    interface Props {
        size?: string;
        color?: string;
        mirrored?: boolean;
        [key: string]: any;
    }

    let { size = '1rem', color = 'currentColor', mirrored = false, ...rest }: Props = $props();
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
    <rect width="256" height="256" fill="none" /><polyline
        points="40 144 96 200 224 72"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
    />
</svg>
