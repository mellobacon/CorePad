<script lang="ts">
    import { makeEmptyFile, openFile, saveFile } from "./scripts/file";
    import Settings from "./Settings.svelte";

    export let open;
    export let button;

    let opensettings;
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
            <li class="menu-item" on:click={async () => {
                let webview = await import("@tauri-apps/api/window");
                let label = (0|Math.random()*6.04e7).toString(36);
                const window = new webview.WebviewWindow(label, {url: "http://localhost:1420", decorations: false});
                window.once('tauri://created', function (w) {
                    // webview window successfully created
                    console.log("webview window successfully created");
                })
                window.once('tauri://error', function (e) {
                    // an error occurred during webview window creation
                    console.log("an error occurred during webview window creation");
                })
            }}>
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
</style>