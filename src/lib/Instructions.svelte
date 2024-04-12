<script lang="ts">
    import { getContext } from "svelte";

    // Declare variables for dynamic options
    let placeholder: string = ` ${getContext('placeholder')} `
    let optionA: string = ` ${getContext('good')} `;
    let optionB: string = ` ${getContext('bad')} `;
    let optionC: string = ` ${getContext('suprise')} `;
</script>

<div>
    <h1>Game Rules:</h1>
    <ol>
        <li>
            <strong>{placeholder} Options and Rounds:</strong>
            <p>
                In each round, there are 25 {placeholder} displayed. Players can
                click on each {placeholder} once to reveal one of three options:
                <em>{optionA}</em>, <em>{optionB}</em>, or <em>{optionC}</em>.
            </p>
        </li>
        <li>
            <strong>Point System:</strong>
            <p>
                Revealing <em>{optionA}</em> earns the player 10 points. If a
                {placeholder} reveals <em>{optionB}</em>, the round immediately ends,
                and the player loses potential points for that round but doesn't
                incur additional penalties.
            </p>
        </li>
        <li>
            <strong>Ending the Round:</strong>
            <p>
                The round ends when either the player reveals a {placeholder} with <em
                    >{optionB}</em
                >
                or when the player clicks the confirm button, provided they have
                revealed at least one {placeholder}, and none of the revealed {placeholder}
                are <em>{optionB}</em>.
            </p>
        </li>
        <li>
            <strong>Calculating Points:</strong>
            <p>
                Upon confirming the round's end, players earn points based on
                the number of <em>{optionA}</em> revealed. However, if
                there are unrevealed {placeholder} containing <em>{optionC}</em>,
                players lose extra points. The deduction is calculated by
                multiplying the number of revealed <em>{optionA}</em> 
                by the difference between the total number of <em>{optionC}</em>
                and the number of revealed <em>{optionC}</em> 
            </p>
        </li>
        <li>
            <strong>Bonus for Option {optionC}:</strong>
            <p>
                Revealing <em>{optionC}</em> adds a bonus to the total number of
                <em>{optionA}</em> revealed.
            </p>
        </li>
    </ol>
</div>

<style>
    h1 {
        text-align: center;
    }

    p {
        line-height: 200%;
    }

</style>
