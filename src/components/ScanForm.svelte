<script xmlns="http://www.w3.org/1999/html">
    import {pluginsCount} from "../stores.js";
    import {getPluginsCount} from "../api.js";
    import {onMount} from "svelte";

    onMount(async () => {
        await getPluginsCount();
    })

    // We'll accept a callback prop for the scanning action
    export let onStartScan = ({ targets, mode }) => {};

    // Local state for text area and scan mode
    let targetList = "";
    let mode = "tcp";

    function submitMultiForm(event) {
        event.preventDefault();
        // Split on new lines, trim each line, and ignore empty ones
        const lines = targetList
            .split(/\r?\n/)
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        // Pass this array to the parent callback
        onStartScan({ targets: lines, mode });
    }
</script>

<form on:submit={submitMultiForm}>
    <div class="form-group">
        <label for="targetList">Targets (one per line):</label>
        <textarea
                id="targetList"
                bind:value={targetList}
                rows="6"
                placeholder="e.g.\nhttps://example.com\n192.168.1.0\n..."
        />
    </div>

    <div class="form-group">
        <label for="mode">Scan Mode:</label>
        <select id="mode" bind:value={mode}>
            <option value="tcp">TCP Connect</option>
            <option value="syn">SYN</option>
            <option value="banner">Banner Grabber</option>
        </select>
    </div>

    <button type="submit" disabled={$pluginsCount.plugins === 0}>Start Multi-Target Scan</button>
    {#if $pluginsCount.plugins === 0}
        <p>You haven't enabled any plugins. Check Settings!</p>
    {/if}
</form>

<style>
    .form-group {
        margin-bottom: 1rem;
    }
    label {
        display: block;
        margin-bottom: 0.4rem;
        font-weight: 500;
        color: #bbb;
    }
    textarea,
    select {
        width: 100%;
        padding: 0.7rem;
        border: 1px solid #444;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 0.95rem;
        background-color: #2a2a2a;
        color: #eee;
    }
    textarea {
        resize: vertical; /* Allow vertical resizing */
    }
    button {
        padding: 0.7rem 1.4rem;
        font-size: 0.95rem;
        background-color: #69ad6d;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
    }
    button:hover {
        background-color: #437646;
    }
    button:disabled {
        cursor: not-allowed;
    }
</style>
