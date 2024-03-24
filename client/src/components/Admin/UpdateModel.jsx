import React, { useState } from 'react';
import axios from 'axios';

function UpdateModel() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [currencyPair, setCurrencyPair] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'description') {
        setDescription(value);
    } else if (name === 'currencyPair') {
        setCurrencyPair(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      formData.append('currencyPair', currencyPair);

      await axios.post('http://localhost:5555/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="container">
      <h1>Update Model</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="explain">Description:</label>
            <input type="text" id="description" name="description" value={description} onChange={handleChange} />
            </div>
        <div>
            <label htmlFor="currencyPair">Currency Pair:</label>
            <input type="text" id="currencyPair" name="currencyPair" value={currencyPair} onChange={handleChange} />
        </div>
        <div>
            <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default UpdateModel;
