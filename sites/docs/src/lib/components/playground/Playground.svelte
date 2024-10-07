<script lang="ts">
    import { useMediaQuery } from 'svxui';
    import { createPlaygroundMask } from './playground-mask';

    export let forceColumn = false;

    const isSmallScreen = useMediaQuery('(max-width: 825px)');
    const { maskStyles, getComponentSize } = createPlaygroundMask();
</script>

<div class="playground-wrapper {$$restProps.class}">
    <div class="preview-contols" class:layout-column={forceColumn || $isSmallScreen}>
        <div class="preview">
            <div class="preview-background">
                {#if $maskStyles}
                    <div
                        class="preview-mask"
                        style:top={$maskStyles.top}
                        style:left={$maskStyles.left}
                        style:height={$maskStyles.height}
                        style:width={$maskStyles.width}
                    ></div>
                {/if}
            </div>
            <div class="preview-content" use:getComponentSize>
                <slot name="component" />
            </div>
        </div>
        {#if $$slots.form}
            <div class="controls">
                <slot name="form" />
            </div>
        {/if}
    </div>
    {#if $$slots.code}
        <div class="result">
            <slot name="code" />
        </div>
    {/if}
</div>

<style lang="scss">
    .playground-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-shadow: 0 0 0 1px var(--slate-a5);
        border-radius: var(--radius-5);
        overflow: hidden;

        .preview-contols {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            min-height: 260px;
            min-width: 350px;

            &.layout-column {
                flex-direction: column;
                flex-wrap: nowrap;
            }

            .preview {
                position: relative;
                flex-grow: 1;

                .preview-background {
                    position: absolute;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    padding: var(--space-9);
                    --dot-bg: var(--color-background-0);
                    --dot-color: var(--slate-9);
                    --dot-size: 1px;
                    --dot-space: 30px;
                    background:
                        linear-gradient(
                                90deg,
                                var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
                                transparent 1%
                            )
                            center / var(--dot-space) var(--dot-space),
                        linear-gradient(
                                var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
                                transparent 1%
                            )
                            center / var(--dot-space) var(--dot-space),
                        var(--dot-color);

                    .preview-mask {
                        position: absolute;
                        background-color: var(--color-background-0);
                    }
                }

                .preview-content {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    min-height: 420px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: var(--space-9);
                }
            }

            .controls {
                min-width: 300px;
                flex-shrink: 0;
                flex: 1;
                background-color: transparent;
                padding: var(--space-5);
                background-color: var(--color-background-2);
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }
        }
    }
</style>
