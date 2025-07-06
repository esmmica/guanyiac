import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Menu, MenuItem } from '@mui/material';
import API_BASE_URL from '../config';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories`);
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories for navigation:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <ul className="nav-menu">
          <li><Link to="/" className="active">{t('nav.home')}</Link></li>
          <li
            className="product-dropdown"
            tabIndex={0}
            onMouseEnter={() => setShowProductDropdown(true)}
            onMouseLeave={() => setShowProductDropdown(false)}
            onFocus={() => setShowProductDropdown(true)}
            onBlur={() => setShowProductDropdown(false)}
            style={{ position: 'relative' }}
          >
            <Link
              to="#"
              className="nav-link"
              tabIndex={-1}
              style={{ pointerEvents: 'none', background: 'none', border: 'none' }}
            >
              {t('nav.product')}
            </Link>
            {showProductDropdown && (
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/products/category/${category.id}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className="company-dropdown"
            tabIndex={0}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            style={{ position: 'relative' }}
          >
            <Link
              to="#"
              className="nav-link"
              tabIndex={-1}
              style={{ pointerEvents: 'none', background: 'none', border: 'none' }}
            >
              {t('nav.company')}
            </Link>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/brands">Brand Partners</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contact">{t('nav.contact')}</Link></li>
        </ul>
        <div className="nav-tools">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder={t('nav.search')} 
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 