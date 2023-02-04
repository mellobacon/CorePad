<script lang="ts">
  import { setZoom } from "../Editor.svelte";


    export let min;
    export let max;
    export let value;
</script>

<div id="slider">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="slider-button" on:click={() => {value--; setZoom(value/6.25);}}>-</div>
    <input bind:value={value} id="sliderinput" type="range" min={min} max={max} class="sliderinput" on:input={() => {
        setZoom(value/6.25);
    }}
    >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="slider-button" on:click={() => {value++; setZoom(value/6.25);}}>+</div>
</div>
<div id="slider-info">
    <span class="minus">10%</span>
    <label class="label" for="sliderinput">{value}%</label>
    <span class="plus">500%</span>
</div>

<style lang="scss">
    #slider, #slider-info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }
    #slider-info {
        width: 75%;
        justify-content: space-between;
        margin-top: -20px;
        span {
            font-size: 10px;
            text-align: center;
        }
    }
    .sliderinput {
        appearance: none;
        width: 100%;
        height: 2px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
        border-radius: 5px;
        &:hover {
            opacity: 1;
        }
        &::-webkit-slider-thumb {
            appearance: none;
            width: 7px;
            height: 20px;
            border-radius: 5px;
            background: #04AA6D;
            cursor: pointer;
        }
    }
    .slider-button {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border-radius: 2px;
        flex-direction: column;
        &:hover {
            background-color: #333;
            cursor: pointer;
        }
    }
</style>