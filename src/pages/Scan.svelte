<script>
    import ScanForm from "../components/ScanForm.svelte";
    import ScanResults from "../components/ScanResults.svelte";
    import { startScan } from '../api.js';
    import { loading, scanResults } from '../stores.js';

    let error = "";

    async function handleStartScan({ targets, mode }) {
        loading.set(true);
        scanResults.set([]);

        error = "";
        try {
            await startScan(targets, mode);
        } catch (err) {
            error = err.message;
        } finally {
            loading.set(false);
        }
    }
</script>

<div class="scan-container">
    <div class="card result-card">
        <h2>Multi-Target Scan Form</h2>
        <ScanForm onStartScan={handleStartScan} />
    </div>

    {#if $loading}
        <p>Scanning in progress...</p>
    {/if}

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</div>

<ScanResults results={$scanResults.scan_results || []} />

<style>
    .scan-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        animation: fadeInUp 0.4s ease-in-out;
    }

    /* Each result is in a card */
    .result-card {
        width: 100%; /* Fill the container’s width up to max-width */
        max-width: 800px;
        background-color: #1f1f1f;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        padding: 1rem 1.5rem;
        margin-bottom: 1.2rem;
    }

    /* Ports row */
    .ports-row strong {
        color: #ccc;
        margin-right: 0.5rem;
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