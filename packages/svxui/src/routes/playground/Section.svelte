<script lang="ts">
    import { Card } from '$lib/index.js';
    import type { Snippet } from 'svelte';

    interface Props {
        title?: Snippet;
        children?: Snippet;
    }

    let { title, children }: Props = $props();
</script>

<section>
    {@render title?.()}

    <div class="section-content">
        <Card size="0" variant="outline" class="min-width-100 flex-shrink-0" translucent>
            <div class="section-content-inner p-5">
                {@render children?.()}
            </div>
        </Card>
    </div>
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .section-content {
            width: 100%;
            overflow-y: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0 var(--space-5);

            .section-content-inner {
                min-width: 100%;
            }
        }
    }
</style>
