import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Junio',
      url: 'https://github.com/junio',
      teches: ['Node.js', 'ReactJS']
    })

    setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
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
