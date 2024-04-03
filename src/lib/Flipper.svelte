<script lang="ts">
    import { discoverd } from '../hook/store'

    export let cover: string = '📦'
    export let unveal: string
    export let clicked = false;
    const onClick = () => {
        clicked = true
        discoverd.update(i => [...i, unveal])
    }
</script>

<div>
    {#if !clicked }
        <button class="content" on:click={onClick}>
            {cover}
        </button>
    {:else}
        <span class="content">
            {unveal}
        </span>
    {/if}
</div>

<style>
    div {
        font-size: 100px;
    }

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
    }
</style>