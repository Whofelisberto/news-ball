import { House, LoaderPinwheel, Menu, User, X , ShieldUser  } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const roleStored = localStorage.getItem("role");
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(name);
    setRole(roleStored);

    function onLogin() {
      const newName = localStorage.getItem("name");
      const newToken = localStorage.getItem("token");
      const newRole = localStorage.getItem("role");
      if (newToken)
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setUser(newName);
      setRole(newRole);
    }

    window.addEventListener("login", onLogin);
    return () => window.removeEventListener("login", onLogin);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  }

  return (
    <div>
      <div className=" bg-green-950 font-sans text-white p-5 font-bold flex justify-between items-end">
        <div className="flex justify-end items-end gap-10">
          <Link to="/">
            <div className="flex gap-2 justify-center items-center">
              <LoaderPinwheel size={28} />
              <h1 className="text-3xl">NewsBall</h1>
            </div>
          </Link>
          <button className="flex gap-2" onClick={() => setIsOpen(!isOpen)}>
            {" "}
            {isOpen ? <X /> : <Menu />}
            Menu
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          {user ? (
            <>
              <p className="font-light cursor-pointer" onClick={handleLogout}>
                logout ,
              </p>
              <span className="text-white">{user}</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <nav className="bg-green-950 bg-fixed flex w-75 h-screen fixed top-0 z-50 translate-x-0">
            <ul className="flex flex-col space-y-5 ml-4 mt-10 w-full text-white font-semibold">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline flex gap-2 ml-2"
                >
                  <House size={28} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline flex gap-2 ml-2"
                >
                  <User size={28} /> Login
                </Link>
              </li>
              {role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline flex gap-2 ml-2"
                  >
                    <ShieldUser  size={28} /> Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
