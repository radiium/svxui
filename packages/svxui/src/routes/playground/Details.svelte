<details>
    <summary>
        <slot name="title" />
    </summary>

    <div class="details-content">
        <slot />
    </div>
</details>

<style lang="scss">
    details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;

        summary {
            cursor: pointer;
            margin: 0 var(--space-5);

            &::marker {
                font-size: 1.5em;
            }
        }
    }
</style>
