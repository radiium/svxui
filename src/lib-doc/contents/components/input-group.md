---
title: InputGroup
description:
---

<script lang="ts">
    import InputGroup from '$lib/components/InputGroup/InputGroup.svelte';
    import {docInputGroupPropsDefs} from '$lib/components/InputGroup/InputGroup.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

The `<InputGroup/>` can be used for grouping the following components:
`<Input/>`, `<Select/>`, `<Button/>`.

## Examples

#### Button only

```svelte example hideScript
<script>
    import { InputGroup, Button } from 'svxui';
</script>

<InputGroup>
    <Button variant="soft" color="primary" size="3" active>one</Button>
    <Button variant="soft" color="primary" size="3">two</Button>
    <Button variant="soft" color="primary" size="3">three</Button>
</InputGroup>
```

#### Button icon only

```svelte example hideScript
<script>
    import { InputGroup, Input, Button } from 'svxui';
    import AlignLeftIcon from '$lib-doc/icons/AlignLeft.svelte';
    import AlignCenterIcon from '$lib-doc/icons/AlignCenter.svelte';
    import AlignRightIcon from '$lib-doc/icons/AlignRight.svelte';
</script>

<InputGroup>
    <Button variant="clear" size="1" iconOnly active>
        <AlignLeftIcon />
    </Button>
    <Button variant="clear" size="1" iconOnly>
        <AlignCenterIcon />
    </Button>
    <Button variant="clear" size="1" iconOnly>
        <AlignRightIcon />
    </Button>
</InputGroup>
```

#### Input + Select

```svelte example hideScript column
<script>
    import { InputGroup, Input, Select, Button } from 'svxui';

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

#### Button + Input

```svelte example hideScript column
<script>
    import { InputGroup, Input, Button } from 'svxui';
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

#### Button icon + Input

```svelte example hideScript column
<script>
    import { InputGroup, Input, Button } from 'svxui';
    import PlusIcon from '$lib-doc/icons/Plus.svelte';
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

## Playground

<Playground>
    <InputGroup slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={docInputGroupPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docInputGroupPropsDefs}></ApiReference>
