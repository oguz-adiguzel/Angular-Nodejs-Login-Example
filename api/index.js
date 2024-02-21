const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

const jwtScret = 'abc'

app.use(express.json())
app.use(cors())

// MongoDB Connext
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

//Middleware

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // request gelen tokenı al

  if (!token) {
    return res.status(403).json({ message: 'Token bulunamadı', });
  }

  jwt.verify(token, jwtScret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Geçersiz token', status:401 });
    }

    // Token doğru ise, kullanıcı id'sini request objesine ekleyerek devam et
    req.userId = decoded.userId;
    next();
  });
};

// Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username })

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış', status:401 });
    }

    const token = jwt.sign({ userId: user._id }, jwtScret, {
      expiresIn: '1m',
    });

    res.status(200).json({ token : token, message:'Giriş Yapıldı', status:200 });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Sunucu hatası', status: 500 });
  }
});

app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı', status:404 });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profil hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', status:500});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
