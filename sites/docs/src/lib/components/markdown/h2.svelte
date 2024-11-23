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

<Text as="h2" size="6" weight="bold" {id} class="markdown mt-7 mb-3" {...rest}>
    {@render children?.()}
</Text>
