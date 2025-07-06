import React, { useEffect, useState } from "react";
import axios from "axios";
import bg from '../assets/partners/bg.jpg';
import API_BASE_URL from '../config'; // or './config' if in src/

export default function BrandPartners() {
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

  return (
    <div style={{ background: "#fff" }}>
      {/* Banner Section */}
      <div
        style={{
          width: "100%",
          minHeight: 260,
          position: "relative",
          background: `url(${bg}) center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px 32px 16px",
          overflow: "hidden",
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
            background: "rgba(0,0,0,0.65)", // <--- More dim!
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
            Our Brand Partners
          </h1>
          <p
            style={{
              color: "#fff",
              fontSize: "1.25rem",
              maxWidth: 900,
              margin: "24px auto 0 auto",
              textAlign: "center",
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              fontFamily: "Jockey One, Arial, sans-serif"
            }}
          >
            Our partners are among the best of the best in their respective industries in terms of product quality, service, and recognition. Their contributions on global manufacturing and distribution are considered to have brought the greatest of impacts towards our industrial innovations. Listed here, but not limited to, are our partners that literally help make societies grow. And, many more will follow.
          </p>
        </div>
      </div>

      {/* Logos Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "56px",
          padding: "56px 0 48px 0",
          minHeight: 180,
        }}
      >
        {partners.length === 0 ? (
          <p style={{ color: "#888" }}>No brand partners to display yet.</p>
        ) : (
          partners.map((p) => (
            <img
              key={p.id}
              src={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${API_BASE_URL}${p.image_url}`) : undefined}
              alt={p.name}
              style={{
                width: 280,
                height: 140,
                objectFit: "contain",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                margin: "0 24px"
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
