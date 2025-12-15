import app from "./app.js";

const PORT = process.env.PORT || 3333;

app.get("/", (_req, res) => {
  res.json("API News Ball está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
