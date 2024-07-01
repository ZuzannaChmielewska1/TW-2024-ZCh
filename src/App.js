import { useEffect, useState } from "react";
import { CreateAuthor } from "./components/CreateAuthor";
import { AuthorsList } from "./components/AuthorList";
import "./styles.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [authors, setAuthorList] = useState([]);

  const handleDeleteAuthor = (id) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setAuthorList((previousAuthors) =>
          previousAuthors.filter((author) => author.id !== id)
        );
      }
    });
  };

  const handleCreateAuthor = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    console.log(name, surname);

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthorList((previousAuthors) => [...previousAuthors, data]);
        }
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthorList(data));
  }, []);

  return (
    <div className="app">
      <div style={{ marginBottom: "50px" }}>
        <CreateAuthor onCreate={handleCreateAuthor} />
      </div>
      <AuthorsList authors={authors} onDelete={handleDeleteAuthor} />
    </div>
  );
}
