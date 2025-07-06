import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // or './config' if in src/

const CreateProductType = () => {
  const [productType, setProductType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/product-types', { name: productType }); // Adjust the endpoint as needed
      alert('Product type created successfully!');
      setProductType('');
    } catch (error) {
      console.error('Error creating product type:', error);
      alert('Failed to create product type.');
    }
  };

  return (
    <div>
      <h1>Create Product Type</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          placeholder="Enter product type"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProductType; 