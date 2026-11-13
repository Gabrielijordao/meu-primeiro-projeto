
const db = require('./db');
const bcrypt = require('bcryptjs');

// Senha de teste da empresa
const senha = bcrypt.hashSync('123456', 10);

// Cadastrar empresa apenas se não existir
db.prepare(`
  INSERT OR IGNORE INTO empresas (
    id, nome, email, senha_hash
  )
  VALUES (1, 'TechNova Ltda', 'contato@technova.com', ?)
`).run(senha);

// Consultar a empresa cadastrada
const empresa = db.prepare(`
  SELECT id FROM empresas WHERE email = ?
`).get('contato@technova.com');

// Verificar se a vaga de exemplo já existe
const vagaExistente = db.prepare(`
  SELECT id FROM vagas
  WHERE titulo = ? AND empresa_id = ?
`).get('Dev Frontend React', empresa.id);

// Cadastrar a vaga somente se não existir
if (!vagaExistente) {
  db.prepare(`
    INSERT INTO vagas (
      titulo, empresa_id, tipo,
      tecnologias, salario, descricao
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    'Dev Frontend React',
    empresa.id,
    'remoto',
    'React,TypeScript,CSS',
    'R$ 6.000 – R$ 9.000',
    'Vaga para desenvolvimento de interfaces modernas.'
  );
}

console.log('Seed concluído!');
package.json