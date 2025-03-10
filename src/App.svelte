<script>
  import {routes} from "./routes.js";
  import Router from "svelte-spa-router";
</script>

<header class="header">
  <h1>Go VScanner Tool</h1>
  <nav class="top-nav">
    <!--
      Use standard anchor tags with #
      (or programmatic navigation)
      for svelte-spa-router
    -->
    <a href="#/">Dashboard</a>
    <a href="#/scan">Scan</a>
    <a href="#/history">Scan History</a>
    <a href="#/settings">Settings</a>
  </nav>
</header>

<div class="container">
  <aside class="sidebar">
    <nav>
      <ul>
        <li><a href="#/">Overview</a></li>
        <li><a href="#/scan">Active Scans</a></li>
        <li><a href="#/history">Reports</a></li>
        <li><a href="#/settings">Settings</a></li>
      </ul>
    </nav>
  </aside>

  <main class="content">
    <!-- This is where page content goes -->
    <Router {routes} />
  </main>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  /* Universal reset */
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #121212;
    color: #ccc;
    font-family: 'Inter', sans-serif;
    /* Let the main content area handle vertical scrolling. */
    overflow: hidden; /* Hide global scrollbars; main content will scroll. */
  }

  /* HEADER (FIXED AT TOP) */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    display: flex;
    align-items: center;
    background-color: #1f1f1f;
    padding: 0 2rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
  .header h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .top-nav {
    margin-left: auto; /* Push links to the right */
    display: flex;
    gap: 1rem;
  }
  .top-nav a {
    color: #bbb;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .top-nav a:hover {
    color: #fff;
  }

  /* SIDEBAR (FIXED AT LEFT) */
  .sidebar {
    position: fixed;
    top: 64px;          /* Below the fixed header */
    left: 0;
    bottom: 0;          /* Span full height minus header */
    width: 220px;
    background-color: #1f1f1f;
    color: #ccc;
    padding: 1.5rem 1rem;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.4);
    overflow-y: auto;   /* Scroll inside sidebar if needed */
    z-index: 99;        /* Just below the header in layering */
  }
  .sidebar nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .sidebar nav ul li {
    margin-bottom: 1rem;
  }
  .sidebar nav ul li a {
    display: block;
    padding: 0.5rem 0.8rem;
    color: #aaa;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
  }
  .sidebar nav ul li a:hover {
    background-color: #2a2a2a;
    color: #fff;
  }

  /* MAIN CONTENT (SCROLLS) */
  /* Offset for header (64px) and sidebar (220px) */
  .content {
    position: absolute;
    top: 64px;
    left: 220px;
    right: 0;
    bottom: 0;
    padding: 1rem 2rem;
    overflow-y: auto;  /* This is where vertical scrolling happens */
    background-color: #121212;
  }

  /* Additional text / results, etc. */
  .content p {
    font-size: 1rem;
    margin: 1rem 0;
    color: #ccc;
  }
  .content p[style*="color: red"] {
    font-weight: 500;
    color: #ff6868;
  }
  .content pre {
    background: #1f1f1f;
    color: #eee;
    padding: 1rem;
    border-radius: 6px;
    overflow: auto;
    max-width: 700px;
    margin-top: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  /* FADE-IN ANIMATION */
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




