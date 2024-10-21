// src/components/CreateCompany.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  const { name, address } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/company/create', formData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      console.log('Company created:', res.data);
      // Redirect to user's company list or show success message
    } catch (err) {
      console.error('Error creating company:', err.response?.data || err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Company</h2>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Company Name" required />
      <input type="text" name="address" value={address} onChange={onChange} placeholder="Address" required />
      <button type="submit">Create Company</button>
    </form>
  );
};

export default CreateCompany;
