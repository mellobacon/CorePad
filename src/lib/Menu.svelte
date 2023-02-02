<script lang="ts">
    export let open;
    export let button;
</script>

<svelte:window on:click={(e) => {
    if (open && !button.contains(e.target)) {
        open = false;
    }
}}></svelte:window>

{#if open}
    <div id="menu">
        <ul>
            <li class="menu-item">
                <div>New File</div><div class="shortcut">Ctrl + N</div>
            </li>
            <li class="menu-item">
                <div>New Window</div><div class="shortcut">Ctrl + Shift + N</div>
            </li>
            <li class="menu-item">
                <div>Open...</div><div class="shortcut">Ctrl + O</div>
            </li>
            <li class="menu-item">
                <div>Save...</div><div class="shortcut">Ctrl + S</div>
            </li>
            <li class="menu-item">
                <div>Save As...</div><div class="shortcut">Ctrl + Shift + S</div>
            </li>
            <li class="menu-item">
                <div>Print...</div><div class="shortcut">Ctrl + P</div>
            </li>
            <li class="menu-item">
                <div>Settings</div><div class="shortcut">Ctrl + Shift + N</div>
            </li>
        </ul>
    </div>
{/if}

<style lang="scss">
    #menu {
        position: absolute;
        z-index: 9999;
        min-width: 250px;
        padding: 5px 0;
        top: 30px;
        font-size: 14px;
    }
    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: space-between;
        padding: 3px 10px;
        .shortcut{
            color: #454545;
            width: 93px;
            font-size: 13px;
        }
        &:hover {
            background-color: #2b2b2b;
        }
    }
</style>