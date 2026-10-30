const { Router } = require('express');
const router = Router();

const db = require('../database/db');

router.get('/', (req, res) => {
  const vagas = db.prepare(`
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    ORDER BY v.created_at DESC
  `).all();

  res.json(vagas);
});
router.post('/', (req, res) => {
  const { titulo, empresa_id, tipo, tecnologia, salario, cep, cidade, descricao } = req.body;

  if (!titulo || !empresa_id || !tipo) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, empresa_id, tipo' });
  }

  const result =db.prepare(
    `INSERT INTO vagas(titulo, empresa_id, tipo, tecnologia, salario, cep, cidade, descricao )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(titulo, empresa_id, tipo, tecnologias || '', salario || '', cep || '', cidade || '', estado || '', descricao || '');

  const vaga = db.prepare('SELECT * FROM vagas WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(vaga);

});

router.get('/:id', (req, res) => {
    const vaga = db.prepare(
        `
        SELECT v.*, e.nome AS empresa_nome
        from vagas v
        JOIN empresas e ON e.id = v.empresa_id
        WHERE v.id = ?
        `).get(req.params.id);

    if (!vaga) {
        return res.status(404).json({error: 'Vaga não encontrada!'});
    }

     res.json(vaga);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const existente = db.prepare('SELECT id FROM vagas WHERE id = ?').get(id);

    if (!existente) {
        return res.status(404).json({error: 'Vaga não encontrada'});
}

    const {titulo, tipo, tecnologias, salario,cep, cidade, estado, descricao} = req.body;

    db.prepare(`
      UPDATE vagas SET
      TITULO = COALESCE(?, titulo),
      TIPO = COALESCE(?, tipo),
      tecnologias = COALESCE(?, tecnologias),
      salario = COALESCE(?, salario),
      cep = COALESCE(?, cep),
      cidade = COALESCE(?, cidade),
      estado = COALESCE(?, estado),
      descricao = COALESCE(?, descricao)

      WHERE id = ?
      `).run(titulo, tipo, tecnologias, salario, cep, cidade, estado, descricao, id);
  
  const atualizada = db.prepare('SELECT * FROM vagas WHERE id = ?').get(id);    
  res.json(atualizada);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const existente = db.prepare('SELECT id FROM vagas WHERE id = ?').get(id);

    if (result.changes === 0) {
        return res.status(404).json({error: 'Vaga não encontrada'});
    }

    res.status(204).send();
});

module.exports = router;