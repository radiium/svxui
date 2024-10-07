---
title: InputGroup
description: Container for grouping interacting component.
category: doc
---

<script lang="ts">
    import SampleButtonOnly from '$lib/content/components/input-group/SampleButtonOnly.svelte';
    import SampleButtonIconOnly from '$lib/content/components/input-group/SampleButtonIconOnly.svelte';
    import SampleButtonRadius from '$lib/content/components/input-group/SampleButtonRadius.svelte';
    import SampleInputSelect from '$lib/content/components/input-group/SampleInputSelect.svelte';
    import SampleInputButton from '$lib/content/components/input-group/SampleInputButton.svelte';
    import SampleInputButtonIcon from '$lib/content/components/input-group/SampleInputButtonIcon.svelte';
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import {inputGroupSchema} from '$lib/content/components/input-group/schema.js';
</script>

The `<InputGroup/>` can be used for grouping the following components: `<Input/>`, `<Select/>`, `<Button/>`.

## API Reference

<ApiReferenceComponent schema={inputGroupSchema}/>

## Examples

### Button only

<SampleButtonOnly/>

```svelte
<script>
    import { InputGroup, Button } from 'sveltr';

    const sizes = ['1', '2', '3'];
</script>

{#each sizes as size}
    <InputGroup>
        <Button variant="soft" color="primary" {size} active>one</Button>
        <Button variant="soft" color="primary" {size}>two</Button>
        <Button variant="soft" color="primary" {size}>three</Button>
    </InputGroup>
{/each}
```

### Button icon only

<SampleButtonIconOnly/>

```svelte
<script>
    import { InputGroup, Input, Button } from 'sveltr';
    import AlignLeftIcon from '$lib/icons/AlignLeft.svelte';
    import AlignCenterIcon from '$lib/icons/AlignCenter.svelte';
    import AlignRightIcon from '$lib/icons/AlignRight.svelte';

    const sizes = ['1', '2', '3'];
</script>

{#each sizes as size}
    <InputGroup>
        <Button variant="clear" {size} iconOnly active>
            <AlignLeftIcon />
        </Button>
        <Button variant="clear" {size} iconOnly>
            <AlignCenterIcon />
        </Button>
        <Button variant="clear" {size} iconOnly>
            <AlignRightIcon />
        </Button>
    </InputGroup>
{/each}
```

### Button radius

<SampleButtonRadius/>

```svelte
<script>
    import { InputGroup, Button } from 'sveltr';

    const radiusList = ['none', 'small', 'medium', 'large'];
</script>

{#each radiusList as radius}
    <InputGroup>
        <Button variant="soft" color="primary" {radius} active>one</Button>
        <Button variant="soft" color="primary" {radius}>two</Button>
        <Button variant="soft" color="primary" {radius}>three</Button>
    </InputGroup>
{/each}
```

### Input + Select

<SampleInputSelect/>

```svelte column
<script>
    import { InputGroup, Input, Select, Button } from 'sveltr';

    const selectOptions = [
        {
            label: 'opt1',
            value: 'opt1'
        },
        {
            label: 'opt2',
            value: 'opt2'
        },
        {
            label: 'opt3',
            value: 'opt3'
        }
    ];

    const selectOptionsAlt = [
        {
            label: 'option 1',
            value: 'opt1'
        },
        {
            label: 'option 2',
            value: 'opt2'
        },
        {
            label: 'option 3',
            value: 'opt3'
        }
    ];
</script>

<InputGroup>
    <Input />
    <Select options={selectOptions} />
</InputGroup>

<InputGroup>
    <Button variant="soft">button</Button>
    <Select options={selectOptionsAlt} />
</InputGroup>

<InputGroup style="width: 100%;">
    <Button variant="soft" iconOnly>+</Button>
    <Select options={selectOptionsAlt} class="flex-grow-1" />
    <Button variant="soft">button</Button>
</InputGroup>
```

### Button + Input

<SampleInputButton/>

```svelte column
<script>
    import { InputGroup, Input, Button } from 'sveltr';
</script>

<InputGroup>
    <Button variant="soft">button</Button>
    <Input />
</InputGroup>

<InputGroup>
    <Input />
    <Button variant="soft">button</Button>
</InputGroup>

<InputGroup>
    <Button variant="soft">button</Button>
    <Input />
    <Button variant="soft">button</Button>
</InputGroup>

<InputGroup>
    <Input />
    <Button variant="soft">button</Button>
    <Input />
</InputGroup>

<InputGroup>
    <Button variant="soft">button</Button>
    <Button variant="soft">button</Button>
    <Input />
</InputGroup>
```

### Button icon + Input

<SampleInputButtonIcon/>

```svelte column
<script>
    import { InputGroup, Input, Button } from 'sveltr';
    import PlusIcon from '$lib/icons/Plus.svelte';
</script>

<InputGroup>
    <Button variant="soft" iconOnly>
        <PlusIcon />
    </Button>
    <Input />
</InputGroup>

<InputGroup>
    <Input />
    <Button variant="soft" iconOnly>
        <PlusIcon />
    </Button>
</InputGroup>

<InputGroup>
    <Input />
    <Button variant="soft" iconOnly>@</Button>
    <Input />
</InputGroup>

<InputGroup>
    <Button variant="soft" iconOnly>$</Button>
    <Input />
    <Button variant="soft" iconOnly>
        <PlusIcon />
    </Button>
</InputGroup>
<InputGroup>
    <Button variant="soft" iconOnly>$</Button>
    <Button variant="clear" iconOnly>%</Button>
    <Button variant="clear" iconOnly>
        <PlusIcon />
    </Button>
    <Input />
</InputGroup>
```
