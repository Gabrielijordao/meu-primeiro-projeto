const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body || {};
  if (typeof email !== 'string' || typeof senha !== 'string' || !email.trim() || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const empresa = db.prepare('SELECT * FROM empresas WHERE email = ?').get(email.trim());
  if (!empresa || !bcrypt.compareSync(senha, empresa.senha_hash)) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const token = jwt.sign(
    { id: empresa.id, nome: empresa.nome, email: empresa.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({ token, empresa: { id: empresa.id, nome: empresa.nome, email: empresa.email } });
});

module.exports = router;
