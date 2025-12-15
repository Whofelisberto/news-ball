import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

export async function RegistrarUsuario(req, res) {
  try {

    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Campos Obrigatórios" });
    }
    const usuariojaexiste = await prisma.user.findUnique({ where: { email } });
    if (usuariojaexiste) {
      return res.status(400).json({ message: "Usuário já existe" });
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    });
  } catch (error) {
    console.error("Error ao registrar:", error);
    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
}

export async function LoginUsuario(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email e senha são obrigatórios" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "usuário não encontrado" });
    }
    const passwordValido = await comparePassword(password, user.password);
    if (!passwordValido)
      return res.status(401).json({ message: "Credenciais inválidas" });

    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está definido");
      return res
        .status(500)
        .json({ message: "Erro de configuração do servidor" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET
    );
    return res.json({ token , name: user.name, role: user.role });
  } catch (error) {
    console.error("Error ao logar usuário", error);
    return res.status(500).json({ message: "erro ao fazer login" });
  }
}
