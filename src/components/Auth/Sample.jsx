import React, { useState, useEffect } from 'react';

function Sample() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Open the IndexedDB connection
    const request = window.indexedDB.open('myDatabase', 1);

    // Create the object store if it doesn't exist
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore('people', { keyPath: 'id', autoIncrement: true });
    };

    // Retrieve data when the component mounts
    retrieveData(request);
  }, []);

  const saveData = () => {
    // Open a transaction and add the data to the object store
    const request = window.indexedDB.open('myDatabase', 1);
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['people'], 'readwrite');
      const objectStore = transaction.objectStore('people');
      objectStore.add({ name });

      // Handle the success and error cases
      transaction.oncomplete = function() {
        console.log('Data saved successfully!');
        retrieveData(request);
      };

      transaction.onerror = function() {
        console.error('Error saving data:', transaction.error);
      };
    };
  };

  const retrieveData = (request) => {
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['people'], 'readonly');
      const objectStore = transaction.objectStore('people');
      const request = objectStore.getAll();

      request.onsuccess = function(event) {
        setData(event.target.result);
      };

      request.onerror = function() {
        console.error('Error retrieving data:', request.error);
      };
    };
  };

  return (
    <div>
      <h1>IndexedDB Example</h1>
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