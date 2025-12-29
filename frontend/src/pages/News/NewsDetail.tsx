import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Coments from "../../components/Coments";
import { getNewsID } from "../../services/news.api";
import type { News } from "../../types/news.type";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      if (!id) return;
      try {
        const data = await getNewsID(id);
        setNews(data);
      } catch (error) {
        console.error("Erro ao carregar notícia por id", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [id]);

  if (loading) return <p>Carregando notícia...</p>;
  if (!news) return <p>Notícia não encontrada.</p>;

  return (
    <section className="w-270 mx-auto p-4 bg-white min-h-screen">
      <Link to="/">
        <button className="text-md text-white hover:underline bg-green-800 rounded px-3 py-1.5 font-semibold">
          ← Voltar
        </button>
      </Link>

      <article className="mt-10">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-96 object-cover rounded mb-4"
        />
        <p className="text-sm text-gray-500 mb-4">
          {new Date(
            news.createdAt || news.publishedAt || Date.now()
          ).toLocaleString()}
        </p>
        <span className="text-sm text-gray-700">
          Autor: {news.author?.name || news.name || "Autor desconhecido"}
        </span>
        <p className="mb-10 mt-10 font-extralight text-gray-800 ">
          {news.description}
        </p>
      </article>
      <Coments newsId={news.id} />
    </section>
  );
}
