import { useEffect, useRef, useState } from "react";

type Comment = {
  id: string;
  text: string;
  author?: string;
  createdAt: number;
};

interface ComentsProps {
  newsId?: string | undefined;
}

const STORAGE_PREFIX = "newsball:comments:";

function storageKey(newsId?: string) {
  return STORAGE_PREFIX + (newsId ?? "global");
}

export default function Coments({ newsId }: ComentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(newsId));
      if (raw) {
        const parsed = JSON.parse(raw) as Comment[];
        const normalized = parsed.map((c) => ({
          ...c,
          author: (c as any).author ?? "",
        }));
        setComments(normalized);
      } else {
        setComments([]);
      }
    } catch (e) {
      console.error("Erro ao carregar comentários do localStorage", e);
      setComments([]);
    }
  }, [newsId]);


  useEffect(() => {
    try {
      localStorage.setItem(storageKey(newsId), JSON.stringify(comments));
    } catch (e) {
      console.error("Erro ao salvar comentários no localStorage", e);
    }
  }, [comments, newsId]);

  function handleAdd() {
    const value = text.trim();
    if (!value) return;
    const name = localStorage.getItem("name") || "Anônimo";
    const newComment: Comment = {
      id: String(Date.now()),
      text: value,
      author: name,
      createdAt: Date.now(),
    };
    setComments((prev) => [newComment, ...prev]);
    setText("");
    textareaRef.current?.focus();
  }

  function handleDelete(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <section className="mt-8 p-4 bg-gray-100 rounded">
      <h2 className="text-lg text-white font-semibold mb-2 bg-green-800 rounded p-2">
        Comentários
      </h2>

      <div className="mb-4">
        <textarea
          ref={textareaRef}
          className="w-full border rounded p-2 resize-none"
          rows={3}
          value={text}
          placeholder="Escreva seu comentário..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAdd}
            className="bg-green-800 text-white px-3 py-1.5 rounded font-semibold disabled:opacity-50"
            disabled={!text.trim()}
          >
            Comentar
          </button>
        </div>
      </div>

      <div>
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Seja o primeiro a comentar.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="border p-3 rounded bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {c.author || "Anônimo"}
                    </p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {c.text}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 text-sm ml-3"
                    aria-label="Excluir comentário"
                  >
                    Excluir
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
