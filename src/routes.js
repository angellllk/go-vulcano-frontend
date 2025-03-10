import Dashboard from './pages/Dashboard.svelte';
import Scan from './pages/Scan.svelte';
import History from './pages/History.svelte';
import Settings from './pages/Settings.svelte';

export const routes = {
    '/': Dashboard,
    '/scan': Scan,
    '/history': History,
    '/settings': Settings
};
