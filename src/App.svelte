<script lang="ts">
    import { onMount } from "svelte";
    import { mountEditor } from "./lib/scripts/file";
    import Titlebar from "./lib/Titlebar.svelte";
    import "./theme.scss"; 

    onMount(() => {
        mountEditor();
    })
</script>

<Titlebar></Titlebar>
<div id="container"></div>

<style lang="scss">
    div {
        width: 100%;
        min-height: calc(100% - 30px);
        overflow: auto;
    }
</style>