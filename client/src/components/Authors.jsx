import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    try {
      const data = await api.getAuthors();
      setAuthors(data);
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
      const a = await api.createAuthor({ name });
      setName("");
      setAuthors((prev) => [a, ...prev]);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div style={{ width: 360 }}>
      <h2>Authors</h2>
      <form onSubmit={create} style={{ marginBottom: 10 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New author name"
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {authors.map((a) => (
          <li key={a._id}>
            <strong>{a.name}</strong> — <code>{a._id}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
