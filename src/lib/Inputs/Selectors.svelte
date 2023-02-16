<script lang="ts">
    export let items = [
        {name: "N/A", action: () => {console.log()}},
    ];
    export let selected: string;
</script>

<div class="radios">
    {#each items as item}
        <label for={item.name} class="radio">
            <input type="radio" name="radio" id={item.name} checked={selected === item.name.toLowerCase()} on:input={item.action}>
            {item.name}
        </label>
    {/each}
</div>

<style lang="scss">
    .radios {
        display: flex;
        flex-direction: column;
    }
    .radio {
        display: flex;
        align-items: center;
    }
    input[type="radio"] {
        appearance: none;
        margin: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        &:checked::before {
            transform: scale(1);
        }
        &::before {
            content: "";
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            transition: 120ms transform ease-in-out;
            transform: scale(0);
        }
    }
</style>