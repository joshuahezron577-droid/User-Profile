const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const db = require('./db');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Serve uploaded files — mtu yeyote anaweza kudownload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config — hifadhi files kwenye backend/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, unique);
  },
});
const upload = multer({ storage });

// Test route
app.get('/', (_req, res) => {
  res.send('Backend Server ya Chuo DB inafanya kazi vizuri!');
});

// 1. REGISTER ROUTE (Inasajili user mpya na kuweka taarifa zake moja kwa moja kwenye DB)
app.post('/api/register', async (req, res) => {
  const { fullName, phone, email, password, role } = req.body;

  if (!fullName || !phone || !email || !password) {
    return res.status(400).json({ success: false, message: 'Tafadhali jaza fomu yote kikamilifu!' });
  }

  try {
    // Angalia kama email imeshatumika
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Email hii imeshatumika tayari!' });
    }

    const userRole = role || 'user';
    await db.query(
      'INSERT INTO users (full_name, phone, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [fullName, phone, email, password, userRole]
    );

    res.status(201).json({ success: true, message: 'Akaunti imetengenezwa kwa mafanikio!' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Hitilafu imetokea kwenye server wakati wa kusajili.' });
  }
});

// 2. LOGIN ROUTE (Inahakiki email na password moja kwa moja bila bcrypt)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Tafadhali weka email na nenosiri!' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Email haijapatikana!' });
    
    const user = rows[0];
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Nenosiri si sahihi!' });
    }

    res.json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Hitilafu imetokea kwenye server.' });
  }
});

// 3. User anawasilisha mradi + file upload (huhifadhi kwa user_id aliyelogin pekee)
app.post('/api/projects', upload.single('file'), async (req, res) => {
  const { userId, projectName } = req.body;
  const fileName = req.file ? req.file.filename : 'Hakuna faili';

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Lazima uingie kwanza!' });
  }
  if (!projectName) {
    return res.status(400).json({ success: false, message: 'Tafadhali jaza jina la mradi!' });
  }

  try {
    const [users] = await db.query('SELECT id, full_name, email FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Mtumiaji hajapatikana!' });
    }
    const user = users[0];

    await db.query(
      'INSERT INTO projects (user_id, full_name, email, project_name, file_name, submissionDate, status) VALUES (?, ?, ?, ?, ?, CURDATE(), ?)',
      [user.id, user.full_name, user.email, projectName, fileName, 'Pending']
    );
    return res.status(201).json({ success: true, message: 'Mradi umehifadhiwa kwenye database kikamilifu!' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: 'Imeshindikana kuhifadhi mradi kwenye server.' });
  }
});

// 4. Admin — Miradi yote (All Users) — bila status
app.get('/api/projects', async (_req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT id, full_name, email, project_name, file_name, submissionDate FROM projects ORDER BY id DESC'
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata orodha ya miradi.' });
  }
});

// 5. Admin — Pending tu
app.get('/api/projects/pending', async (_req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT id, full_name, email, project_name, file_name, submissionDate, status FROM projects WHERE status = ? ORDER BY id DESC',
      ['Pending']
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi inayosubiri.' });
  }
});

// 6. Admin — Task & Report: Approved + Rejected
app.get('/api/projects/verified', async (_req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT id, full_name, email, project_name, file_name, submissionDate, status, verified_file FROM projects WHERE status IN (?, ?) ORDER BY id DESC',
      ['Approved', 'Rejected']
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi iliyokaguliwa.' });
  }
});

// 7. User — projects kwa email (Task & Report page)
app.get('/api/projects/byemail/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const [projects] = await db.query(
      'SELECT id, project_name, file_name, submissionDate, status, verified_file FROM projects WHERE email = ? ORDER BY id DESC',
      [email]
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi ya mtumiaji huyu.' });
  }
});

// 8. User — approved projects kwa email (Active Profile page)
app.get('/api/projects/byemail/:email/approved', async (req, res) => {
  const { email } = req.params;
  try {
    const [projects] = await db.query(
      'SELECT id, project_name, file_name, submissionDate, verified_file FROM projects WHERE email = ? AND status = ? ORDER BY id DESC',
      [email, 'Approved']
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi iliyoidhinishwa.' });
  }
});

// 9. User — approved projects kwa userId
app.get('/api/projects/user/:userId/approved', async (req, res) => {
  const { userId } = req.params;
  try {
    const [projects] = await db.query(
      'SELECT id, project_name, file_name, submissionDate, verified_file FROM projects WHERE user_id = ? AND status = ? ORDER BY id DESC',
      [userId, 'Approved']
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi iliyoidhinishwa.' });
  }
});

// 10. User — projects zake zote (kwa ajili ya dashboard yake binafsi)
app.get('/api/projects/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [projects] = await db.query(
      'SELECT id, project_name, file_name, submissionDate, status, verified_file FROM projects WHERE user_id = ? ORDER BY id DESC',
      [userId]
    );
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kupata miradi ya mtumiaji huyu.' });
  }
});

// 11. Approve au Reject + verified_file upload
app.put('/api/projects/:id', upload.single('verifiedFile'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const verifiedFile = req.file ? req.file.filename : (req.body.verifiedFile || null);

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Status si sahihi!' });
  }
  try {
    await db.query(
      'UPDATE projects SET status = ?, verified_file = ? WHERE id = ?',
      [status, verifiedFile, id]
    );
    res.json({ success: true, message: `Mradi umewekwa: ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kubadilisha status.' });
  }
});

// 12. Futa mradi
app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true, message: 'Mradi umefutwa.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Imeshindikana kufuta mradi.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server inafanya kazi kwenye port ${port}`);
});