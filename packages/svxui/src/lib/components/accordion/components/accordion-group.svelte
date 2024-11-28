<script lang="ts">
    import { useGroup } from '$lib/hooks/group/index.js';
    import { wrap } from '../../../utils/wrap.svelte.js';
    import { setAccordionContext } from '../context.svelte.js';
    import { defaultAccordionGroupProps } from '../props.js';
    import type { AccordionGroupProps } from '../types.js';

    let {
        value = $bindable(),
        onValueChange = defaultAccordionGroupProps.onValueChange,
        multi = defaultAccordionGroupProps.multi,
        disabled = defaultAccordionGroupProps.disabled,
        children
    }: AccordionGroupProps = $props();

    const group = useGroup({
        value: wrap(
            () => value,
            (newValue) => {
                value = newValue;
                onValueChange?.(newValue);
            }
        ),
        multi: wrap(() => multi),
        disabled: wrap(() => disabled)
    });

    setAccordionContext(group);
</script>

{@render children?.()}
