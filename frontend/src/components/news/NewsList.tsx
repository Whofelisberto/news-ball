import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../../services/news.api";
import type { News } from "../../types/news.type";
import logoFlamengo from "../../assets/logo_flamengo.png";
import logopsg from "../../assets/logo_psg.png";
import city from "../../assets/city.svg";
import forest from "../../assets/forest.svg";
import arsenal from "../../assets/arsenal.svg";
import brighton from "../../assets/brighton.svg";
import liverpool from "../../assets/liverpool.svg";
import wol from "../../assets/wol.svg";
import palmeiras from "../../assets/palmeiras.png";
import galo from "../../assets/galo.png";


export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        setNews(data);
      } catch (error) {
        console.error("Error ao carregar noticias", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <p>Carregando notícias...</p>;
  }

  return (
    <section className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl mb-6 font-semibold uppercase">
        Confira as últimas notícias
      </h1>


      <div className="flex flex-col md:flex-row gap-6">

        <main className="flex-1 flex flex-col gap-6">
          {news.map((item) => (
            <article key={item.id} className=" pb-8">
              <Link to={`/news/${item.id}`} className="block">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <img
                    className="w-full md:w-92 h-40 md:h-56 object-cover rounded overflow-hidden hover:scale-105 transition-transform duration-300"
                    src={item.imageUrl}
                    alt={item.title}
                  />

                  <div className="flex-1">
                    <h2 className="text-green-700 font-bold text-2xl line-clamp-3">
                      {item.title}
                    </h2>
                    <p className="mb-2 line-clamp-3 text-gray-800">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        item.createdAt || item.publishedAt || Date.now()
                      ).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Autor: {item.author?.name || item.name || "Autor Desconhecido"}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </main>


        <aside className="w-full md:w-80 rounded-lg p-4 bg-green-950">
          <h2 className="text-lg text-white font-semibold mb-3">Destaques</h2>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded">
              <h3 className="font-medium text-sm">Últimas categorias</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>Política</li>
                <li>Tecnologia</li>
                <li>Esportes</li>
              </ul>
            </div>

            <div className="p-3 bg-white rounded">
              <h3 className="font-medium text-sm">Posts recentes</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                {news.slice(0, 5).map((n) => (
                  <li key={n.id} className="truncate">
                    • {n.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white rounded">
              <h3 className="font-medium uppercase text-sm text-gray mb-4">
                Últimos Resultados
              </h3>
              <div className="flex gap-2 justify-center items-center mb-4">
              <img src={city} alt="city"  width={30}/>
              <p><span className="font-semibold">MAC 2 <span className="text-gray-400 ml-2 mr-2">x</span> 1 NOT</span></p>
               <img src={forest} alt="forest"  width={30}/>
              </div>

              <div className="flex gap-2 justify-center items-center mb-4">
              <img src={arsenal} alt=""  width={30}/>
              <p><span className="font-semibold">ARS 3 <span className="text-gray-400 ml-2 mr-2">x</span> 0 BFC</span></p>
               <img src={brighton} alt=""  width={30}/>
              </div>

              <div className="flex gap-2 justify-center items-center mb-4">
              <img src={liverpool} alt=""  width={30}/>
              <p><span className="font-semibold">LIV 2 <span className="text-gray-400 ml-2 mr-2">x</span> 0 WOL</span></p>
               <img src={wol} alt=""  width={30}/>
              </div>

              <div className="flex gap-2 justify-center items-center mb-4">
              <img src={palmeiras} alt=""  width={30}/>
              <p><span className="font-semibold">PAL 3 <span className="text-gray-400 ml-2 mr-2">x</span> 0 ATM</span></p>
               <img src={galo} alt=""  width={29}/>
              </div>

              <div className="flex gap-2 justify-center items-center">
              <img src={logoFlamengo} alt=""  width={31}/>
              <p><span className="font-semibold">FLA 1 <span className="text-gray-400 ml-2 mr-2">x</span> 1 PSG</span></p>
               <img src={logopsg} alt=""  width={31}/>
              </div>

            </div>

             <div className="p-3 bg-white rounded ">
                <p className="font-semibold text-green-700 text-lg mb-4 border-b border-gray-300">Campeonato Brasileiro 2026</p>
                <table className="w-full">
                  <tbody className="text-md">
                    <tr className="mb-2 border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">FLA</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">PAL</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">CRU</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">SP</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">ATM</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">ATP</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">REMO</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">FLU</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">VAS</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">SAN</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">MIR</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">BAH</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">BOT</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">RBB</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">VIT</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">INT</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">GRE</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">COR</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">CRT</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-500">1º</td>
                      <td className="font-semibold">CHAP</td>
                      <td className="pl-4">0 pts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
