import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { apiFetch } from '../services/api';

export default function Home() {
  const [vagas, setVagas] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    apiFetch('/api/vagas')
      .then((data) => setVagas(data))
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  const termo = busca.trim().toLowerCase();
  const filtradas = termo
    ? vagas.filter((v) =>
        [v.titulo, v.empresa_nome, v.tecnologias].join(' ').toLowerCase().includes(termo)
      )
    : vagas;

  if (loading) return <p>Carregando vagas...</p>;
  if (erro) return <p role="alert">Erro: {erro}</p>;

  const contagem = !termo
    ? `${filtradas.length} vagas disponíveis`
    : `${filtradas.length} vaga(s) encontrada(s) para "${busca}"`;

  return (
    <>
      <SearchBar value={busca} onChange={setBusca} />
      <section className="jobs-section">
        <h2 className="sr-only">Lista de vagas</h2>
        <p className="result-count" aria-live="polite">
          {contagem}
        </p>
        <div className="jobs-grid">
          {filtradas.length === 0 ? (
            <p className="empty-msg">Nenhuma vaga encontrada.</p>
          ) : (
            filtradas.map((vaga) => <JobCard key={vaga.id} vaga={vaga} />)
          )}
        </div>
      </section>
    </>
  );
}