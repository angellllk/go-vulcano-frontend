import {writable} from "svelte/store";

export const loading = writable(false);

export const scanResults = writable({
    scan_results: [
        {
            target: "",
            duration: "",
            ports: "",
            dns: [],
            subdomains: [],
            vulns: [],
        }
    ]
});

export const pluginsCount = writable({
    plugins: 0,
});