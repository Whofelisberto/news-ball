import express from "express";
import { CriarNoticia, ListarNoticias , UpdateNoticia , DeletarNoticia, ObterNoticiaPorId } from "../controllers/newsControllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();


router.post("/criar-noticia", authenticateToken, isAdmin, CriarNoticia);
router.get("/listar-noticias", ListarNoticias);
router.get("/listar-noticia/:id", ObterNoticiaPorId)
router.put("/atualizar-noticia/:id", authenticateToken, isAdmin, UpdateNoticia);
router.delete("/deletar-noticia/:id", authenticateToken, isAdmin, DeletarNoticia);

export default router;
