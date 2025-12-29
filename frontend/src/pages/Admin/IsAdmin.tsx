import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function IsAdmin() {
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    setName(storedName);

  
    if (storedRole !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
    window.dispatchEvent(new Event("login"));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Painel Admin</h1>
        <p className="mb-4">
          Olá, <strong>{name}</strong>. Aqui estão as opções do painel:
        </p>

        <ul className="space-y-3 mb-6">
          <li>
            <Link
              to="/admin/newsadd"
              className="inline-block bg-green-800 text-white font-bold  px-4 py-2 rounded"
            >
              Adicionar Notícia
            </Link>
          </li>

        </ul>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="bg-red-600 font-bold text-white px-4 py-2 rounded"
          >
            Logout
          </button>


        </div>
      </div>
    </div>
  );
}
