<script lang="ts">
    import { shell } from "@tauri-apps/api";
    import { makeEmptyFile, openFile, openNewWindow, saveFile } from "./scripts/file";
    import Settings from "./Settings.svelte";

    export let open;
    export let button;
    
    let settingsbutton;
</script>

<svelte:window on:click={(e) => {
    if (open && !button.contains(e.target)) {
        open = false;
    }
}}></svelte:window>

{#if open}
    <div id="menu">
        <ul>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={() => {makeEmptyFile();}}>
                <div>New File</div><div class="shortcut">Ctrl + N</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={async () => {await openNewWindow()}}>
                <div>New Window</div><div class="shortcut">Ctrl + Shift + N</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={async() => {await openFile()}}>
                <div>Open...</div><div class="shortcut">Ctrl + O</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={async() => {await saveFile();}}>
                <div>Save...</div><div class="shortcut">Ctrl + S</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={async() => {await saveFile(true);}}>
                <div>Save As...</div><div class="shortcut">Ctrl + Shift + S</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={() => {
                //TODO: fix content from getting cutoff somehow
                window.print();
            }}>
                <div>Print...</div><div class="shortcut">Ctrl + P</div>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" bind:this={settingsbutton} on:click={() => {
                new Settings({target: document.getElementById("container")});
            }}>
                <div>Settings</div><div class="shortcut"></div>
            </li>
            <div class="divider"></div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="menu-item" on:click={() => {shell.open("https://github.com/mellobacon/CorePad")}}>
                <div>About</div><div class="shortcut"></div>
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
        box-shadow: 2px 2px 2px rgb(0 0 0 / 21%);
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
    }
    .divider {
        height: 0.675px;
        background-color: #333;
        margin: 5px 0px;
    }
</style>