<script lang="ts">
  import GameBoard from './lib/GameBoard.svelte';
  import Modal from './lib/Modal.svelte';
  import PrivacyPolicy from './lib/PrivacyPolicy.svelte';
  import Instructions from './lib/Instructions.svelte';
  import { setContext } from 'svelte';

  setContext('placeholder', '🎁');
  setContext('good','💎');
  setContext('bad','💣');
  setContext('suprise','💰');

</script>

<main>
  <GameBoard />
</main>

<footer>
  <Modal>
    <PrivacyPolicy />
  </Modal>
  <Modal labelText="Instructions">
    <Instructions />
  </Modal>
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    padding: auto 10px;
    margin: 30px auto;
  }
</style>
