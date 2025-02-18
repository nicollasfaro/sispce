const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db; // Obtenha o banco de dados simulado
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json({ token: user.token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
