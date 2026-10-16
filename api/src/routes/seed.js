const db = require('./db');

const bcrypt = require('bcry');

const senha = bcrypt.hashSync('123456',10);

db.prepare(`

    INSET OR IGNORE INTO empresas(id,nome,email,senha_hash)
    VALUES (1, 'TechNova Ltda', 'contato@technova.com', ? )
    `
).run(senha)

db.prepare(`  
    
    INSERT INTO vagas (titulos, empresa_id, tipo, tecnologias,salario,descricao)
    VALUES (?,1,?,?,?,?)
`   
).run(
 'Dev Frontend React',
 'remoto',
 'React, TypeScript, CSS',
 'R$ 6.000 - $9.000',
 'Vaga para desenvolvimento web'

);

console.log('seed concluido');
