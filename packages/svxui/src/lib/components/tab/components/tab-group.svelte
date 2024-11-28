<script lang="ts">
    import { useGroup } from '$lib/hooks/group/index.js';
    import { wrap } from '$lib/utils/wrap.svelte.js';
    import { setTabContext } from '../context.svelte.js';
    import { defaultTabGroupProps } from '../props.js';
    import type { TabGroupProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = defaultTabGroupProps.onValueChange,
        disabled = defaultTabGroupProps.disabled,
        children
    }: TabGroupProps = $props();

    const group = useGroup({
        value: wrap(
            () => value,
            (newValue) => {
                value = newValue;
                onValueChange?.(newValue);
            }
        ),
        disabled: wrap(() => disabled),
        multi: wrap(() => false)
    });

    setTabContext(group);
</script>

{@render children?.()}
