import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const AdminContactEditor = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/contact-info`)
      .then(res => setContactInfo(res.data))
      .catch(() => setContactInfo(null));
    // Fetch contact form submissions
    axios.get(`${API_BASE_URL}/api/contact-submissions`)
      .then(res => setInquiries(res.data))
      .catch(() => setInquiries([]));
  }, []);

  const handleChange = (section, key, value) => {
    setContactInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleContactDetailsChange = (type, idx, value) => {
    setContactInfo(prev => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [type]: prev.contactDetails[type].map((v, i) => i === idx ? value : v)
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/contact-info`, contactInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Contact info updated!');
    } catch {
      setMessage('Failed to update.');
    }
    setSaving(false);
  };

  if (!contactInfo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Contact Info</h2>
      <div>
        <h3>Form Labels</h3>
        {Object.entries(contactInfo.formLabels).map(([key, val]) => (
          <div key={key}>
            <label>{key}: </label>
            <input
              value={val}
              onChange={e => handleChange('formLabels', key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <h3>Privacy Policy Text</h3>
        <input
          value={contactInfo.privacyPolicyText}
          onChange={e => setContactInfo({ ...contactInfo, privacyPolicyText: e.target.value })}
        />
      </div>
      <div>
        <h3>Contact Details</h3>
        {Object.entries(contactInfo.contactDetails).map(([type, arr]) =>
          Array.isArray(arr) ? (
            <div key={type}>
              <b>{type}:</b>
              {arr.map((v, i) => (
                <input
                  key={i}
                  value={v}
                  onChange={e => handleContactDetailsChange(type, i, e.target.value)}
                />
              ))}
            </div>
          ) : (
            <div key={type}>
              <b>{type}:</b>
              {Object.entries(arr).map(([sub, nums]) => (
                <div key={sub}>
                  {sub}: {nums.map((v, i) => (
                    <input
                      key={i}
                      value={v}
                      onChange={e => {
                        setContactInfo(prev => ({
                          ...prev,
                          contactDetails: {
                            ...prev.contactDetails,
                            [type]: {
                              ...prev.contactDetails[type],
                              [sub]: prev.contactDetails[type][sub].map((num, idx) => idx === i ? e.target.value : num)
                            }
                          }
                        }));
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <button onClick={handleSave} disabled={saving}>Save</button>
      {message && <div>{message}</div>}
      <h3>Contact Form Submissions</h3>
      <div style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0f2f1' }}>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Subject</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Request</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>First Name</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Last Name</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Email</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Phone</th>
              <th style={{ padding: 8, border: '1px solid #b2dfdb' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inq => (
              <tr key={inq.id}>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.subject}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.request}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.first_name}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.last_name}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.email}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{inq.phone}</td>
                <td style={{ padding: 8, border: '1px solid #b2dfdb' }}>{new Date(inq.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactEditor;
