<script lang="ts">
    import Editor from "./lib/Editor.svelte";
    import Titlebar from "./lib/Titlebar.svelte";
    import "./theme.scss"; 
</script>

<Titlebar></Titlebar>
<div>
    <Editor></Editor>
</div>

<style lang="scss">
    div {
        width: 100%;
        min-height: calc(100% - 30px);
        overflow: auto;
    }
</style>