<script>import SidebarSimple from 'phosphor-svelte/lib/SidebarSimple';
import Button from '../components/Button/Button.svelte';
import { editorLayoutStore } from './editor-layout.store.js';
import Toolbar from './Toolbar.svelte';
</script>

<!-- class:has-header={$$slots.header} -->
<div
    class="wrapper"
    class:has-footer={$$slots.footer}
    class:has-toolbar={$$slots.toolbar}
    class:has-left={$$slots.panelLeft}
    class:has-right={$$slots.panelRight}
    class:is-left-open={$editorLayoutStore.isPanelLeftOpen}
    class:is-right-open={$editorLayoutStore.isPanelRightOpen}
>
    <header>
        <!-- <slot name="header">Header</slot> -->
        <Toolbar size="small">
            <svelte:fragment slot="start">
                <slot name="start" />
            </svelte:fragment>

            <svelte:fragment slot="center">
                <slot name="title" />
            </svelte:fragment>

            <svelte:fragment slot="end">
                <slot name="end" />
                {#if $$slots.panelLeft}
                    <Button
                        class="panel-btn"
                        size="1"
                        color="gray"
                        variant="clear"
                        iconOnly
                        on:click={editorLayoutStore.toggleLeft}
                    >
                        <SidebarSimple
                            size={24}
                            weight={$editorLayoutStore.isPanelLeftOpen ? 'fill' : 'regular'}
                        />
                    </Button>
                {/if}

                {#if $$slots.panelRight}
                    <Button
                        class="panel-btn"
                        size="1"
                        color="gray"
                        variant="clear"
                        iconOnly
                        on:click={editorLayoutStore.toggleRight}
                    >
                        <SidebarSimple
                            size={24}
                            weight={$editorLayoutStore.isPanelRightOpen ? 'fill' : 'regular'}
                            mirrored
                        />
                    </Button>
                {/if}
            </svelte:fragment>
        </Toolbar>
    </header>

    <main>
        {#if $$slots.toolbar}
            <aside class="toolbar">
                <slot name="toolbar">Toolbar</slot>
            </aside>
        {/if}

        {#if $$slots.panelLeft}
            <aside class="left">
                <div class="panel-content">
                    <slot name="panelLeft" isPanelLeftOpen={$editorLayoutStore.isPanelLeftOpen}>Left</slot>
                </div>
            </aside>
        {/if}

        <section class="content">
            <slot name="content">Content</slot>
        </section>

        {#if $$slots.panelRight}
            <aside class="right">
                <div class="panel-content">
                    <slot name="panelRight" isPanelRightOpen={$editorLayoutStore.isPanelRightOpen}>Right</slot
                    >
                </div>
            </aside>
        {/if}
    </main>

    {#if $$slots.footer}
        <footer>
            <slot name="footer" />
        </footer>
    {/if}
</div>

<style>:root {
  --layout-header-size: var(--toolbar-size-s);
  --layout-footer-size: var(--toolbar-size-s);
  --layout-toolbar-size: var(--toolbar-size-l);
  --layout-panel-left-size: 250px;
  --layout-panel-right-size: 250px;
  --layout-border-color: rgba(55, 55, 55, 0.2);
}

.wrapper {
  background-color: var(--background-level-0);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  inset: 0 0 0 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--color);
  transition: all ease-in-out 300ms;
}
.wrapper.is-left-open main aside.left {
  transition: width ease-in-out 300ms;
  width: var(--layout-panel-left-size);
  border-width: 0 1px 0 0;
}
.wrapper.is-right-open main aside.right {
  transition: width ease-in-out 300ms;
  width: var(--layout-panel-right-size);
  border-width: 0 0 0 1px;
}
.wrapper header {
  width: 100%;
  height: var(--layout-header-size);
  overflow: hidden;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: var(--layout-border-color);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 5px;
}
.wrapper main {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100% - var(--layout-header-size) - var(--layout-footer-size));
}
.wrapper main aside.toolbar {
  width: var(--layout-toolbar-size);
  height: 100%;
  overflow: hidden;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: var(--layout-border-color);
  flex-shrink: 0;
}
.wrapper main aside.left {
  width: 0;
  height: 100%;
  overflow: hidden;
  border-style: solid;
  border-width: 0;
  border-color: var(--layout-border-color);
  position: relative;
  flex-shrink: 0;
  transition: width ease-in-out 300ms;
}
.wrapper main aside.left .panel-content {
  position: absolute;
  min-width: var(--layout-panel-right-size);
  width: 100%;
  height: 100%;
  overflow: auto;
}
.wrapper main section.content {
  flex: 1 1 0;
  min-width: 0;
  transition: width ease-in-out 300ms;
}
.wrapper main aside.right {
  width: 0;
  height: 100%;
  overflow: hidden;
  border-style: solid;
  border-width: 0;
  border-color: var(--layout-border-color);
  position: relative;
  flex-shrink: 0;
  transition: width ease-in-out 300ms;
}
.wrapper main aside.right .panel-content {
  position: absolute;
  min-width: var(--layout-panel-right-size);
  width: 100%;
  height: 100%;
  overflow: auto;
}
.wrapper footer {
  width: 100%;
  height: var(--layout-footer-size);
  overflow: hidden;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: var(--layout-border-color);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
}

:global(.panel-btn svg) {
  height: unset !important;
}</style>
