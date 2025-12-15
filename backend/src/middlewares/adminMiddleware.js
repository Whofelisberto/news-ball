export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Autenticação necessária" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado: apenas administradores" });
  }
  return next();
}
