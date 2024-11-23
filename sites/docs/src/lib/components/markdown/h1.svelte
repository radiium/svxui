<script lang="ts">
    import { Text } from 'svxui';
    import type {
        TextBaseProps,
        TextHeadingProps
    } from '../../../../../../packages/svxui/dist/components/text/types';
    import type { Snippet } from 'svelte';

    type Props = TextBaseProps &
        TextHeadingProps & {
            id?: string;
            children?: Snippet;
        };

    let { id = '', children, ...rest }: Props = $props();
</script>

<Text as="h1" size="8" weight="bold" {id} class="markdown mb-3" {...rest}>
    {@render children?.()}
</Text>
