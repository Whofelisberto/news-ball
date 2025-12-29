import { api } from "./api";

export async function getNews() {
  try {
    const { data } = await api.get("/api/news/listar-noticias");
    return data;
  } catch (error) {
    console.error("Error ao carregar api", error);
    throw error;
  }
}

export async function getNewsID(id: string) {
  try {
    const { data } = await api.get(`/api/news/listar-noticia/${id}`);
    return data;
  } catch (error) {
    console.error("Error ao carregar noticia por id", error);
    throw error;
  }
}
