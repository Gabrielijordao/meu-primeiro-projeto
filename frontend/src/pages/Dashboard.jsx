import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';

export default function Dashboard() {
  const { isLoggedIn, empresa, logout } = useAuth();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;

    apiFetch('/api/vagas')
      .then(setVagas)
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const minhas = vagas.filter((v) => v.empresa_nome === empresa?.nome);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Olá, {empresa?.nome}</h1>
        <button type="button" onClick={logout} className="btn">
          Sair
        </button>
      </div>
      {loading && <p>Carregando vagas...</p>}
      {erro && <p role="alert">Erro: {erro}</p>}
      {!loading && !erro && (
        <table className="dashboard__table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Salário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {minhas.length === 0 ? (
              <tr>
                <td colSpan={4}>Nenhuma vaga desta empresa.</td>
              </tr>
            ) : (
              minhas.map((v) => (
                <tr key={v.id}>
                  <td>{v.titulo}</td>
                  <td>{v.tipo}</td>
                  <td>{v.salario}</td>
                  <td>
                    <button className="btn btn--danger">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}