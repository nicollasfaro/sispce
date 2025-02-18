const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');  // Importa o módulo cors
const app = express();
const port = 8088;

const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

app.use(bodyParser.json());
app.use(cors());  // Adiciona o middleware cors
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Path for the unified data file
const dbFilePath = path.join(__dirname, 'db.json');

// Helper functions
function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
}

function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const dbData = await readFile();
    const users = dbData.users || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // Gerar um token JWT
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '3h' });

      res.status(200).json({
        message: 'Login successful',
        token: token // Retorna o token junto com a resposta
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error reading users file' });
  }
});

// Course endpoints
app.get('/nce', async (req, res) => {
  try {
    const dbData = await readFile();
    const courses = dbData.nce || [];
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error reading courses file' });
  }
});

// Candidate endpoints
app.get('/candidatos', async (req, res) => {
  try {
    const dbData = await readFile();
    const candidatos = dbData.candidatos || [];
    res.json(candidatos);
  } catch (err) {
    res.status(500).json({ message: 'Error reading candidates file' });
  }
});

app.post('/candidatosParaNce', (req, res) => {
  const candidato = req.body;
  const nceId = candidato.nceId;

  // Carregar o db.json
  const db = require('./db.json');
  
  // Encontrar a NCE correspondente
  const nceIndex = db.nce.findIndex(nce => nce.id === nceId);

  if (nceIndex !== -1) {
    // Adicionar o candidato à lista de candidatos da NCE
    if (!db.nce[nceIndex].candidatos) {
      db.nce[nceIndex].candidatos = [];
    }
    db.nce[nceIndex].candidatos.push(candidato);

    // Salvar o db.json atualizado
    const fs = require('fs');
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

    // Enviar resposta em formato JSON
    res.status(201).json({ message: 'Candidato vinculado à NCE com sucesso!' });
  } else {
    res.status(404).json({ message: 'NCE não encontrada' });
  }
});

// NCE CRUD endpoints
app.post('/nce', async (req, res) => {
  try {
    const dbData = await readFile();
    const courses = dbData.nce || [];
    const newCourse = req.body;

    // Adiciona um novo ID baseado no número de cursos existentes
    newCourse.id = courses.length ? parseInt(courses[courses.length - 1].id) + 1 : 1;
    courses.push(newCourse);

    // Atualiza o arquivo JSON
    dbData.nce = courses;
    await writeFile(dbData);

    res.status(201).send(newCourse);
  } catch (err) {
    res.status(500).send('Erro ao salvar o curso');
  }
});

app.put('/nce/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedCourse = req.body;
  try {
    const dbData = await readFile();
    const courses = dbData.nce || [];
    const index = courses.findIndex(course => course.id === id);
    if (index === -1) return res.status(404).json({ message: 'Course not found' });

    courses[index] = { ...courses[index], ...updatedCourse };
    dbData.nce = courses;
    await writeFile(dbData);
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

app.delete('/nce/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const dbData = await readFile();
    let courses = dbData.nce || [];
    courses = courses.filter(course => course.id !== id);

    dbData.nce = courses;
    await writeFile(dbData);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

// Configuração do multer para armazenar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para o upload de arquivos
app.post('/api/upload/:nceId', upload.array('files'), (req, res) => {
  const nceId = req.params.nceId;
  const files = req.files;

  if (!files) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  // Aqui você pode implementar a lógica para salvar a relação entre os arquivos e o NCE
  // Exemplo: salvar em um banco de dados com nceId

  res.status(200).json({ message: 'Arquivos enviados com sucesso!' });
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${port}`);
});
