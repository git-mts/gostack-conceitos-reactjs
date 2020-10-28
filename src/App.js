import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const { data: repository } = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      owner: "Matheus",
      techs: ["React Native"]
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const filteredRepositories = repositories.filter(repository => repository.id != id);

    setRepositories(filteredRepositories);

    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
