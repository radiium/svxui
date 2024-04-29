---
title: Button
description: Button component
---

<script lang="ts">
    import { onMount, tick } from 'svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import {docButtonPropsDefs} from '$lib/components/Button/Button.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Button slot="component" {...props}>
        {#if props['iconOnly']}
            <MagnifyingGlass />
        {:else}
            Button
        {/if}
    </Button>
    <PlaygroundForm slot="form" bind:props schema={docButtonPropsDefs} />
</Playground>

## API Reference

Extend <CodeInline>`HTMLButtonAttributes`</CodeInline>

<ApiReference data={docButtonPropsDefs}></ApiReference>

## Demo

#### Basic

```svelte example
<script>
    import { Button } from 'svxui';
</script>

<Button>button</Button>
```

#### Size

```svelte example hideScript
<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button size="4">button</Button>
<Button size="3">button</Button>
<Button size="2">button</Button>
<Button size="1">button</Button>
```

#### Variant

```svelte example hideScript
<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button variant="solid">button</Button>
<Button variant="soft">button</Button>
<Button variant="outline">button</Button>
<Button variant="clear">button</Button>
```

#### Color

```svelte example hideScript
<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button color="gray">button</Button>
<Button color="primary">button</Button>
<Button color="blue">button</Button>
<Button color="green">button</Button>
<Button color="yellow">button</Button>
<Button color="orange">button</Button>
<Button color="red">button</Button>
```

#### Icon

```svelte example hideScript
<script lang="ts">
    import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
    import Trash from 'phosphor-svelte/lib/Trash';
    import { Button } from 'svxui';
</script>

<Button variant="clear">
    <MagnifyingGlass />
    button
</Button>

<Button color="primary">
    button
    <MagnifyingGlass />
</Button>

<Button color="blue" variant="soft" iconOnly>
    <MagnifyingGlass />
</Button>

<Button color="primary" iconOnly>
    <MagnifyingGlass />
</Button>

<Button color="red" iconOnly circle>
    <Trash />
</Button>
```

#### Full width

```svelte example hideScript
<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button fullWidth>Button</Button>
```

#### Alignment

```svelte example hideScript column
<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button align="start" fullWidth>Button</Button>
<Button align="center" fullWidth>Button</Button>
<Button align="end" fullWidth>Button</Button>
```
