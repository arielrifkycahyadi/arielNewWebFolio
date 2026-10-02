/**
 * Ariel Usman Portfolio - Universal Web Server & Vercel Entrypoint
 * Handles clean URLs, static assets, and local development seamlessly
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets from root directory
app.use(express.static(__dirname));

// Clean URL Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/sertifikat', (req, res) => res.sendFile(path.join(__dirname, 'sertifikat-view.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// Direct file access for SEO files
app.get('/sitemap.xml', (req, res) => res.sendFile(path.join(__dirname, 'sitemap.xml')));
app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));
app.get('/site.webmanifest', (req, res) => res.sendFile(path.join(__dirname, 'site.webmanifest')));

// Start server when run directly (local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Ariel Usman Portfolio running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

// Export for Vercel Serverless Function runtime
module.exports = app;
