import {scanResults, pluginsCount} from "./stores.js";
import {get} from "svelte/store";

export async function startScan(targets, mode) {
    const response = await fetch("http://localhost:8080/scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ targets, mode })
    });
    if (!response.ok) {
        throw new Error("Scan request failed");
    }

    scanResults.set(await response.json());
}

export async function saveSettings(portScannerSettings, plugins) {
    const response = await fetch('http://localhost:8080/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            port_scanner: portScannerSettings,
            plugins: plugins
        })
    });
    if (!response.ok) {
        throw new Error('Failed to save settings');
    }
}

export async function getPluginsCount() {
    const response = await fetch('http://localhost:8080/plugins', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch plugins');
    }

    const data = await response.json();
    console.log("Fetched plugins data:", data); // Check the structure in the console
    pluginsCount.set(data);
}
