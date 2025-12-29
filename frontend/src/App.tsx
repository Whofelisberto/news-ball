import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroInput from "./components/CadastroInput";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginInput from "./components/LoginInput";
import IsAdmin from "./pages/Admin/IsAdmin";
import NewsAdd from "./pages/Admin/NewsAdd";
import Home from "./pages/Home";
import NewsDetail from "./pages/News/NewsDetail";

export default function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginInput />} />
          <Route path="/cadastro" element={<CadastroInput />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin" element={<IsAdmin />} />
          <Route path="/admin/newsadd" element={<NewsAdd />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
