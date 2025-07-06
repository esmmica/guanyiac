import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import front1 from '../assets/products/front1.jpg';
import front2 from '../assets/products/front2.webp';
import front3 from '../assets/products/front3.jpg';
import front4 from '../assets/products/front4.jpg';
import API_BASE_URL from '../config'; // or './config' if in src/

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      image: front1,
      titleKey: 'carousel.slide1.title',
      subtitleKey: 'carousel.slide1.subtitle',
    },
    {
      image: front2,
      titleKey: 'carousel.slide2.title',
      subtitleKey: 'carousel.slide2.subtitle',
    },
    {
      image: front3,
      titleKey: 'carousel.slide3.title',
      subtitleKey: 'carousel.slide3.subtitle',
    },
    {
      image: front4,
      titleKey: 'carousel.slide4.title',
      subtitleKey: 'carousel.slide4.subtitle',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div 
        className="carousel-slide" 
        style={{ transform: `translateX(-${currentSlide * 25}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide-item">
            <img src={slide.image} alt={t(slide.titleKey)} />
            {currentSlide === index && (
              <div className="carousel-content">
                <h2 className="carousel-title">{t(slide.titleKey)}</h2>
                <p className="carousel-subtitle">{t(slide.subtitleKey)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
