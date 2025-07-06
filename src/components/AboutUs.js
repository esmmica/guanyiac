import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import missionVisionPic from '../assets/icons/pic.webp';
import API_BASE_URL from '../config'; // or './config' if in src/
// Import your images
// import banner from '../assets/about/banner.jpg'; // Uncomment if you have a banner image

// Industrial/hardware themed Unsplash images
const images = [
  "https://www.guanyiac.com.ph/img/blog/h2-1.jpg", // Large left
  "https://www.guanyiac.com.ph/img/blog/h2-2.jpg", // Top right
  "https://www.guanyiac.com.ph/img/blog/h2-3.jpg"  // Bottom right
];

export default function AboutUs() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/brand-partners`);
        setPartners(res.data);
      } catch (err) {
        setPartners([]);
      }
    };
    fetchPartners();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <>
      {/* About Us Section */}
      <div style={{
        maxWidth: 1100,
        margin: "48px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "48px 0",
        display: "flex",
        alignItems: "flex-start",
        gap: 56
      }}>
        {/* Image Grid */}
        <div style={{
          display: "flex",
          gap: 24,
          alignItems: "stretch",
          maxWidth: 800,
          margin: "40px auto"
        }}>
          {/* Left: Large Image */}
          <div style={{ flex: 1 }}>
            <img
              src={images[0]}
              alt="Guanyiac 1"
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
                borderRadius: 16
              }}
            />
          </div>
          {/* Right: Two stacked images */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1
          }}>
            <img
              src={images[1]}
              alt="Guanyiac 2"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 16
              }}
            />
            <img
              src={images[2]}
              alt="Guanyiac 3"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 16
              }}
            />
          </div>
        </div>
        {/* About Us Text */}
        <div style={{ flex: 1, marginRight: 64 }}>
          <div style={{ color: "#2f615d", fontWeight: 700, fontSize: 24, letterSpacing: 1, marginBottom: 12 }}>
            ABOUT US
          </div>
          <div style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
            We give you the utmost service<br />possibly offered.
          </div>
          <div style={{ fontSize: 18, color: "#222", marginBottom: 24 }}>
            Established during the early 1950's, <b style={{ fontWeight: 700 }}>Guan Yiac</b> has served the Philippine Industry for almost all its industrial needs. Conveyor Systems, Power Transmission Products and Industrial Hoses are just some of its primary products. For more than half a century now, Guan Yiac has still preserved its legacy to promote good products and superior services for all its customer's satisfaction.
          </div>
          <div style={{ fontSize: 18, color: "#222" }}>
            <b style={{ fontWeight: 700 }}>Guan Yiac Hardware</b> is a wholesale, retail, and manufacturing company based in Binondo Manila. The company prides itself with bountiful varied high-quality industrial products from around the globe along with prioritizing our customers by giving them the utmost service possibly offered.
          </div>
        </div>
      </div>

      {/* Brand Partners Section BELOW the card */}
      <div style={{
        maxWidth: 1100,
        margin: "48px auto 0 auto",
      }}>
        <div style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 36,
          color: "#222",
          fontFamily: "Jockey One, Arial, sans-serif"
        }}>
          Some of Our Brand Partners
        </div>
        <div style={{
          width: 120,
          height: 5,
          background: "linear-gradient(90deg, #2f615d 60%, #8bc34a 100%)",
          margin: "16px auto 32px auto",
          borderRadius: 3
        }} />
        <Slider {...sliderSettings}>
          {partners.length === 0 ? (
            <div>
              <p style={{ color: "#888" }}>No brand partners to display yet.</p>
            </div>
          ) : (
            partners.map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${API_BASE_URL}${p.image_url}`) : undefined}
                  alt={p.name}
                  style={{
                    height: 160,
                    width: "auto",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: 24,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                    padding: 24,
                    margin: "0 12px"
                  }}
                />
              </div>
            ))
          )}
        </Slider>
      </div>

      {/* Mission & Vision Section */}
      <div style={{
        maxWidth: 1100,
        margin: "48px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "48px 40px",
        display: "flex",
        alignItems: "center",
        gap: 56,
        flexWrap: "wrap"
      }}>
        {/* Left: Mission & Vision Text */}
        <div style={{ flex: 1, minWidth: 320, paddingLeft: 30 }}>
          <div style={{ color: "#2f615d", fontWeight: 700, fontSize: 24, letterSpacing: 1, marginBottom: 12 }}>
            OUR MISSION
          </div>
          <div style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
            Revamping Industries for a<br />Brighter Tomorrow
          </div>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
            {[
              "Convenience to Customers",
              "Affordable Prices",
              "Quality Products"
            ].map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "center", fontSize: 18, marginBottom: 10 }}>
                <span style={{ color: "#2f615d", marginRight: 12 }}>
                  {/* Check SVG */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#2f615d"/>
                    <path d="M7 13.5L10.5 17L17 10.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ color: "#2f615d", fontWeight: 700, fontSize: 24, letterSpacing: 1, marginBottom: 12 }}>
            OUR VISION
          </div>
          <div style={{ fontSize: 24, fontWeight: 400, lineHeight: 1.1 }}>
            To be the <span style={{ fontWeight: 700 }}>Most Reliable and Trustable</span><br />
            Supplier of Industrial Products in the Philippines
          </div>
        </div>
        {/* Right: Decorative Image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="https://www.sp-reas.eu/common7/image/image_resize.php?width=594&image=/images/boxy/box-obrazek-para-20.png&valign=middle&cropratio=594:545"
            alt="Mission Vision"
            style={{
              width: "100%",
              maxWidth: 500,
              height: "auto",
              display: "block"
            }}
          />
        </div>
      </div>
    </>
  );
}
