import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    role: 'IT_USER_NORMAL' // default role for normal users
  });

  const { name, username, password, email, mobile, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      console.log('User registered:', res.data);
      // Handle success (e.g., redirect to login)
    } catch (err) {
      console.error('Error registering user:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="text" name="mobile" value={mobile} onChange={onChange} placeholder="Mobile" required />
      <select name="role" value={role} onChange={onChange}>
        <option value="IT_USER_NORMAL">Normal User</option>
        <option value="IT_ADMIN">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;