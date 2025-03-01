<script>
    import { Link } from 'svxui';

    let { children, ...restProps } = $props();
    let title = $derived(restProps?.href ?? '');
</script>

<Link underline="always" size="5" {...restProps} {title}>
    {@render children?.()}
</Link>
