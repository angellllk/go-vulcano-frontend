<script>
    // In the future, you can fetch historical scans from your backend
    // and display them here in a table or list.
    let historyData = [];
</script>

<div class="card">
    <h2>Scan History</h2>
    {#if historyData.length === 0}
        <p>No history data yet.</p>
    {:else}
        <!-- Show a table or list of historical scans -->
        <ul>
            {#each historyData as item}
                <li>{item.timestamp} - {item.result}</li>
            {/each}
        </ul>
    {/if}
</div>
