import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DIST_DIR = path.join(__dirname, 'dist');
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const DB_FILE = path.join(DATA_DIR, 'db.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Helper to initialize files if empty
const initJSONFile = (filePath, defaultVal) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf8');
  }
};

initJSONFile(DB_FILE, {});
initJSONFile(RESERVATIONS_FILE, []);
initJSONFile(REVIEWS_FILE, []);

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;

  // ─── API ENDPOINTS ──────────────────────────────────────────

  // GET /api/state
  if (pathname === '/api/state' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read local state database' }));
    }
    return;
  }

  // POST /api/state
  if (pathname === '/api/state' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { key, data } = payload;
        if (!key) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Key is required' }));
          return;
        }

        const currentDB = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '{}');
        currentDB[key.toLowerCase()] = data;
        fs.writeFileSync(DB_FILE, JSON.stringify(currentDB, null, 2), 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to write local state database' }));
      }
    });
    return;
  }

  // GET /api/reservations
  if (pathname === '/api/reservations' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read reservations database' }));
    }
    return;
  }

  // POST /api/reservations
  if (pathname === '/api/reservations' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const newBooking = JSON.parse(body);
        const reservations = JSON.parse(fs.readFileSync(RESERVATIONS_FILE, 'utf8') || '[]');
        
        // Add timestamp & ID
        newBooking.id = newBooking.id || Math.random().toString(36).substr(2, 9);
        newBooking.created_at = newBooking.created_at || new Date().toISOString();
        reservations.unshift(newBooking); // newest first
        
        fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2), 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, booking: newBooking }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save reservation' }));
      }
    });
    return;
  }

  // GET /api/reviews
  if (pathname === '/api/reviews' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read reviews database' }));
    }
    return;
  }

  // POST /api/reviews
  if (pathname === '/api/reviews' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const newReview = JSON.parse(body);
        const reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8') || '[]');
        
        // Add timestamp & ID
        newReview.id = newReview.id || Math.random().toString(36).substr(2, 9);
        newReview.created_at = newReview.created_at || new Date().toISOString();
        reviews.unshift(newReview); // newest first
        
        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, review: newReview }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save review' }));
      }
    });
    return;
  }

  // ─── STATIC STATIC FILE SERVING WITH SPA ROUTING FALLBACK ───
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  // If client requests directory or endpoint not matching api, serve index.html
  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (filePath.endsWith('index.html')) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Rever Cafe Local Server Setup</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F5F0E8; color: #1A1A1A; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: white; padding: 40px; border: 1px solid #C9A84C; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    h1 { color: #8B0000; margin-top: 0; font-family: serif; font-size: 32px; }
    p { line-height: 1.6; font-size: 15px; }
    pre { background: #1E1E1E; color: #9CDCF0; padding: 15px; overflow-x: auto; font-family: monospace; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Vite Build Required</h1>
    <p>The standalone server is running, but the React build (the <code>dist</code> folder) was not found. Please compile the application to generate the production assets.</p>
    <p>Run this command in your project directory terminal:</p>
    <pre>npm run build</pre>
    <p>After compiling completes, refresh this page to view the website!</p>
  </div>
</body>
</html>`);
          return;
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }
      
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Rever Cafe Standalone Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your web browser`);
});
