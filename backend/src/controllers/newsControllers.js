import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CriarNoticia(req, res) {
  try {
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Campos Obrigatórios" });
    }

    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({ message: "Autenticação necessária" });
    }

    const authorId = user.id;

    const news = await prisma.news.create({
      data: {
        title,
        description,
        imageUrl,
        authorId,
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });
    return res
      .status(201)
      .json({ message: "Notícia criada com sucesso", news });
  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    return res.status(500).json({ message: "Erro ao criar notícia" });
  }
}

export async function ListarNoticias(_req, res) {
  try {
    const noticias = await prisma.news.findMany({
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(noticias);
  } catch (error) {
    console.error("Erro ao listar notícias:", error);
    return res.status(500).json({ message: "Erro ao listar notícias" });
  }
}

export async function UpdateNoticia(req, res) {
  try {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const noticiaExistente = await prisma.news.findUnique({ where: { id } });
    if (!noticiaExistente) {
      return res.status(404).json({ message: "Notícia não encontrada" });
    }
    const noticiaAtualizada = await prisma.news.update({
      where: { id },
      data: { title, description, imageUrl },
    });
    return res.status(200).json({
      message: "Notícia atualizada com sucesso",
      noticia: noticiaAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    return res.status(500).json({ message: "Erro ao atualizar notícia" });
  }
}

export async function DeletarNoticia(req, res) {
  try {
    const { id } = req.params;
    const noticiaExistente = await prisma.news.findUnique({ where: { id } });

    if (!noticiaExistente) {
      return res.status(404).json({ message: "Notícia não encontrada" });
    }
    await prisma.news.delete({ where: { id } });
    return res.status(200).json({ message: "Notícia deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar notícia:", error);
    return res.status(500).json({ message: "Erro ao deletar notícia" });
  }
}

export async function ObterNoticiaPorId(req, res) {
  try {
    const { id } = req.params;
    const noticia = await prisma.news.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    if (!noticia) {
      return res.status(404).json({ message: "Notícia não encontrada" });
    }
    return res.status(200).json(noticia);
  } catch (error) {
    console.error("Erro ao obter notícia:", error);
    return res.status(500).json({ message: "Erro ao obter notícia" });
  }
}
