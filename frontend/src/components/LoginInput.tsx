import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await api.post("/api/users/login", {
        email,
        password,
      });


      console.log("Login bem-sucedido:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        if (response.data.name) {
          localStorage.setItem("name", response.data.name);
        }

        if (response.data.role) {
          localStorage.setItem("role", response.data.role);
        }

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      window.dispatchEvent(new Event("login"));

      setSuccess("Login realizado com sucesso");
      // redireciona admin para painel, outros para home
      const role = response.data?.role;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Erro no login:", err);

      const message =
        err?.response?.data?.message || err.message || "Erro no login";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-6 font-bold">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-green-100 p-6 rounded shadow-lg w-full max-w-lg "
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-700 mb-4">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-800 text-white py-2 rounded uppercase font-semibold hover:bg-green-900 transition-colors ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
        <Link to="/cadastro">
          <p className="mt-4 text-center text-sm text-gray-700">
            Não tem conta? Cadastre-se
          </p>
        </Link>
      </form>
    </div>
  );
}
