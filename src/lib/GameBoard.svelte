<script lang="ts">
    import { onMount } from "svelte";
    import Flipper from "./Flipper.svelte";
    import { discoverd, record } from "../hook/store";
    import { get } from "svelte/store";


    const placeholder: string = '🎁'
    const good: string = '🧧'
    const bad: string = '🧨'
    const star: string = '🐲'
    const totalCount = 25;
    const badCount = 3;
    const maxStarCount = 3;

    let badOpts: string[]
    let goodOpts: string[]
    let starOpts: string[]
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

        let starCount: number = Math.floor(Math.random() * maxStarCount);
        let goodCount: number = totalCount - starCount - badCount;

        badOpts = new Array(badCount).fill(bad)
        goodOpts = new Array(goodCount).fill(good)
        starOpts = new Array(starCount).fill(star)
        opts = [...goodOpts, ...badOpts, ...starOpts]

       
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
        const starCount = list.filter(i => i === star).length
        const allStarCount = opts.filter(i => i === star).length
        const remainStarCount = allStarCount - starCount
        const stageTotal = (list.filter(i => i === good).length * goodValue) * (remainStarCount == 0 ? starCount + 1 : allStarCount * (starCount - allStarCount))
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
            <button class="restart" on:click={onInit}>Restart</button>
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

    button.restart {
        background-color: var(--color-blue);
    }

    button.restart:hover {
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