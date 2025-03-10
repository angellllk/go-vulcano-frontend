<script>
    import SubdomainTable from "./SubdomainTable.svelte";
    import VulnerabilityTable from "./VulnerabilityTable.svelte";
    export let results = [];

    function formatDuration(val) {
        const num = parseFloat(val);
        if (isNaN(num)) return "0.00s";
        return num.toFixed(2) + "s";
    }
</script>

<div class="results-container">
    {#each results as scan}
        <div class="result-card">
            <div class="row top-row">
                <a href="{scan.target}" target="_blank">
                    <h3 class="target">{scan.target}</h3>
                </a>
                <span class="duration">{formatDuration(scan.duration)}</span>
            </div>

            <div class="row ports-row">
                <strong>Open Ports:</strong>
                {#if scan.ports && scan.ports.length > 0}
                    <div class="ports-list">
                        {#each scan.ports as port}
                            <span class="port-pill">{port}</span>
                        {/each}
                    </div>
                {:else}
                    <span class="no-ports">None</span>
                {/if}
            </div>

            {#if scan.dns && scan.dns.length > 0}
            <div class="row ports-row">
                <strong>DNS:</strong>
                <div class="ports-list">
                    {#each scan.dns as dns}
                        <span class="port-pill">{dns}</span>
                    {/each}
                </div>
            </div>
            {/if}

            <SubdomainTable subdomains={scan.subdomains} />
            <VulnerabilityTable vulnerabilities={scan.vulns} />
        </div>
    {/each}
</div>

<style>
    /* Container for the entire list of results */
    .results-container {
        /* Center the list and constrain its max width */
        width: 100%;
        max-width: 800px; /* Adjust as desired */
        margin: 2rem auto; /* Center horizontally, add top/bottom spacing */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Each result is in a card */
    .result-card {
        width: 100%;            /* Fill the container’s width up to max-width */
        background-color: #1f1f1f;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        padding: 1rem 1.5rem;
        margin-bottom: 1.2rem;
        animation: fadeInUp 0.4s ease-in-out;
    }

    /* Rows within each card */
    .row {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    .row.top-row {
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    /* Target Title */
    .target {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
    }

    /* Duration label (on the right) */
    .duration {
        font-size: 0.9rem;
        color: #bbb;
    }

    /* Ports row */
    .ports-row strong {
        color: #ccc;
        margin-right: 0.5rem;
    }
    .ports-list {
        display: flex;
        flex-wrap: wrap; /* Wrap pills if too many */
        gap: 0.5rem;
    }
    .port-pill {
        background-color: #2a2a2a;
        color: #eee;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-size: 0.9rem;
    }
    .no-ports {
        font-size: 0.9rem;
        color: #999;
        font-style: italic;
    }

    /* Animation */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
