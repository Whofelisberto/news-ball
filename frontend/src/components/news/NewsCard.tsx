import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../../services/news.api";
import type { News } from "../../types/news.type";

export default function NewsCard() {
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    async function fetchFirstNews() {
      try {
        const data = await getNews();
        if (Array.isArray(data) && data.length > 0) {
          setNews(data[0]);
        }
      } catch (error) {
        console.error("Error ao carregar noticia principal", error);
      }
    }

    fetchFirstNews();
  }, []);

  if (!news) {
    return <p>Carregando noticiaa...</p>;
  }

  return (
    <section className="container mx-auto p-4 bg-white">
      <div className="grid grid-cols-1 gap-4">
        {news && (
          <article key={news.id} className="">
            <Link
              to={`/news/${news.id}`}
              className="relative col-span-2 rounded-t-md overflow-hidden block"
            >
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-400 h-96 object-cover transition-transform duration-300 hover:scale-105"
              />

              <h2 className="absolute text-white font-semibold text-2xl top-0 uppercase ml-5 mt-5">
                Destaque
              </h2>

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-3xl font-bold leading-tight">
                  {news.title}
                </h2>

                <ul className="mt-3 text-sm space-y-1 text-gray-200">
                  <li>• Cruzeiro tenta a contratação de Gerson</li>
                </ul>
              </div>
            </Link>
          </article>
        )}
      </div>
    </section>
  );
}
