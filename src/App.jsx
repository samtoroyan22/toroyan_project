import React, { useEffect, useState } from 'react';

function App() {
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/environments')
      .then(response => response.json())
      .then(data => setEnvironments(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Environments</h1>
      <ul>
        {environments.map(env => (
          <li key={env.id}>
            <strong>{env.title}</strong>: {env.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
