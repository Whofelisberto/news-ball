import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function NewsAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      setError("Título e descrição são obrigatórios");
      return;
    }

    setLoading(true);
    try {

      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const payload = { title, description, imageUrl };

      const response = await api.post("/api/news/criar-noticia", payload);

      console.log("Criar notícia resposta:", response.data);

      setSuccess(response.data?.message || "Notícia criada com sucesso");
      setTitle("");
      setDescription("");
      setImageUrl("");

     
      setTimeout(() => {
        alert("Notícia criada com sucesso!");
      }, 800);
    } catch (err: any) {
      console.error("Erro ao criar notícia:", err);
      const message =
        err?.response?.data?.message || err.message || "Erro ao criar notícia";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-270 mx-auto p-6 bg-gray-200 min-h-screen">
      <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 font-bold px-4 py-2 rounded mb-5"
          >
            Voltar
          </button>
      <h1 className="text-2xl text-white bg-green-800 rounded p-2 font-bold mb-4">Adicionar Notícia</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Título da notícia"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded h-40"
            placeholder="Corpo da notícia"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            URL da imagem (opcional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://..."
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-700 mb-4">{success}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-800 text-white px-4 py-2 rounded font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-900"
            }`}
          >
            {loading ? "Salvando..." : "Salvar Notícia"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white font-bold px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
