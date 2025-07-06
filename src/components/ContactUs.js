import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactUs.css';
import bg from '../assets/partners/bg.jpg';
import API_BASE_URL from '../config';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/contact-info`)
      .then(res => setContactInfo(res.data))
      .catch(() => setContactInfo(null));
  }, []);

  if (!contactInfo) return <div>Loading...</div>;

  const { privacyPolicyLink, termsOfUseLink, contactDetails } = contactInfo;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const subject = form.elements.subject.value;
    const request = form.elements.request.value;
    const first_name = form.elements.firstName.value;
    const last_name = form.elements.lastName.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;

    axios.post(`${API_BASE_URL}/api/contact-submissions`, {
      subject,
      request,
      first_name,
      last_name,
      email,
      phone
    })
    .then(res => {
      if (res.data.success) {
        alert('Submission successful!');
        form.reset();
      } else {
        alert('Submission failed.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    });
  };

  return (
    <div className="contactus-outer">
      {/* Banner Section */}
      <div
        style={{
          width: "100vw",
          minHeight: 260,
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          background: `url(${bg}) center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px 32px 16px",
          overflow: "hidden",
          marginBottom: 32,
        }}
      >
        {/* Darker Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.65)",
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "3rem",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              textAlign: "center",
              fontFamily: "Jockey One, Arial, sans-serif"
            }}
          >
            CONTACT US
          </h1>
        </div>
      </div>
      {/* Existing Contact Us content below */}
      <div className="contactus-content">
        {/* Left Form Side */}
        <div className="contactus-form-column">
          <div className="contactus-form-title">Contact Form</div>
          <div className="contactus-form-desc">
            Do you have any questions about our products and any of our services? <br />
            Get in touch with us and we'll take care of your request as soon as possible!
          </div>
          <div className="contactus-form-side">
            <form className="contactus-form" onSubmit={handleSubmit}>
              <label>
                <span>Subject:</span>
                <input type="text" name="subject" />
              </label>
              <label>
                <span>Your Request:</span>
                <textarea name="request" rows={4} />
              </label>
              <label>
                <span>First name:</span>
                <input type="text" name="firstName" />
              </label>
              <label>
                <span>Last name:</span>
                <input type="text" name="lastName" />
              </label>
              <label>
                <span>Email:</span>
                <input type="email" name="email" />
              </label>
              <label>
                <span>Phone (optional):</span>
                <input type="text" name="phone" />
              </label>
              <div className="contactus-privacy">
                <input type="checkbox" required />
                <span>
                  I have read the <a href={privacyPolicyLink}>Privacy Policy</a> and accept the <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                </span>
              </div>
              <div className="contactus-privacy-desc">
                We collect, analyze and process personal data for the purpose of addressing your request and questions.
              </div>
              <button type="submit" className="contactus-submit">SUBMIT</button>
            </form>
          </div>
        </div>
        {/* Right Contact Info Side */}
        <div className="contactus-details-side">
          {/* Left column: Sales, Accounting, Fax */}
          <div className="contactus-details-col">
            <div className="contactus-details-title">Sales</div>
            <div className="contactus-details-bold">
              <span className="contactus-number">8245-7022; 8245-8477</span><br />
              <span className="contactus-number">8243-0290; 8242-0461</span><br />
              <span className="contactus-number">8243-0285; 8242-0345</span><br />
              <span className="contactus-number">8243-0288; 8243-0295</span><br />
              <span className="contactus-number">8242-0262; 8242-5641</span><br />
              <span className="contactus-number">8242-8840; 8242-6139</span>
            </div>
            <div className="contactus-details-title" style={{ marginTop: 18 }}>Accounting</div>
            <div className="contactus-details-bold">
              <span className="contactus-number">8242-9441</span><br />
              <span className="contactus-number">8245-8202</span><br />
              <span className="contactus-number">8245-8280</span>
            </div>
            <div className="contactus-details-title" style={{ marginTop: 18 }}>Fax</div>
            <div className="contactus-details-bold">
              <span className="contactus-number">8242-9940; 8242-0469</span>
            </div>
          </div>
          {/* Vertical divider */}
          <div className="contactus-details-divider" />
          {/* Right column: Delivery, Mobile/Viber, Mail Us */}
          <div className="contactus-details-col">
            <div className="contactus-details-title">Delivery</div>
            <div className="contactus-delivery-row">
              <div>
                <b className="contactus-details-bold">Globe:</b>
                <div>
                  <span className="contactus-number">0945-643-5515</span>
                </div>
              </div>
              <div>
                <b className="contactus-details-bold">Smart:</b>
                <div>
                  <span className="contactus-number">0998-447-0689</span>
                </div>
              </div>
            </div>
            <div className="contactus-details-title" style={{ marginTop: 18 }}>Mobile/Viber</div>
            <div className="contactus-mobileviber-row">
              <div>
                <b className="contactus-details-bold">Globe:</b>
                <div>
                  <span className="contactus-number">0917-351-0685</span><br />
                  <span className="contactus-number">0917-832-0322</span><br />
                  <span className="contactus-number">0906-068-7670</span>
                </div>
              </div>
              <div>
                <b className="contactus-details-bold">Smart:</b>
                <div>
                  <span className="contactus-number">0922-877-7641</span><br />
                  <span className="contactus-number">0999-760-0631</span>
                </div>
              </div>
            </div>
            <div className="contactus-details-title" style={{ marginTop: 18 }}>Mail Us</div>
            <div className="contactus-details-bold">
              <span className="contactus-number">sales@guanyiac.com</span><br />
              <span className="contactus-number">guanyiac@gmail.com</span><br />
              <span className="contactus-number">matthewrhyst@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
