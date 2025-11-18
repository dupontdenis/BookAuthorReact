const BASE = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  // If no content
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Authors
  getAuthors: () => request("/authors"),
  createAuthor: (data) =>
    request("/authors", { method: "POST", body: JSON.stringify(data) }),
  getAuthor: (id) => request(`/authors/${id}`),

  // Books
  getBooks: (authorId) => {
    if (authorId) return request(`/books?author=${authorId}`);
    return request("/books");
  },
  createBook: (data) =>
    request("/books", { method: "POST", body: JSON.stringify(data) }),
  updateBook: (id, data) =>
    request(`/books/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBook: (id) => request(`/books/${id}`, { method: "DELETE" }),
  addAuthorsToBook: (id, authors) =>
    request(`/books/${id}/authors`, {
      method: "PATCH",
      body: JSON.stringify({ authors }),
    }),
};

export default api;
