<script lang="ts">
    import Tabs, { type Tab } from './components/Tabs.svelte';
    import ButtonAllColors from './components/button/ButtonAllColors.svelte';
    import ButtonAllSizes from './components/button/ButtonAllSizes.svelte';
    import ButtonDefault from './components/button/ButtonDefault.svelte';

    const items: Tab[] = [
        {
            label: 'Button',
            value: 1,
            component: ButtonDefault
        },
        {
            label: 'All sizes',
            value: 2,
            component: ButtonAllSizes
        },
        {
            label: 'All Colors',
            value: 3,
            component: ButtonAllColors
        }
    ];
</script>

<Tabs {items} />
