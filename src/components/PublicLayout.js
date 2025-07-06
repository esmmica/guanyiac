import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

// Import assets used in header/footer/carousel
import logo from '../assets/icons/guanyiac.png';
import fbIcon from '../assets/icons/fb.png';
import linkedinIcon from '../assets/icons/linkn.png';
import igIcon from '../assets/icons/ig.png';
import loginIcon from '../assets/icons/login.png';
import footerLogo from '../assets/icons/fguanyiac.jpg';

// Import product images if used in sections that move into PublicLayout (like the interest section)
import industrialHoseImg from '../assets/products/industrialhose.webp';
import conveyorImg from '../assets/products/conveyor.webp';
import powerImg from '../assets/products/power.jpg';

// Footer component extracted from App.js
const Footer = () => {
  const [email, setEmail] = useState("");

  // Simulate subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    // Here you could send the email to your backend
    alert(`Subscribed! You will receive updates about new products at: ${email}`);
    setEmail("");
  };

  return (
    <footer
      style={{
        width: "100%",
        background: "#335e59",
        color: "#fff",
        padding: "32px 0 0 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Main columns row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo and Company Name */}
          <div style={{
            flex: "0 0 260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
          }}>
            <img
              src={logo}
      alt="GUAN YIAC HARDWARE"
              style={{
                width: 120,
                height: 120,
                objectFit: "contain",
                marginBottom: 16,
                filter: "invert(1) brightness(2)",
                display: "block"
              }}
            />
            <div style={{
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: 4,
              fontFamily: "Jockey One, Arial, sans-serif",
              marginBottom: 8,
              textAlign: "center"
            }}>
              GUAN YIAC
      </div>
            <div style={{
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: 6,
              fontFamily: "Jockey One, Arial, sans-serif",
              marginBottom: 8,
              textAlign: "center"
            }}>
              HARDWARE
      </div>
            <div style={{
              fontSize: 13,
              opacity: 0.7,
              marginTop: 16,
              marginBottom: 24,
              textAlign: "center"
            }}>
              © 2025 · GUAN YIAC HARDWARE | ALL RIGHTS RESERVED
      </div>
    </div>

          {/* Right: Contact Info and Useful Links */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: 32 }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
              {/* Contact Info */}
              <div style={{
                flex: 1,
                marginRight: 32,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 400,
                fontSize: 16
              }}>
                <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                  <svg width="22" height="22" style={{ marginRight: 10 }} fill="#fff" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  455 Tomas Pinpin St. Binondo Manila, 1006 Manila, Philippines
                </div>
                <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                  <svg width="22" height="22" style={{ marginRight: 10 }} fill="#fff" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
                  </svg>
                  <a href="tel:8245-702" style={{ color: "#fff", textDecoration: "underline" }}>8245-702</a>
                </div>
                <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                  <svg width="22" height="22" style={{ marginRight: 10 }} fill="#fff" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:sales@guanyiac.com.ph" style={{ color: "#fff", textDecoration: "underline", fontWeight: 500 }}>
                    sales@guanyiac.com.ph
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg width="22" height="22" style={{ marginRight: 10 }} fill="#fff" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href="mailto:customersupport@guanyiac.com.ph" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>
                    customersupport@guanyiac.com.ph
                  </a>
                </div>
              </div>
              {/* Vertical Divider */}
              <div style={{
                width: 2,
                background: "rgba(255,255,255,0.3)",
                height: 120,
                margin: "0 32px"
              }} />
              {/* Useful Links */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: 24,
                  marginBottom: 16,
                  letterSpacing: 2,
                  fontFamily: "Jockey One, Arial, sans-serif"
                }}>
                  Useful links
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Link to="/services" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>Our Services</Link>
                    <Link to="/brands" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>Our Brand Partners</Link>
                    <Link to="/terms-of-use" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>Terms and Conditions</Link>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Link to="/about" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>About Us</Link>
                    <Link to="/contact" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>Contact Us</Link>
                    <Link to="/privacy-policy" style={{
                      color: "#fff",
                      textDecoration: "underline",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Jockey One, Arial, sans-serif"
                    }}>Privacy Policy</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Newsletter Section */}
            <div
              style={{
                maxWidth: 650,
                margin: "32px auto 0 auto",
                padding: "0 0 24px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {/* Left: Newsletter Title */}
              <div style={{
                fontFamily: "Jockey One, Arial, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#fff",
                minWidth: 120,
                lineHeight: 1.2,
                textAlign: "left"
              }}>
                Join Our<br />Newsletter<br />Now
              </div>
              {/* Center: Description */}
              <div style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 1,
                maxWidth: 180,
                textAlign: "left"
              }}>
                SUBSCRIBE FOR UPDATES ON OUR INDUSTRIAL PRODUCTS AND EXCLUSIVE OFFERS.
              </div>
              {/* Right: Email Form */}
              <form onSubmit={handleSubscribe} style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                <input
                  type="email"
                  placeholder="ENTER YOUR MAIL"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "8px 10px",
                    fontSize: 14,
                    fontFamily: "Jockey One, Arial, sans-serif",
                    minWidth: 120
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    background: "#335e59",
                    color: "#fff",
                    border: "2px solid #335e59",
                    fontWeight: 700,
                    fontFamily: "Jockey One, Arial, sans-serif",
                    fontSize: 14,
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  </footer>
);
};

export default function PublicLayout({
  children,
}) {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="home">
      <header className="top-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Guanyiac" className="company-logo" />
            <span className="company-text">GUANYIAC</span>
          </div>
          <div className="header-right">
            <div className="social-links">
              <a
                href="https://www.facebook.com/guanyiachardwaremnl/?_rdc=2&_rdr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fbIcon} alt="Facebook" className="social-icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/guanyiac"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/guanyiachardwaremanila/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={igIcon} alt="Instagram" className="social-icon" />
              </a>
            </div>
            <div className="divider">|</div>
            <Link to="/login" className="login-button">
              <img src={loginIcon} alt="Login" className="login-icon" />
              <span>LOGIN</span>
            </Link>
          </div>
        </div>
      </header>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}