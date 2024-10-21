import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get('/company/all', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCompanies(res.data);
    };

    fetchCompanies();
  }, []);

  const approveCompany = async (id) => {
    try {
      await axios.post(`/company/approve/${id}`, {}, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCompanies(companies.map(company => company._id === id ? { ...company, status: 'APPROVED' } : company));
    } catch (err) {
      console.error('Error approving company:', err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`/company/delete/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCompanies(companies.filter(company => company._id !== id));
    } catch (err) {
      console.error('Error deleting company:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Company Listing</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Created By</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.created_by.username}</td>
              <td>{company.address}</td>
              <td>{company.status}</td>
              <td>
                <Button variant="danger" onClick={() => deleteCompany(company._id)}>Delete</Button>{' '}
                {company.status === 'UNAPPROVED' && (
                  <Button variant="success" onClick={() => approveCompany(company._id)}>Approve</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
