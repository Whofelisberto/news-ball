import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function CadastroInput() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/users/registrar", {
        email,
        name,
        password,
      });

      console.log("Cadastro bem-sucedido:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      alert(err?.response?.data?.message || "Erro no cadastro");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-6 font-bold">Registre-se</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-green-100 p-6 rounded shadow-lg w-full max-w-lg "
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Seu nome"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="text@gmail.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="*******"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded uppercase font-semibold hover:bg-green-900 transition-colors"
        >
          Registrar
        </button>
        <Link to="/login">
          <p className="mt-4 text-center text-sm text-gray-700">
            Já tem conta? Clique aqui para entrar.
          </p>
        </Link>
      </form>
    </div>
  );
}
