import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sample() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error retrieving data:', error));
  };

  const saveData = () => {
    axios.post('/api/data', { name })
      .then(() => {
        console.log('Data saved successfully!');
        setName('');
        fetchData();
      })
      .catch(error => console.error('Error saving data:', error));
  };

  return (
    <div>
      <h1>Server-side Example</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={saveData}>Save</button>
      </div>
      <div>
        <p>{data.map((item) => item.name).join(', ')}</p>
      </div>
    </div>
  );
}

export default Sample;