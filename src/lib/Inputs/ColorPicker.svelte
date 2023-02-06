<script lang="ts">
    export let color = "#333";
</script>

<div class="color-picker">
    <input type="text" bind:value={color}>
    <input type="color" bind:value={color}>
</div>

<style lang="scss">
    .color-picker {
        display: flex;
        align-items: center;
    }
    input[type="color"] {
        width: 36px;
        height: 36px;
    }
    input[type="text"] {
        appearance: none;
        background-color: #333;
        width: 90px;
        height: 25px;
        text-align: center;
    }
</style>