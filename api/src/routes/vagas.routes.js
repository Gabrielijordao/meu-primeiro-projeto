const { Router } = require('express');
const router = Router();


const db = require('../database/db')


const vagasMock = [
    { id: 1, titulo: 'Dev Frontend React', empresa: 'TechNova', tipo: 'remoto' }
];

router.get('/', (req, res) => {
    res.json(vagasMock);
});

router.get('/', (req, res) => {
    const vagas = db.prepare(`
        SELECT v.*, e.nome AS empresa_nome 
        from vagas v 
        JOIN empresas e ON e.id = v.empresas_id
        ORDER BY v.created_at DESC
    `).all();

    res.json(vagas);
});

module.exports = router;