<script lang="ts">
    import { getContext, onMount } from "svelte";
    import Flipper from "./Flipper.svelte";
    import { discoverd, record } from "../hook/store";
    import { get } from "svelte/store";


    const placeholder: string = getContext('placeholder')
    const good: string = getContext('good')
    const bad: string = getContext('bad')
    const suprise: string = getContext('suprise')
    const totalCount = 25;
    const badCount = 3;
    const maxSupriseCount = 3;

    let badOpts: string[]
    let goodOpts: string[]
    let supriseOpts: string[]
    let opts: string[]
    let gameOver: boolean = false

    const onShuffle = (array : string[]) => {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    const onInit = () => {

        let supriseCount: number = Math.floor(Math.random() * maxSupriseCount);
        let goodCount: number = totalCount - supriseCount - badCount;

        badOpts = new Array(badCount).fill(bad)
        goodOpts = new Array(goodCount).fill(good)
        supriseOpts = new Array(supriseCount).fill(suprise)
        opts = [...goodOpts, ...badOpts, ...supriseOpts]

       
        onShuffle(opts)
        discoverd.set([])
        gameOver = false
    }

    const onGameOver = (array : string[]) => {
        if(!array.includes(bad) || gameOver) return
        gameOver = true
    }

    const onConfirm = () => {
        gameOver = true
        const list = get(discoverd)
        const goodValue = 10;
        const supriseCount = list.filter(i => i === suprise).length
        const allSupriseCount = opts.filter(i => i === suprise).length
        const remainSupriseCount = allSupriseCount - supriseCount
        const stageTotal = (list.filter(i => i === good).length * goodValue) * (remainSupriseCount == 0 ? supriseCount + 1 : allSupriseCount * (supriseCount - allSupriseCount))
        let profile = get(record)

        profile.attempts += 1
        profile.highest = stageTotal > 0 && profile.highest > stageTotal ? profile.highest : stageTotal;
        profile.remain = profile.remain > 0 ? profile.remain-- : 0
        profile.total += stageTotal
        record.update(i => profile)
    }

    discoverd.subscribe(i => i.includes(bad) && onGameOver(i))

    onInit()

</script>

<nav>
    <h2>
        <span>Total : </span>
        <span class={ $record.total < 0 ? 'deficit' : 'normal' }>{$record.total}</span>
    </h2>
</nav>
<main>
    <section class="game-board">
        {#key gameOver}
            {#each opts as opt}
                <Flipper cover={placeholder} unveal={opt} clicked={gameOver} />
            {/each}
        {/key}
    </section>
    <section class="game-nav">
        { #if gameOver }
            <button class="resupriset" on:click={onInit}>Restart</button>
        { :else if !gameOver && $discoverd.length > 0 }
            <button class="confirm" on:click={onConfirm}>Confirm</button>
        { :else }
            <button class="confirm-disable">Confirm</button>
        { /if }
    </section>
</main>


<style>
    :root {
        --color-blue: #301fec;
        --color-green: #30ad62;
        --color-white: #ffffff;
        --color-deficit: #b10e0e;
    }

    h2 {
        text-align: center;
    }

    h2 > span:first-child {
        margin-right: 10px;
    }

    .deficit {
        color: var(--color-deficit);
    }

    .normal {
        color: var(--color-white);
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .game-board {
        display: grid;
        grid-template-columns: repeat(5, 100px);
        grid-template-rows: repeat(5, 100px);
        border: var(--color-white) 5px solid;
        border-radius: 5px;
    }

    .game-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 40px;
    }

    button {
        width: 200px;
        height: 100px;
        font-size: 50px;
        border-radius: 10px;
        border-width: 2px;
        border-style: solid;
        color: var(--color-white);
        border-color: var(--color-white);
    }

    button.resupriset {
        background-color: var(--color-blue);
    }

    button.resupriset:hover {
        color: var(--color-blue);
        border-color: var(--color-blue);
        background-color: var(--color-white);
    }

    button.confirm {
        background-color: var(--color-green);
    }

    button.confirm:hover {
        color: var(--color-green);
        border-color: var(--color-green);
        background-color: var(--color-white);
    }

    button.confirm-disable {
        pointer-events: none;
    }


</style>