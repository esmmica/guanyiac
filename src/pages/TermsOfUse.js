import React from 'react';
import { useNavigate } from 'react-router-dom';

const sectionTitle = {
  fontWeight: 700,
  fontSize: '1.3rem',
  color: '#2c5e57',
  marginTop: '2em',
  marginBottom: '0.5em'
};

const bold = { fontWeight: 700 };

const TermsOfUse = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Go back to previous page, or to home if no previous page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: '32px',
      background: '#fff',
      borderRadius: 12,
      fontFamily: 'Karma, serif',
      color: '#222'
    }}>
      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          background: '#2c5e57',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1e4a44'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#2c5e57'}
      >
        ← Back
      </button>

      <h1 style={{ fontFamily: 'Jockey One, Arial, sans-serif', color: '#2c5e57', fontWeight: 900, fontSize: '2.5rem' }}>Terms and Conditions</h1>

      <h2 style={sectionTitle}>How the Inquiry Process Works</h2>
      <ol style={{ marginLeft: '2em', lineHeight: '1.8' }}>
        <li>Browse products and add items to your inquiry list.</li>
        <li>When ready, review your inquiry list.</li>
        <li>Submit your inquiry with your contact details.</li>
        <li>Our team will review your inquiry and contact you to discuss pricing, availability, payment, and delivery options.</li>
      </ol>

      <h2 style={sectionTitle}>Payment Terms</h2>
      <p>
        Payment details will be provided by our team after your inquiry is reviewed and confirmed.<br />
        <b>No payment is collected through this website.</b>
      </p>

      <h2 style={sectionTitle}>Delivery Details/Options</h2>
      <p>
        Delivery options and lead times will be discussed and agreed upon after your inquiry is processed.
      </p>

      <h2 style={sectionTitle}>Terms and Conditions</h2>
      <ul style={{ marginLeft: '2em', lineHeight: '1.8' }}>
        <li>Prices and availability are subject to change and will be confirmed by our team.</li>
        <li>No Return or Exchange after SEVEN (7) Days from delivery.</li>
        <li>No Return or Exchange once the product is damaged or tampered with by the Customer or any resulting factors after delivery.</li>
        <li>No Return or Exchange if the product required by the Customer is cut or altered in a way that is irreversible.</li>
        <li>No Return or Exchange if the product is fully functioning as intended (minor scratches and dents that do not affect product quality and functionality are included).</li>
        <li>Return or Exchange without proper basis and proof will not be allowed.</li>
      </ul>

      <h2 style={sectionTitle}>Discounts</h2>
      <p>Contact us for available Discounts.</p>

      <h2 style={sectionTitle}>LOYALTY MEMBERS</h2>
      <p style={{ marginBottom: '1em' }}><span style={bold}>Terms and Conditions for Loyalty Members:</span></p>
      <ul style={{ marginLeft: '2em', lineHeight: '1.8' }}>
        <li>Terms 30 days unless otherwise arranged</li>
        <li>12% per annum is to be charged on all overdue accounts, plus 25% on said amount for attorney's fees and cost of collection</li>
      </ul>
      
      <h3 style={{ fontWeight: 600, color: '#2c5e57', marginTop: '1.5em' }}>Post-dated check:</h3>
      <p><span style={bold}>Check Dated Details:</span> Max is 30 Days</p>
    </div>
  );
};

export default TermsOfUse; 