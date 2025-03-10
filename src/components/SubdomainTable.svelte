<script>
    export let subdomains = [];

    let collapsed = false;

    function toggleCollapse() {
        collapsed = !collapsed;
    }
</script>

<div class="subdomains-card">
    <div class="subdomains-header">
        <h3>Subdomains</h3>
        {#if subdomains.length !== 0}
            <button on:click={toggleCollapse}>
                {#if collapsed} Show {:else} Hide {/if}
            </button>
        {/if}
    </div>

    {#if !collapsed}
        <table class="subdomains-table">
            <thead>
            <tr>
                <th>Subdomain</th>
                <th>IPs</th>
            </tr>
            </thead>
            <tbody>
            {#if subdomains.length === 0}
                <tr>
                    <td>No subdomains scanned.</td>
                    <td></td>
                </tr>
            {/if}
            {#each subdomains as sub}
                <tr>
                    <td>{sub.name}</td>
                    <td>
                        {#if sub.ips && sub.ips.length > 0}
                            {sub.ips.join(", ")}
                        {:else}
                            N/A
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
</div>

<style>
    .subdomains-card {
        margin-top: 1rem;
        background-color: #1f1f1f;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
        animation: fadeInUp 0.4s ease-in-out;
    }
    .subdomains-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    .subdomains-header h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #fff;
    }
    .subdomains-header button {
        background: none;
        color: #7DCE82;
        border: 1px solid #7DCE82;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.4s;
    }
    .subdomains-header button:hover {
        background-color: #7DCE82;
        color: white;
    }
    .subdomains-header button:focus {
        outline: none;
    }

    .subdomains-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.5rem;
    }
    .subdomains-table th,
    .subdomains-table td {
        border-bottom: 1px solid #333;
        padding: 0.6rem;
        color: #ccc;
    }
    .subdomains-table th {
        text-align: left;
        font-weight: 600;
        background-color: #2a2a2a;
    }
    .subdomains-table tr:hover td {
        background-color: #2a2a2a;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(15px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
