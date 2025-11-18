import React from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial,Helvetica,sans-serif" }}>
      <h1>API BookAuthor - Client (fetch)</h1>
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        <Authors />
        <Books />
      </div>
    </div>
  );
}
