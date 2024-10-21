import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchMyCompanies = async () => {
      const res = await axios.get('/company/my-companies', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCompanies(res.data);
    };

    fetchMyCompanies();
  }, []);

  return (
    <div>
      <h1>My Companies</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;