import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [authorsInput, setAuthorsInput] = useState("");

  async function load() {
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (e) {
      alert(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e) {
    e.preventDefault();
    try {
      // authors input: comma separated ids
      const authors = authorsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const b = await api.createBook({ title, authors });
      setTitle("");
      setAuthorsInput("");
      setBooks((prev) => [b, ...prev]);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div style={{ width: 640 }}>
      <h2>Books</h2>
      <form onSubmit={create} style={{ marginBottom: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: 220 }}
        />
        <input
          value={authorsInput}
          onChange={(e) => setAuthorsInput(e.target.value)}
          placeholder="author ids (comma)"
          style={{ width: 300, marginLeft: 8 }}
        />
        <button type="submit">Create</button>
      </form>
      <button onClick={load}>Reload</button>
      <ul>
        {books.map((b) => (
          <li key={b._id} style={{ marginTop: 8 }}>
            <strong>{b.title}</strong> — <em>{b._id}</em>
            <div>
              Authors:{" "}
              {b.authors && b.authors.length
                ? b.authors.map((a) => a.name || a._id).join(", ")
                : "—"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
