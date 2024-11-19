<script lang="ts" module>
    import type { Component } from 'svelte';

    export type Tab = {
        label: string;
        value: number;
        component: Component;
    };
</script>

<script lang="ts">
    interface Props {
        items?: Tab[];
        activeTabValue?: number;
    }

    let { items = [], activeTabValue = $bindable(1) }: Props = $props();

    const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul>
    {#each items as item}
        <li class={activeTabValue === item.value ? 'active' : ''}>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <span onclick={handleClick(item.value)}>{item.label}</span>
        </li>
    {/each}
</ul>

{#each items as item}
    {#if activeTabValue == item.value}
        <div class="box">
            <item.component />
        </div>
    {/if}
{/each}

<style>
    .box {
        margin-bottom: 10px;
        padding: 40px;
        border: 1px solid #dee2e6;
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        border-bottom: 1px solid #dee2e6;
    }
    li {
        margin-bottom: -1px;
    }

    span {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        display: block;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    span:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
    }

    li.active > span {
        color: #495057;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
    }
</style>
