<script lang="ts">
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { defaultAccordionGroupProps } from './Accordion.props.js';
    import type { AccordionContext, AccordionContextItem, AccordionGroupProps } from './Accordion.types.js';
    import { setAccordionContext } from './Accordion.context.js';

    type $$Props = AccordionGroupProps;
    export let multi: $$Props['multi'] = defaultAccordionGroupProps.multi;

    $: {
        if (!multi) {
            closeAll();
        }
    }

    const items = writable<{ [key: string]: boolean }>({});

    function closeAll(): void {
        items.update((values) => {
            if (!multi) {
                Object.keys(values).forEach((id) => (values[id] = false));
            }
            return values;
        });
    }

    function register(item: AccordionContextItem): void {
        items.update((values) => ({ ...values, [item.id]: item.expanded === true }));
    }

    function unregister(item: AccordionContextItem): void {
        items.update((values) => {
            const _items = { ...values };
            delete _items[item.id];
            return _items;
        });
    }

    function set(item: AccordionContextItem): void {
        items.update((values) => {
            if (!multi) {
                Object.keys(values).forEach((id) => (values[id] = false));
            }
            return { ...values, [item.id]: item.expanded === true };
        });
    }

    setAccordionContext({
        items,
        register,
        unregister,
        set
    });
</script>

<slot />
