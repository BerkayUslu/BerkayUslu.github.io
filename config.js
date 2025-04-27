// config.js
// This file contains the configuration settings for the authentication pages

const config = {
    // Supabase URL and API path
    supabaseUrl: 'https://tvjlbuwerlcjhgjkdwrc.supabase.co',
    supabaseApiPath: '/auth/v1',
    supabaseApiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2amxidXdlcmxjamhnamtkd3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjU4NDcsImV4cCI6MjA1OTU0MTg0N30.JaXaW2AElb-u6o6V_IyRL7DzNJbHUz2UZzdo6tNt0dc', // Add your Supabase anon/public key here

    // URL to redirect to app after successful authentication
    appUrl: 'https://www.inpocket.games'
};

// Export the configuration
export default config;

// You can import this file in your HTML using:
// <script type="module">
//   import config from './config.js';
//   window.appConfig = config;
// </script>