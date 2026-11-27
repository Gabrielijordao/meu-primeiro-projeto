import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [empresa, setEmpresa] = useState(()=> {
    const salvar = localStorage.getItem('devjobs_empresa');
    return salva ? JSON.parse(salva) : null
  });
  const [token, setToken] = useState(localStorage.getItem('devjobs_token'));

  function login(dados, jwt) {
    setEmpresa(dados);
    setToken(jwt);
    localStorage.setItem('devjobs_token', jwt);
    localStorage.setItem('devjobs_empresa', JSON.stringify(dados));

  }

  function logout() {
    setEmpresa(null);
    setToken(null);
    localStorage.removeItem('devjobs_token');
    localStorage.setItem('devjobs_empresa'); 
  }

  return (
    <AuthContext.Provider value={{ empresa, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}