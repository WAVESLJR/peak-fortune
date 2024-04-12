<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
  
    export let labelText = 'Privacy Policy'
    let modalOpen = false;
    const dispatch = createEventDispatcher();
  
    onMount(() => {
      document.body.style.overflow = 'auto'; // Ensure body scrolling is enabled initially
    });
  
    function openModal() {
      modalOpen = true;
      document.body.style.overflow = 'hidden'; // Disable body scrolling when modal is open
    }
  
    function closeModal() {
      modalOpen = false;
      document.body.style.overflow = 'auto'; // Enable body scrolling when modal is closed
    }
  </script>
  
  <style>

    :root {
      --color-red: #ef6161;
      --color-yellow: #f4e734;
      --color-black: #333333;
    }

    .modal {
      /* display: none; */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background-color: #333;
      padding: 20px;
      border-radius: 10px;
      max-width: 90%;
      max-height: 90%;
      overflow-y: auto;
    }
  
    .modal-content {
      padding: 20px;
      border-radius: 10px;
      overflow: auto;
    }
  
    .modal-button {
      cursor: pointer;
      margin:  10px;
      padding: 5px 10px;
      font-size: 18px;
      font-weight: 500;
      background-color: var(--color-yellow);
      color: var(--color-black);
      border: var(--color-black) 1px solid;
      border-radius: 10px;
    }

    .modal-button:hover {
        border-color: var(--color-yellow);
        color: var(--color-yellow);
        background-color: var(--color-black);
    }

    .close-container {
        margin: 20px auto;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    .close {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 35px;
        font-weight: 600;
        text-decoration: none;
        background-color: var(--color-red);
        color: var(--color-white);
        padding: 10px 50px;
        border: var(--color-white) 2px solid;
        border-radius: 10px;
    }

    .close:hover {
        border-color: var(--color-red);
        color: var(--color-red);
        background-color: var(--color-white);
    }
  </style>
  
  <button class="modal-button" on:click={openModal} aria-label={labelText}>{labelText}</button>
  
  {#if modalOpen}
    <div class="modal">
      <div class="modal-content">
        <slot />
        <div class="close-container">
            <a href="#/" on:click={closeModal} aria-label="Close" class="close">Close</a>
        </div>
      </div>
    </div>
  {/if}
  