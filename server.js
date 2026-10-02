/**
 * Ariel Usman Portfolio & CMS Backend Server
 * Powered by Node.js, Express, Multer, JWT & Supabase
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ariel_default_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets & web pages
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Authentication Middleware (Khusus Akun Ariel Usman)
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Akses ditolak. Silakan login dengan akun khusus Ariel.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== (process.env.ADMIN_USERNAME || 'arielusman') &&
        decoded.email !== (process.env.ADMIN_EMAIL || 'madeaircun@gmail.com')) {
      return res.status(403).json({ success: false, message: 'Hak akses tidak valid.' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token kadaluarsa atau tidak valid.' });
  }
}

// ==========================================
// AUTH ROUTES
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { identity, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'arielusman';
  const adminEmail = process.env.ADMIN_EMAIL || 'madeaircun@gmail.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'ArielMadeAI2026!';

  const isUserMatch = (identity === adminUser || identity === adminEmail);
  const isPassMatch = (password === adminPass);

  if (!isUserMatch || !isPassMatch) {
    return res.status(401).json({
      success: false,
      message: 'Username / Email atau Password salah. Akun ini khusus untuk Ariel Usman.'
    });
  }

  const token = jwt.sign(
    {
      username: adminUser,
      email: adminEmail,
      name: 'Ariel Usman',
      role: 'ADMIN_OWNER'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Login berhasil. Selamat datang kembali, Ariel!',
    token,
    user: {
      username: adminUser,
      email: adminEmail,
      name: 'Ariel Usman (MADEAI)',
      role: 'Owner'
    }
  });
});

app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    user: req.admin
  });
});

// ==========================================
// PROJECTS API
// ==========================================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await DB.getProjects();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/projects', authenticateAdmin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, url, driveId, category, description } = req.body;
    if (!title || !url || !category) {
      return res.status(400).json({ success: false, message: 'Judul, URL, dan Kategori wajib diisi.' });
    }

    let thumbnailUrl = null;
    if (req.file) {
      thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    const newProject = await DB.addProject({
      title,
      url,
      driveId: driveId || '',
      category,
      description: description || '',
      thumbnail_url: thumbnailUrl
    });

    res.status(201).json({ success: true, message: 'Portofolio berhasil dipublikasikan!', data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    await DB.deleteProject(req.params.id);
    res.json({ success: true, message: 'Portofolio berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CERTIFICATES API
// ==========================================
app.get('/api/certificates', async (req, res) => {
  try {
    const certs = await DB.getCertificates();
    res.json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/certificates', authenticateAdmin, upload.single('certificateFile'), async (req, res) => {
  try {
    const { title, issuer, category, desc } = req.body;
    if (!title || !issuer || !category) {
      return res.status(400).json({ success: false, message: 'Nama, Penerbit, dan Kategori sertifikat wajib diisi.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File dokumen sertifikat wajib diunggah.' });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const newCert = await DB.addCertificate({
      title,
      issuer,
      category,
      path: filePath,
      desc: desc || ''
    });

    res.status(201).json({ success: true, message: 'Sertifikat berhasil diunggah dan disimpan!', data: newCert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/certificates/:id', authenticateAdmin, async (req, res) => {
  try {
    await DB.deleteCertificate(req.params.id);
    res.json({ success: true, message: 'Sertifikat berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// VAULT (IMPORTANT FILES) API
// ==========================================
app.get('/api/vault', authenticateAdmin, async (req, res) => {
  try {
    const files = await DB.getVaultFiles();
    res.json({ success: true, count: files.length, data: files });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/vault', authenticateAdmin, upload.single('vaultFile'), async (req, res) => {
  try {
    const { fileName, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Pilih berkas yang ingin diamankan.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const newVaultFile = await DB.addVaultFile({
      fileName: fileName || req.file.originalname,
      fileUrl,
      fileType: req.file.mimetype || path.extname(req.file.originalname),
      description: description || ''
    });

    res.status(201).json({ success: true, message: 'Berkas berhasil diamankan di Vault!', data: newVaultFile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/vault/:id', authenticateAdmin, async (req, res) => {
  try {
    await DB.deleteVaultFile(req.params.id);
    res.json({ success: true, message: 'Berkas berhasil dihapus dari Vault.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CONTACT MESSAGE LOG API
// ==========================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const log = await DB.addContactLog({ name, email, message, ip: req.ip });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CLEAN URL PAGE ROUTES
// ==========================================
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/sertifikat', (req, res) => res.sendFile(path.join(__dirname, 'sertifikat-view.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// Start Server (Only when run directly via Node.js, not when imported as serverless function)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Ariel Usman Portfolio & CMS Server running!`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`🔒 CMS Admin: http://localhost:${PORT}/admin.html`);
    console.log(`📁 API Projects: http://localhost:${PORT}/api/projects`);
    console.log(`====================================================`);
  });
}

// Export app for Vercel serverless execution
module.exports = app;

