<script lang="ts">
    import Selectors from "./Inputs/Selectors.svelte";

</script>

<div id="overlay">
    <div id="settings">
        <div class="title">
            <div class="header">Personalization</div>
            <div class="divider"></div>
        </div>
        <div class="setting">
            <div class="subtitle">Theme</div>
            <Selectors />
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
        background-color: #4141411a;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #settings {
        width: 60%;
        height: 70%;
        background-color: #1f1f1f;
        box-shadow: 0px 0px 19px 4px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        padding: 20px;
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
        }
        .divider {
            height: 0.675px;
            margin: 10px 30px;
            background-color: #333;
        }
    }
</style>