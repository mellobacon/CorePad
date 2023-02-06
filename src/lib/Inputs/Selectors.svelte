<script lang="ts">
    let items = [
            {name: "Light", action: () => {console.log("e")}},
            {name: "Dark", action: () => {console.log("e")}},
            {name: "Use OS Theme", action: () => {console.log("e")}}
        ];
</script>

<div class="radios">
    {#each items as item}
        <label for={item.name} class="radio">
            <input type="radio" name="radio" id={item.name} checked on:input={item.action}>
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
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: solid 1px white;
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
            box-shadow: inset 1em 1em white;
            background-color: white;
            transform: scale(0);
        }
    }
</style>