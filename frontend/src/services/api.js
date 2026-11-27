const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('devjobs_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${BASE}${path}`, { ...options, headers });

    if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        throw new Error(erro.erro || 'Erro na requisição');
    }

    if (response.status === 204) return null;
    return response.json();
}