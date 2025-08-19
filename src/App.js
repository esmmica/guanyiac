import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CreateProductType from './components/CreateProductType';
import PublicLayout from './components/PublicLayout';
import ProductCarousel from './components/Carousel';
import ProductCategoryPage from './components/ProductCategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import axios from 'axios';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import BrandPartners from './components/BrandPartners';
import ScrollToTop from './components/ScrollToTop';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE_URL from './config';

// Import assets
import logo from './assets/icons/guanyiac.png';
import fbIcon from './assets/icons/fb.png';
import linkedinIcon from './assets/icons/linkn.png';
import igIcon from './assets/icons/ig.png';
import loginIcon from './assets/icons/login.png';
import footerLogo from './assets/icons/fguanyiac.jpg';

// Import product images
import industrialHoseImg from './assets/products/industrialhose.webp';
import conveyorImg from './assets/products/conveyor.webp';
import powerImg from './assets/products/power.jpg';

// {{ NEW: Import Material-UI components for global inquiry system }}
import {
  Box,
  Badge,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField, // Used in the SAP input dialog
  Button // Used in the dialog actions
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // For Snackbar alerts
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // For the inquiry icon

// {{ NEW: Import InquiryModal }}
import InquiryModal from './components/InquiryModal';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);

  // {{ NEW: States for the global inquiry cart }}
  const [inquiryCart, setInquiryCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isSapInputDialogOpen, setIsSapInputDialogOpen] = useState(false);
  const [currentSapInput, setCurrentSapInput] = useState('');
  // {{ NEW: State to temporarily hold product info for SAP input dialog }}
  const [productInfoForSapDialog, setProductInfoForSapDialog] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // {{ NEW: Global inquiry system functions (moved from ProductDetailPage.js) }}
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleOpenInquiryModal = () => {
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setIsInquiryModalOpen(false);
  };

  const handleAddToInquiryWithSap = (productId, productName, productSap) => {
    console.log('Adding to inquiry:', { productId, productName, productSap });
    if (!productSap || productSap.trim() === '' || productSap === '---') {
      setSnackbarMessage(`Please enter a valid SAP number.`);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const isAlreadyInCart = inquiryCart.some(item => item.product_id === productId && item.product_sap === productSap);

    if (!isAlreadyInCart) {
      setInquiryCart(prevCart => [...prevCart, {
        product_id: productId,
        product_name: productName,
        product_sap: productSap
      }]);
      setSnackbarMessage(`"${productName} (SAP: ${productSap})" added to inquiry list!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage(`"${productName} (SAP: ${productSap})" is already in your inquiry list.`);
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
    setIsSapInputDialogOpen(false); // Close dialog after adding
    setCurrentSapInput(''); // Clear SAP input field
  };

  const handleRemoveInquiryItem = (itemToRemoveId, itemToRemoveSap) => {
    setInquiryCart(prevCart => prevCart.filter(item => !(item.product_id === itemToRemoveId && item.product_sap === itemToRemoveSap)));
    setSnackbarMessage('Product removed from inquiry list.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleSubmitInquiry = async (inquiryData) => {
    try {
      const dataToSend = {
        ...inquiryData,
        inquiry_items: inquiryData.inquiry_items
      };
      await axios.post(`${API_BASE_URL}/api/inquiries`, dataToSend);
      setSnackbarMessage('Inquiry submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setInquiryCart([]); // Clear the inquiry cart after successful submission
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setSnackbarMessage('Failed to submit inquiry. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Functions to handle the SAP input dialog
  const handleOpenSapInputDialog = (productId, productName) => {
    setProductInfoForSapDialog({ id: productId, name: productName });
    setIsSapInputDialogOpen(true);
  };

  const handleCloseSapInputDialog = () => {
    setIsSapInputDialogOpen(false);
    setCurrentSapInput(''); // Clear input on close
    setProductInfoForSapDialog(null); // Clear product info
  };

  const handleConfirmSapInput = () => {
    if (productInfoForSapDialog) {
      handleAddToInquiryWithSap(productInfoForSapDialog.id, productInfoForSapDialog.name, currentSapInput);
    }
  };

  useEffect(() => {
    const fetchNewProducts = async () => {
        try {
            console.log('Fetching new products...');
            const response = await axios.get(`${API_BASE_URL}/api/products`);
            console.log('All products fetched:', response.data);
            console.log('Setting new products:', response.data.slice(0, 6));
            setNewProducts(response.data.slice(0, 6));
        } catch (error) {
            console.error('Error fetching new products:', error);
            console.error('Error response:', error.response?.data);
            setNewProducts([]);
        }
    };

    fetchNewProducts();

    // Fetch categories for dynamic navigation
    const fetchCategories = async () => {
        try {
            console.log('Fetching categories...');
            const response = await axios.get(`${API_BASE_URL}/api/categories`);
            console.log('Categories fetched:', response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            console.error('Error response:', error.response?.data);
            setCategories([]);
        }
    };
    fetchCategories();

    // Fetch brand partners
    const fetchPartners = async () => {
        try {
            console.log('Fetching brand partners...');
            const res = await axios.get(`${API_BASE_URL}/api/brand-partners`);
            console.log('Brand partners fetched:', res.data);
            setPartners(res.data);
        } catch (err) {
            console.error('Error fetching brand partners:', err);
            console.error('Error response:', err.response?.data);
            setPartners([]);
        }
    };
    fetchPartners();
}, []);

  const interests = [
    {
      title: "Industrial Hoses",
      desc: "We provide high-quality industrial hoses made from durable materials such as rubber, plastic, and reinforced fabric, ensuring reliable performance in fluid and material transfer across various industries.",
      img: industrialHoseImg,
    },
    {
      title: "Conveyor Components",
      desc: "Our conveyor components, including rollers, belts, and frames, are designed to optimize material handling operations by enhancing efficiency, durability, and smooth transportation of goods.",
      img: conveyorImg,
    },
    {
      title: "Mechanical Power Transmission",
      desc: "We offer robust mechanical power transmission solutions such as belts, chains, and couplings, engineered to maximize productivity and minimize downtime.",
      img: powerImg,
    }
  ];

  // Find the category object for "Industrial Hoses"
  const industrialCategory = categories.find(cat => cat.name.toLowerCase().includes("industrial hose"));
  const industrialCategoryId = industrialCategory ? industrialCategory.id : null;

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
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/create-product-type" element={<CreateProductType />} />
        <Route path="/login" element={
          <PublicLayout>
            <Login onLogin={handleLogin} />
          </PublicLayout>
        } />
        <Route path="/products/category/:categoryId" element={
          <PublicLayout>
            <ProductCategoryPage
              inquiryCart={inquiryCart}
              handleAddToInquiryWithSap={handleAddToInquiryWithSap}
              handleOpenSapInputDialog={handleOpenSapInputDialog}
              handleRemoveInquiryItem={handleRemoveInquiryItem}
              handleOpenInquiryModal={handleOpenInquiryModal}
              handleCloseInquiryModal={handleCloseInquiryModal}
              handleSubmitInquiry={handleSubmitInquiry}
            />
          </PublicLayout>
        } />
        <Route path="/products/:productId" element={
          <PublicLayout>
            <ProductDetailPage
              inquiryCart={inquiryCart}
              handleAddToInquiryWithSap={handleAddToInquiryWithSap}
              handleOpenSapInputDialog={handleOpenSapInputDialog}
              handleRemoveInquiryItem={handleRemoveInquiryItem}
              handleOpenInquiryModal={handleOpenInquiryModal}
              handleCloseInquiryModal={handleCloseInquiryModal}
              handleSubmitInquiry={handleSubmitInquiry}
            />
          </PublicLayout>
        } />
        <Route path="/" element={
          <PublicLayout>
            <ProductCarousel />
            <section className="whats-new-section">
              <h1 className="section-heading">WHAT'S NEW</h1>
              <div className="new-products-container">
                {newProducts.length > 0 ? (
                  newProducts.map(product => (
                    <div className="new-product-card" key={product.id}>
                      <div className="new-badge">NEW</div>
                      <img
                        src={product.image_url ? `${API_BASE_URL}${product.image_url}` : '/path-to-default-image.jpg'}
                        alt={product.name}
                        style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#f0f0f0' }}
                      />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p style={{ fontSize: '0.9em', color: '#666', minHeight: '40px', maxHeight: '80px', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                          {product.description || 'Brief description of the new product and its features.'}
                        </p>
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            sx={{
                                mt: 1,
                                bgcolor: '#2f615d',
                                color: 'white',
                                '&:hover': { bgcolor: '#244a47' },
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                padding: '6px 12px'
                            }}
                          >
                              VIEW DETAILS
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No new products to display at the moment.</p>
                )}
              </div>
            </section>

            <section className="interest-section">
              <h1 className="interest-heading">WHAT ARE YOU INTERESTED IN?</h1>
              <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 0" }}>
                {/* Row 1: Industrial Hoses (clickable if category exists) */}
                <div style={{ display: "flex", marginBottom: 40, alignItems: "stretch", width: "100%", gap: 32 }}>
                  {/* Image */}
                  <div style={{
                    width: "68%",
                    minWidth: 0,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex"
                  }}>
                    <img
                      src={industrialHoseImg}
                      alt="Industrial Hoses"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 0,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        display: "block"
                      }}
                    />
                  </div>
                  {/* Text */}
                  <Link
                    to={industrialCategoryId ? `/products/category/${industrialCategoryId}` : "#"}
                    style={{ textDecoration: "none", width: "32%" }}
                  >
                    <div className={`interest-box${!industrialCategoryId ? " disabled" : ""}`}>
                      <div style={{
                        fontFamily: "Jockey One, Arial, sans-serif",
                        fontWeight: 700,
                        fontSize: 28,
                        marginBottom: 12,
                        borderBottom: "2px solid #fff",
                        display: "inline-block",
                        paddingBottom: 4
                      }}>
                        Industrial Hoses
                      </div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 400,
                        lineHeight: 1.5
                      }}>
                        We provide high-quality industrial hoses made from durable materials such as rubber, plastic, and reinforced fabric, ensuring reliable performance in fluid and material transfer across various industries.
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Row 2: Conveyor Components (not clickable, but styled the same) */}
                <div style={{ display: "flex", marginBottom: 40, alignItems: "stretch", width: "100%", gap: 32 }}>
                  {/* Text: Conveyor Components */}
                  <div className="interest-box disabled" style={{ width: "32%" }}>
                    <div style={{
                      fontFamily: "Jockey One, Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      marginBottom: 12,
                      borderBottom: "2px solid #fff",
                      display: "inline-block",
                      paddingBottom: 4
                    }}>
                      Conveyor Components
                    </div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: 1.5
                    }}>
                      Our conveyor components, including rollers, belts, and frames, are designed to optimize material handling operations by enhancing efficiency, durability, and smooth transportation of goods.
                    </div>
                  </div>
                  {/* Image: Conveyor Belts */}
                  <div style={{
                    width: "68%",
                    minWidth: 0,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex"
                  }}>
                    <img
                      src={conveyorImg}
                      alt="Conveyor Belts"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 0,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        display: "block"
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Mechanical Power Transmission (not clickable, but styled the same) */}
                <div style={{ display: "flex", alignItems: "stretch", width: "100%", gap: 32 }}>
                  {/* Image */}
                  <div style={{
                    width: "68%",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "flex-end"
                  }}>
                    <img
                      src={powerImg}
                      alt="Mechanical Power Transmission"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 0,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        display: "block"
                      }}
                    />
                  </div>
                  {/* Text */}
                  <div className="interest-box disabled" style={{ width: "32%" }}>
                    <div style={{
                      fontFamily: "Jockey One, Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      marginBottom: 12,
                      borderBottom: "2px solid #fff",
                      display: "inline-block",
                      paddingBottom: 4
                    }}>
                      Mechanical Power Transmission
                    </div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: 1.5
                    }}>
                      We offer robust mechanical power transmission solutions such as belts, chains, and couplings, engineered to maximize productivity and minimize downtime.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Partners Section BELOW the interest section */}
            <div style={{
              maxWidth: 1100,
              margin: "48px auto 130px auto",
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
                        src={
                          p.image_url
                            ? p.image_url.startsWith('http')
                              ? p.image_url
                              : `${API_BASE_URL}${p.image_url}`
                            : '/path-to-default-image.jpg'
                        }
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
          </PublicLayout>
        } />
        <Route path="/product" element={
          <PublicLayout>
            {/* Your product list/page content goes here */}
            {/* Example: <ProductListPage /> */}
          </PublicLayout>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={
          <PublicLayout>
            <ContactUs />
          </PublicLayout>
        } />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/about" element={
          <PublicLayout>
            <AboutUs />
          </PublicLayout>
        } />
        <Route path="/services" element={
          <PublicLayout>
            <OurServices />
          </PublicLayout>
        } />
        <Route path="/brands" element={
          <PublicLayout>
            <BrandPartners />
          </PublicLayout>
        } />
      </Routes>

      {/* {{ NEW: Floating Inquiry Cart Icon (Always visible) }} */}
      <Box
        sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            cursor: 'pointer',
        }}
        onClick={handleOpenInquiryModal}
      >
        <Badge badgeContent={inquiryCart.length} color="secondary" overlap="circular">
          <MailOutlineIcon
            sx={{
                fontSize: '3.5rem',
                color: '#2f615d',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                borderRadius: '50%',
                p: 1,
                bgcolor: 'white',
            }}
          />
        </Badge>
      </Box>

      {/* {{ NEW: Inquiry Modal (Global) }} */}
      <InquiryModal
        open={isInquiryModalOpen}
        onClose={handleCloseInquiryModal}
        inquiryCartItems={inquiryCart}
        onRemoveItem={handleRemoveInquiryItem}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* {{ NEW: SAP Input Dialog (Global) }} */}
      <Dialog open={isSapInputDialogOpen} onClose={handleCloseSapInputDialog}>
        <DialogTitle sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add Product to Inquiry</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter the SAP number for the product variant you wish to inquire about.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sap-number"
            label="SAP Number"
            type="text"
            fullWidth
            variant="outlined"
            value={currentSapInput}
            onChange={(e) => setCurrentSapInput(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleConfirmSapInput();
                }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSapInputDialog} sx={{ color: '#2f615d' }}>Cancel</Button>
          <Button onClick={handleConfirmSapInput} sx={{ bgcolor: '#2f615d', color: 'white', '&:hover': { bgcolor: '#244a47' } }}>
            Add to Inquiry
          </Button>
        </DialogActions>
      </Dialog>

      {/* {{ NEW: Snackbar for notifications (Global) }} */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    </Router>
  );
}

export default App;
