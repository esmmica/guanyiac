import React from "react";
import bg from '../assets/partners/bg.jpg';
import API_BASE_URL from '../config'; // or './config' if in src/

// You can replace these SVGs with your own icons if you have them as images
const services = [
  {
    icon: (
      <svg width="80" height="80" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64">
        <rect x="8" y="28" width="48" height="20" rx="4" />
        <rect x="16" y="20" width="32" height="8" rx="2" />
        <circle cx="20" cy="52" r="4" />
        <circle cx="44" cy="52" r="4" />
        <text x="32" y="43" textAnchor="middle" fontSize="12" fill="#2f615d" fontWeight="bold">FREE</text>
      </svg>
    ),
    title: "Free Delivery",
    desc: "Free Delivery for products worth P5,000 and above per transaction within Metro Manila. We value your time and convenience. And so, we will deliver your products to you directly, hassle-free."
  },
  {
    icon: (
      <svg width="80" height="80" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64">
        <circle cx="32" cy="24" r="10" />
        <rect x="18" y="34" width="28" height="14" rx="3" />
        <path d="M24 48v-6h16v6" />
        <path d="M28 38h8" />
      </svg>
    ),
    title: "Fabrication Services",
    desc: "We believe that you have your special needs. You deserve the best, so we will create them especially for you."
  },
  {
    icon: (
      <svg width="80" height="80" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64">
        <rect x="14" y="24" width="36" height="28" rx="4" />
        <rect x="22" y="16" width="20" height="8" rx="2" />
        <line x1="32" y1="16" x2="32" y2="52" />
      </svg>
    ),
    title: "Free Packaging",
    desc: "Worried about your products getting damaged and losing its functionality? Have no fear, we'll make sure it's packed well so you can feel at ease."
  },
  {
    icon: (
      <svg width="80" height="80" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64">
        <circle cx="32" cy="24" r="10" />
        <rect x="22" y="38" width="20" height="8" rx="4" />
        <rect x="28" y="46" width="8" height="4" rx="2" />
        <rect x="24" y="54" width="16" height="2" rx="1" />
      </svg>
    ),
    title: "Let Us Know",
    desc: "Have Questions or Concerns? Let us know so we can work through it and serve you better."
  }
];

export default function OurServices() {
  return (
    <>
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
          marginBottom: 32
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
            Our Services
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "64px auto", padding: "0 16px" }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 400,
          fontSize: 50,
          marginBottom: 48,
          fontFamily: "Jockey One, Arial, sans-serif"
        }}>
          Service Centered
        </h2>
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                background: "#f3f3f3",
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                padding: "24px 16px 20px 16px",
                width: 220,
                minWidth: 0,
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div style={{ marginBottom: 16 }}>{service.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 10, fontFamily: "Jockey One, Arial, sans-serif" }}>
                {service.title}
              </div>
              <div style={{ fontSize: 16, color: "#222", fontWeight: 400, lineHeight: 1.3 }}>
                {service.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Centered Section */}
      <div style={{ maxWidth: 952, margin: "64px auto", padding: "0 16px" }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 400,
          fontSize: 50,
          marginBottom: 48,
          fontFamily: "Jockey One, Arial, sans-serif"
        }}>
          Product Centered
        </h2>
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "nowrap"
          }}
        >
          {/* Product Recommendation Card */}
          <div
            style={{
              background: "#ededed",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "40px 32px 32px 32px",
              width: 464,
              minWidth: 0,
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            {/* Icon */}
            <svg width="64" height="64" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64" style={{ marginBottom: 24 }}>
              <rect x="12" y="20" width="40" height="28" rx="4" />
              <line x1="20" y1="32" x2="44" y2="32" />
              <line x1="20" y1="40" x2="44" y2="40" />
              <polygon points="32,26 29,31 35,31" fill="#2f615d" />
              <polygon points="32,16 34,22 40,22 35,26 37,32 32,28 27,32 29,26 24,22 30,22" fill="#2f615d" />
            </svg>
            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, fontFamily: "Jockey One, Arial, sans-serif" }}>
              Product Recommendation
            </div>
            <div style={{ fontSize: 18, color: "#222", fontWeight: 400, lineHeight: 1.3 }}>
              Life is a puzzle. But don't worry, we got you covered. Our experienced and knowledgeable partners are here to guide you so your day ends with a smile.
            </div>
          </div>
          {/* Product Assembly Card */}
          <div
            style={{
              background: "#ededed",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "40px 32px 32px 32px",
              width: 464,
              minWidth: 0,
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            {/* Icon */}
            <svg width="64" height="64" fill="none" stroke="#2f615d" strokeWidth="3" viewBox="0 0 64 64" style={{ marginBottom: 24 }}>
              <rect x="12" y="36" width="40" height="12" rx="3" />
              <circle cx="20" cy="52" r="2" />
              <circle cx="44" cy="52" r="2" />
              <rect x="28" y="20" width="8" height="8" rx="2" />
              <rect x="38" y="20" width="8" height="8" rx="2" />
              <rect x="18" y="20" width="8" height="8" rx="2" />
              <rect x="28" y="10" width="8" height="8" rx="2" />
              <rect x="38" y="10" width="8" height="8" rx="2" />
              <rect x="18" y="10" width="8" height="8" rx="2" />
              <rect x="24" y="28" width="16" height="4" rx="2" />
              <rect x="30" y="32" width="4" height="4" rx="2" />
            </svg>
            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, fontFamily: "Jockey One, Arial, sans-serif" }}>
              Product Assembly
            </div>
            <div style={{ fontSize: 18, color: "#222", fontWeight: 400, lineHeight: 1.3 }}>
              Opportunities come and go, and we can help you with that. We can have your product assembled for you so you won't miss another chance again.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
