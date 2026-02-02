<script lang="ts">
    let { data } = $props();
    let { Component, ...restProps } = $derived(data);
</script>

<Component {...restProps} />
