<script lang="ts">
    export let size: string = '1rem';
    export let color: string = 'currentColor';
    export let mirrored: boolean = false;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    transform={mirrored ? 'scale(-1, 1)' : undefined}
    viewBox="0 0 256 256"
    {...$$restProps}
>
    <path
        d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,48H168a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm176,24H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm-48,40H40a8,8,0,0,0,0,16H168a8,8,0,0,0,0-16Z"
    ></path>
</svg>
