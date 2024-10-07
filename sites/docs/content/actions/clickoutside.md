---
title: ClickOutside
description: Listen click outside given HTMLElement
category: doc
---

<script lang="ts">
    import { Card, Text, clickoutsideAction } from 'sveltr';

    let isClickedOutside = undefined
    function onClickoutside(event: CustomEvent<MouseEvent>): void {
        console.log('onClickoutside');
        isClickedOutside = true
    }
</script>

## Example

<Card>
<Card variant="outline" class="p-7">
<div  use:clickoutsideAction on:clickoutside={onClickoutside} on:click={() => isClickedOutside = false}>
<Text>
Clicked:
{#if isClickedOutside === true} 
<Text color="green">outside</Text>
{:else if isClickedOutside === false} 
<Text color="red">inside</Text>
{:else}
<Text disabled>idle</Text>
{/if}
</Text>
</div>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { clickoutsideAction } from 'sveltr';

    function onClickoutside(event: CustomEvent<MouseEvent>): void {
        console.log(event.detail);
    }
</script>

<div use:clickoutsideAction on:clickoutside={onClickoutside}>Content</div>
```
