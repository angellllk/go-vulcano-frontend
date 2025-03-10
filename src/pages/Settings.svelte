<script>
    import { saveSettings } from '../api.js';
    import { loading } from "../stores.js";

    let portScannerSettings = {
        start_port: 1,
        end_port: 1024,
        timeout: 500,
        min_workers: 50,
        max_workers: 300,
        idle_timeout: 200,
        rate_limit: 10
    };

    let pluginsList = [
        { id: 'port_scanner', label: 'Port Scanner' },
        { id: 'dns_resolver', label: 'DNS Resolver' },
        { id: 'web_scanner', label: 'Web Scanner' },
    ];

    let plugins = {
        port_scanner: false,
        dns_resolver: false,
        web_scanner: false,
    };

    let error = "";
    let success = false;

    async function handleSaveSettings() {
        loading.set(true);
        error = "";
        success = false;
        try {
            await saveSettings(portScannerSettings, plugins);
            success = true;
        } catch (err) {
            error = err.message;
        } finally {
            loading.set(false);
        }
    }
</script>

<div class="settings-page">
    <div class="settings-card">
        <form on:submit|preventDefault={handleSaveSettings}>
            <h2 class="settings-title">Plugins Settings</h2>
            {#if error}
                <p class="error-message">{error}</p>
            {/if}
            {#if success}
                <p class="success-message">Settings saved successfully!</p>
            {/if}

            <!-- Plugin checkboxes arranged in a horizontal layout -->
            <div class="plugin-checkboxes">
                {#each pluginsList as pluginItem}
                    <div class="plugin-item">
                        <input
                                id={pluginItem.id}
                                type="checkbox"
                                bind:checked={plugins[pluginItem.id]}
                        />
                        <label for={pluginItem.id}>{pluginItem.label}</label>
                    </div>
                {/each}
            </div>

            {#if plugins.port_scanner}
                <h3 class="section-title">Port Scanner Configuration</h3>

                <div class="form-group">
                    <label for="start_port">Start Port</label>
                    <input
                            id="start_port"
                            type="number"
                            bind:value={portScannerSettings.start_port}
                            min="1"
                            max="65535"
                    />
                </div>

                <div class="form-group">
                    <label for="end_port">End Port</label>
                    <input
                            id="end_port"
                            type="number"
                            bind:value={portScannerSettings.end_port}
                            min="1"
                            max="65535"
                    />
                </div>

                <div class="form-group">
                    <label for="timeout">Timeout (ms)</label>
                    <input
                            id="timeout"
                            type="number"
                            bind:value={portScannerSettings.timeout}
                            min="50"
                            max="10000"
                    />
                </div>

                <div class="form-group">
                    <label for="max_workers">Max Workers</label>
                    <input
                            id="max_workers"
                            type="number"
                            bind:value={portScannerSettings.max_workers}
                            min="1"
                            max="50000"
                    />
                </div>

                <div class="form-group">
                    <label for="idle_timeout">Idle Timeout (ms)</label>
                    <input
                            id="idle_timeout"
                            type="number"
                            bind:value={portScannerSettings.idle_timeout}
                            min="50"
                            max="10000"
                    />
                </div>
            {/if}

            <!-- The Save Settings button is now always visible -->
            <button type="submit" class="save-button">Save Settings</button>
        </form>
    </div>
</div>

<style>
    .settings-page {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 2rem;
        background-color: #121212;
        color: #fff;
    }

    .settings-card {
        width: 100%;
        max-width: 600px;
        background-color: #1f1f1f;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        animation: fadeInUp 0.4s ease-in-out;
    }

    .settings-title {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }

    .section-title {
        margin: 2rem 0 1rem;
        font-size: 1.2rem;
    }

    /* Plugin checkboxes container */
    .plugin-checkboxes {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem; /* spacing between plugin items */
        margin-bottom: 1rem;
    }

    .plugin-item {
        display: flex;
        align-items: center;
        /* optional min-width so they don't collapse too small */
        min-width: 150px;
    }

    .plugin-item label {
        margin-left: 0.5rem;
        color: #ccc;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .form-group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        margin-bottom: 0.4rem;
        font-weight: 500;
        color: #bbb;
    }

    .form-group input {
        width: 100%;
        padding: 0.7rem;
        border: 1px solid #444;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 0.95rem;
        background-color: #2a2a2a;
        color: #eee;
    }

    .form-group input:focus {
        outline: none;
        border-color: #777;
    }

    .error-message {
        color: #e74c3c;
        margin: 0.5rem 0;
    }

    .success-message {
        color: #2ecc71;
        margin: 0.5rem 0;
    }

    .save-button {
        padding: 0.7rem 1.4rem;
        font-size: 0.95rem;
        background-color: #69ad6d;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
        align-self: flex-start;
        margin-top: 1rem;
    }

    .save-button:hover {
        background-color: #437646;
    }

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
