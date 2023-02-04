<script lang="ts">
    import type { Writable } from "svelte/store";
  import Slider from "./Inputs/Slider.svelte";

    export let doc_info: Writable<{ words: number; chars: number; }>;
    export let line_info: Writable<{ ln: string; col: string; }>;
    export let unsaved: Writable<boolean>;
</script>

<div id="status-bar">
    <div id="app-name">CorePad</div>
    <div id="document-info">
        <span class="words" title="{$doc_info.chars} characters">Document Info: {$doc_info.words} words</span>
    </div>
    <div id="file-info">
        <span id="modified" class:modified={$unsaved}>Modified</span>
        <span id="line-info">Ln {$line_info.ln}, Col {$line_info.col}</span>
        <span id="zoom">Zoom: 100%</span>
        <span id="linefeed">CLRF</span>
        <span id="charset">UTF-8</span>
    </div>
</div>

<div id="zoom-slider">
    <Slider min={10} max={500} default_value={100}></Slider>
</div>

<style lang="scss">
    #status-bar {
        min-height: 25px;
        width: 100%;
        box-shadow: 0px -1px 6px rgba(32, 32, 32, 0.25);
        position: relative;
        display: flex;
        align-items: center;
        font-size: 12px;
        cursor: default;
    }
    #document-info {
        display: flex;
        justify-content: flex-start;
    }
    #app-name {
        padding: 0 10px;
        margin-right: 10px;
    }
    #file-info {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
        span {
            padding: 0 10px;
            height: 100%;
            align-items: center;
            &:not(#modified) {
                display: flex;
            }
            &:hover {
                background-color: #333;
                cursor: pointer;
            }
        }
    }
    #modified {
        font-weight: 600;
        display: none;
    }
    .modified {
        display: flex !important;
    }
    #zoom-slider {
        position: absolute;
        width: 250px;
        height: 75px;
        bottom: 30px;
        right: 106px;
        box-shadow: 2px 2px 2px rgb(0 0 0 / 21%);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        padding: 5px;
    }
</style>