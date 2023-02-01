<script lang="ts">
    import { appWindow } from "@tauri-apps/api/window";
</script>
<div id="titlebar">
    <button id="menu">==</button>
    <span id="file-name">Filename.txt</span>
    <div id="handlebar" data-tauri-drag-region></div>
    <div id="window-controls">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button
            class="window-button"
            id="minimize"
            on:click={() => appWindow.minimize()}
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button
            class="window-button"
            id="maximize"
            on:click={async () => { (await appWindow.isMaximized()) ? appWindow.unmaximize() : appWindow.maximize(); }}
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button
            class="window-button"
            id="close"
            on:click={async () => await appWindow.close()}
        />
    </div>
</div>

<style lang="scss">
    $titlebar-height: 30px;
    #titlebar {
        display: flex;
        width: 100%;
        height: $titlebar-height;
        align-items: center;
    }
    #handlebar {
        position: absolute;
        top: 0;
        left: 0;
        width: -webkit-fill-available;
        height: $titlebar-height;
        z-index: 9998;
    }
    #menu {
        height: 100%;
        min-width: 35px;
        z-index: 9999;
    }
    #file-name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: -webkit-fill-available;
    }
    #window-controls {
		margin-left: auto;
		height: 100%;
		display: flex;
		z-index: 9999;
		.window-button {
			min-width: 36px;
			height: 100%;
			line-height: 34px;
			text-align: center;
			padding: 0 5px;
			font-size: 14px;
			color: white;
			cursor: pointer;
			&:not(#close):hover {
				background-color: #262626;
			}
			&#close:hover {
				background-color: #ff3131;
			}
			&#minimize::before {
				content: "\2014";
				font-size: 10px;
			}
			&#maximize::before {
				content: "\eabb"; // replace
			}
			&#close::before {
				content: "\2715";
				line-height: 30px;
			}
		}
	}
</style>