import express from "express";
import { RegistrarUsuario , LoginUsuario  } from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/registrar" , RegistrarUsuario);
router.post("/login" , LoginUsuario);

export default router;
