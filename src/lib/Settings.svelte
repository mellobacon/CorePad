<script lang="ts">
    import { setTheme } from "../config/config";
    import ColorPicker from "./Inputs/ColorPicker.svelte";
    import Selectors from "./Inputs/Selectors.svelte";
    import config from "../config/config.json";

    let overlay: HTMLElement;
    let themes = [
        {name: "Light", action: async () => {await setTheme("light")}},
        {name: "Dark", action: async () => {await setTheme("dark")}},
        //{name: "Use OS Theme", action: () => {console.log("e")}}
    ];
</script>

<div id="overlay" bind:this={overlay}>
    <div id="settings">
        <div class="window-controls">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => {overlay.remove();}}></div>
        </div>
        <div class="title">
            <div class="header">Personalization</div>
            <div class="divider"></div>
        </div>
        <div class="setting">
            <div class="subtitle">Theme</div>
            <Selectors selected={config.theme} items={themes} />
        </div>
        <div class="setting">
            <div class="subtitle">Accent Color</div>
            <ColorPicker></ColorPicker>
        </div>
    </div>
</div>

<style lang="scss">
    #overlay {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(1.5px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #settings {
        width: 60%;
        height: 70%;
        box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        padding: 20px;
        .window-controls {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            div {
                height: 25px;
                width: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                &:hover {
                    cursor: pointer;
                }
            }
            div::before {
				content: "\2715";
				line-height: 30px;
			}
        }
        .setting {
            padding-left: 30px;
            margin-top: 7px;
            .subtitle {
                font-size: 1.25rem;
            }
        }
        .header {
            font-size: 1.563rem;
            display: flex;
            justify-content: left;
            align-items: center;
            width: 100%;
            padding-left: 30px;
            margin-top: 20px;
        }
        .divider {
            height: 0.675px;
            margin: 10px 30px;
            background-color: #333;
        }
    }
</style>