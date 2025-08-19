import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Typography,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress, // For loading state
    Divider, // Added for the new divider
    Button,
    Badge, // NEW: For the inquiry cart badge (now unused, but keeping import for clarity)
    Snackbar, // NEW: For notifications (now unused, but keeping import for clarity)
    TextField, // Used for SAP input dialog (now unused, but keeping import for clarity)
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // NEW: For Snackbar alerts (now unused, but keeping import for clarity)
import IconButton from '@mui/material/IconButton'; // Ensure IconButton is imported
import { Link } from 'react-router-dom'; // Ensure Link is imported

// Import icons for features (examples, you might need to add more or specific ones)
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle'; // Placeholder for other icons like smooth surface, flexibility etc.
import StraightenIcon from '@mui/icons-material/Straighten'; // For diameter
import OpacityIcon from '@mui/icons-material/Opacity'; // For working pressure
import ThermostatIcon from '@mui/icons-material/Thermostat'; // For temperature
import SpeedIcon from '@mui/icons-material/Speed'; // For bursting pressure
import CompressIcon from '@mui/icons-material/Compress'; // For crushing resistance
import ScienceIcon from '@mui/icons-material/Science'; // For chemical resistance
import PrintIcon from '@mui/icons-material/Print'; // For print page button
import TableChartIcon from '@mui/icons-material/TableChart'; // For print table button
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // For carousel navigation
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // For carousel navigation
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // NEW: For inquiry icon (now unused, but keeping import for clarity)
import API_BASE_URL from '../config'; // or './config' if in src/
// REMOVED: Import Dialog components for SAP input - they are now in App.js
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// REMOVED: Import the InquiryModal component - it is now in App.js
// import InquiryModal from './InquiryModal';

// {{ MODIFIED: Accept inquiry-related props }}
export default function ProductDetailPage({
    inquiryCart,
    handleAddToInquiryWithSap,
    handleOpenSapInputDialog,
    handleRemoveInquiryItem, // This might not be used directly here now, but pass for consistency
    handleOpenInquiryModal, // This might not be used directly here now, but pass for consistency
    handleCloseInquiryModal, // This might not be used directly here now, but pass for consistency
    handleSubmitInquiry, // This might not be used directly here now, but pass for consistency
}) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); // NEW: State for related products
    // REMOVED: State for the inquiry cart (now global in App.js)
    // const [inquiryCart, setInquiryCart] = useState([]);
    // REMOVED: State for Snackbar (now global in App.js)
    // const [snackbarOpen, setSnackbarOpen] = useState(false);
    // const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    // REMOVED: State for Inquiry Modal visibility (now global in App.js)
    // const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    // REMOVED: States for the SAP input dialog (now global in App.js)
    // const [isSapInputDialogOpen, setIsSapInputDialogOpen] = useState(false);
    // const [currentSapInput, setCurrentSapInput] = useState('');
    // const [productInfoForSapDialog, setProductInfoForSapDialog] = useState(null);


    // NEW: Create a ref for the specifications table
    const specsTableRef = useRef(null);

    // Helper functions to parse combined strings
    const parseCombinedDimension = (value) => {
        if (!value) return { unit1: 'N/A', unit2: 'N/A' };
        const match = value.match(/(\S+)\s*\((.+)\)/);
        if (match) {
            return { unit1: match[1].trim(), unit2: match[2].trim() };
        }
        return { unit1: value.trim(), unit2: 'N/A' }; // Fallback if no second unit
    };

    const parseCombinedWeight = (value) => {
        if (!value) return { unit1: 'N/A', unit2: 'N/A' };
        const match = value.match(/(\S+)\s*\((.+)\)/);
        if (match) {
            return { unit1: match[1].trim(), unit2: match[2].trim() };
        }
        return { unit1: value.trim(), unit2: 'N/A' }; // Fallback if no second unit
    };

    const parseCombinedMaxWp = (value) => {
        if (!value) return { unit1: 'N/A', unit2: 'N/A' };
        const match = value.match(/(\S+)\s*\((.+)\)/);
        if (match) {
            return { unit1: match[1].trim(), unit2: match[2].trim() };
        }
        return { unit1: value.trim(), unit2: 'N/A' }; // Fallback if no second unit
    };

    // NEW Helper function to transform flat specs into grouped/pivoted format for display
    const prepareSpecsForDisplay = (flatSpecs) => {
        const groupedSpecsMap = new Map();

        flatSpecs.forEach(spec => {
            const modelSeriesKey = spec.model_series || 'Default Model Series';
            if (!groupedSpecsMap.has(modelSeriesKey)) {
                groupedSpecsMap.set(modelSeriesKey, {
                    model_series: modelSeriesKey,
                    uniqueColors: new Set(),
                    rows: []
                });
            }
            const modelGroup = groupedSpecsMap.get(modelSeriesKey);
            modelGroup.uniqueColors.add(spec.color || 'N/A Color');
        });

        groupedSpecsMap.forEach(modelGroup => {
            modelGroup.uniqueColors = Array.from(modelGroup.uniqueColors).sort();
        });

        groupedSpecsMap.forEach(modelGroup => {
            const rowMap = new Map();

            flatSpecs
                .filter(spec => (spec.model_series || 'Default Model Series') === modelGroup.model_series)
                .forEach(spec => {
                    const rowKey = `${spec.nom_id}-${spec.nom_od}-${spec.max_wp}-${spec.weight}`;
                    if (!rowMap.has(rowKey)) {
                        rowMap.set(rowKey, {
                            sapsByColor: {},
                            nom_id: spec.nom_id,
                            nom_od: spec.nom_od,
                            max_wp: spec.max_wp,
                            weight: spec.weight,
                        });
                    }
                    rowMap.get(rowKey).sapsByColor[spec.color || 'N/A Color'] = spec.sap;
                });

            modelGroup.rows = Array.from(rowMap.values());
            modelGroup.rows.sort((a, b) => a.nom_id.localeCompare(b.nom_id));
        });

        return Array.from(groupedSpecsMap.values()).sort((a, b) => a.model_series.localeCompare(b.model_series));
    };

    // NEW: Helper function to get the appropriate icon based on feature name
    const getFeatureIcon = (featureName) => {
        const iconStyle = { color: '#2f615d' }; // Apply the dark teal color to icons
        switch (featureName.toUpperCase()) {
            case 'SMOOTH SURFACE':
            case 'FLEXIBILITY':
            case 'ABRASION RESISTANCE':
                return <CircleIcon sx={iconStyle} />;
            case 'TEMPERATURE RANGE':
                return <ThermostatIcon sx={iconStyle} />;
            case 'CHEMICAL RESISTANCE':
                return <ScienceIcon sx={iconStyle} />;
            case 'CRUSHING RESISTANCE':
                return <CompressIcon sx={iconStyle} />;
            default:
                return <CircleIcon sx={iconStyle} />; // Default icon if no specific match
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                console.log('Fetching product details for ID:', productId); // Debug log
                
                const productResponse = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
                console.log('Product details received:', productResponse.data); // Debug log
                setProduct(productResponse.data);

                // Fetch related products
                const relatedResponse = await axios.get(`${API_BASE_URL}/api/products?limit=5`);
                console.log('Related products received:', relatedResponse.data); // Debug log
                setRelatedProducts(relatedResponse.data);

                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                console.error('Error response:', err.response?.data); // More detailed error
                setError('Failed to load product details or related products.');
                setProduct(null);
                setRelatedProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    // REMOVED: All local inquiry functions as they are now global in App.js
    // const handleAddToInquiry = ...
    // const handleRemoveInquiryItem = ...
    // const handleSnackbarClose = ...
    // const handleOpenInquiryModal = ...
    // const handleCloseInquiryModal = ...
    // const handleSubmitInquiry = ...
    // const handleOpenSapInputDialog = ...
    // const handleCloseSapInputDialog = ...
    // const handleConfirmSapInput = ...


    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <LinearProgress />
                <Typography variant="h6" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                    Loading product details...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
                    Product not found.
                </Typography>
            </Container>
        );
    }

    const displaySpecs = prepareSpecsForDisplay(product.product_specs || []);

    // NEW: Dynamically create the features array for display from product.product_features
    const featuresToDisplay = (product.product_features || []).map(feature => ({
        ...feature,
        icon: getFeatureIcon(feature.name)
    }));

    // Function to scroll the related products carousel
    const scrollRelatedProducts = (direction) => {
        const container = document.getElementById('related-products-scroll-container');
        if (container) {
            const scrollAmount = container.clientWidth / 2; // Scroll half the container width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // NEW: Function to handle printing only the table
    const handlePrintTable = () => {
        if (specsTableRef.current) {
            const printContent = specsTableRef.current.innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Product Specifications</title>');
            // Optional: Add basic styles for print
            printWindow.document.write('<style>');
            printWindow.document.write(`
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                @media print {
                    /* Hide elements you don't want to print in the new window if any */
                    .hide-on-print {
                        display: none !important;
                    }
                }
            `);
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(printContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            // printWindow.close(); // You might want to close it after a slight delay for some browsers
        } else {
            alert("Specifications table not found for printing.");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            {/* NEW: Wrapper for Printable Product Details */}
            {/* This Box will contain all content meant for "Print Page" */}
            <Box
                id="printable-product-details"
                sx={{
                    bgcolor: '#2C5E57', // Dark teal background
                    py: 4, // Vertical padding
                    mb: 0, // No margin bottom, as the separator will follow
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{
                        bgcolor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        p: 4,
                    }}>
                        {/* Fix side-by-side layout for desktop screens by using flex box directly */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 4,
                            alignItems: 'flex-start',
                            mb: 4,
                          }}
                        >
                          {/* Product Image Section - Left */}
                          <Box
                            sx={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#f0f0f0',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              height: { xs: 'auto', md: '350px' },
                              minHeight: '250px',
                            }}
                          >
                            <img
                              src={product.image_url ? `${API_BASE_URL}${product.image_url}` : '/path-to-default-image.jpg'}
                              alt={product.name}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                          </Box>

                          {/* Product Info Section - Right */}
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h3"
                              gutterBottom
                              sx={{
                                color: '#2f615d',
                                fontWeight: 'bold',
                                mb: 2,
                                textAlign: { xs: 'center', md: 'left' },
                              }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textPrimary"
                              paragraph
                              sx={{ textAlign: 'justify' }}
                            >
                              {product.description ||
                                'A detailed description of the product and its various applications, benefits, and key features. This text should provide comprehensive information to the user, highlighting why this product is suitable for their needs.'}
                            </Typography>
                            {/* MODIFIED: Use prop handleOpenSapInputDialog */}
                            <Button
                                variant="contained"
                                onClick={() => handleOpenSapInputDialog(product.id, product.name)}
                                sx={{
                                    mt: 2,
                                    bgcolor: '#2f615d',
                                    color: 'white',
                                    '&:hover': { bgcolor: '#244a47' },
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                ADD TO INQUIRY
                            </Button>
                          </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* White Separator Line below the image/description section */}
            <Box sx={{
                width: '100%',
                borderBottom: '1px solid #ddd', // Light gray line
                mt: 4, // Margin top for spacing from the section above
                mb: 4, // Margin bottom for spacing from the features section
            }} />

            {/* Features Section */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Box
                sx={{
                  maxWidth: 500,
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  px: 2,
                  gap: 3, // Add vertical spacing between rows
                }}
              >
                {featuresToDisplay.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      pb: 1.5,
                      borderBottom: index < featuresToDisplay.length - 1 ? '1px solid #ddd' : 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {feature.icon}
                      <Typography
                        variant="body1"
                        sx={{ ml: 2, fontWeight: 'medium', color: '#333' }}
                      >
                        {feature.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {feature.rating !== undefined ? (
                        <Box sx={{ display: 'flex' }}>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              sx={{
                                fontSize: '1.2em',
                                color: i < feature.rating ? '#FFD700' : '#d3d3d3',
                              }}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" sx={{ color: '#333' }}>
                          {feature.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Specifications Table Section */}
            <Grid item xs={12}>
                {displaySpecs.length > 0 ? (
                    <TableContainer
                        ref={specsTableRef}
                        sx={{
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            bgcolor: '#f5f5f5',
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="product specifications table">
                            {displaySpecs.map((modelGroup, modelGroupIndex) => (
                                <React.Fragment key={modelGroupIndex}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={modelGroup.uniqueColors.length + 8} sx={{ fontWeight: 'bold', fontSize: '1.05rem', pt: 2, pb: 0, borderBottom: 'none', bgcolor: '#f5f5f5', color: '#2f615d' }}>
                                                {modelGroup.model_series}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>SAP #</TableCell>
                                            {modelGroup.uniqueColors.map(color => (
                                                <TableCell key={color} sx={{ fontWeight: 'bold', color: '#2f615d', borderLeft: '1px solid #e0e0e0' }}>
                                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                                </TableCell>
                                            ))}
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Nom. ID (in.)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Nom. ID (mm)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Nom. OD (in.)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Nom. OD (mm)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Max. WP (psi)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Max. WP (MPa)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Weight (lb./ft.)</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Weight (kg/m)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {modelGroup.rows.map((row, rowIndex) => (
                                            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">SAP #</TableCell>
                                                {modelGroup.uniqueColors.map(color => {
                                                    const sapValue = row.sapsByColor[color];
                                                    console.log('SAP value for Add button:', sapValue);
                                                    return (
                                                        <TableCell key={`${rowIndex}-${color}`} sx={{ borderLeft: '1px solid #e0e0e0' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Typography variant="body2">
                                                                    {sapValue || '---'} {/* Display '---' for empty SAPs */}
                                                                </Typography>
                                                                {sapValue && sapValue !== '---' && ( // Only show button if SAP exists and is not '---'
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onClick={() => handleAddToInquiryWithSap(product.id, product.name, sapValue)}
                                                                        sx={{
                                                                            minWidth: 'unset', // Allow button to shrink
                                                                            p: '4px 8px', // Smaller padding
                                                                            fontSize: '0.75rem', // Smaller font
                                                                            color: '#2f615d',
                                                                            borderColor: '#2f615d',
                                                                            '&:hover': {
                                                                                borderColor: '#2f615d',
                                                                                bgcolor: 'rgba(47, 97, 93, 0.04)'
                                                                            }
                                                                        }}
                                                                        className="hide-on-print"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                    );
                                                })}
                                                {/* Parsed dimensional data */}
                                                <TableCell>{parseCombinedDimension(row.nom_id).unit1}</TableCell>
                                                <TableCell>{parseCombinedDimension(row.nom_id).unit2}</TableCell>
                                                <TableCell>{parseCombinedDimension(row.nom_od).unit1}</TableCell>
                                                <TableCell>{parseCombinedDimension(row.nom_od).unit2}</TableCell>
                                                <TableCell>{parseCombinedMaxWp(row.max_wp).unit1}</TableCell>
                                                <TableCell>{parseCombinedMaxWp(row.max_wp).unit2}</TableCell>
                                                <TableCell>{parseCombinedWeight(row.weight).unit1}</TableCell>
                                                <TableCell>{parseCombinedWeight(row.weight).unit2}</TableCell>
                                            </TableRow>
                                        ))}
                                        {modelGroupIndex < displaySpecs.length - 1 && (
                                            <TableRow>
                                                <TableCell colSpan={modelGroup.uniqueColors.length + 8} sx={{ borderBottom: '2px solid #ddd', py: 2 }}></TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </React.Fragment>
                            ))}
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1" color="textSecondary">No specifications available for this product.</Typography>
                )}
            </Grid>

            {/* Print Buttons */}
            <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrintTable}
                    sx={{ color: '#2f615d', borderColor: '#2f615d', '&:hover': { borderColor: '#2f615d', bgcolor: 'rgba(47, 97, 93, 0.04)' } }}
                >
                    PRINT TABLE
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => window.print()}
                    sx={{ color: '#2f615d', borderColor: '#2f615d', '&:hover': { borderColor: '#2f615d', bgcolor: 'rgba(47, 97, 93, 0.04)' }, ml: 2 }}
                >
                    PRINT PAGE
                </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Related Products Section */}
            <Box sx={{ py: 4, bgcolor: '#2C5E57', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', mb: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                        RELATED PRODUCTS
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        {/* Scroll buttons */}
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}>
                            <ArrowBackIosIcon
                                sx={{
                                    color: '#2f615d',
                                    fontSize: 40,
                                    cursor: 'pointer',
                                    pointerEvents: 'auto',
                                    ml: -2,
                                }}
                                onClick={() => scrollRelatedProducts('left')}
                            />
                            <ArrowForwardIosIcon
                                sx={{
                                    color: '#2f615d',
                                    fontSize: 40,
                                    cursor: 'pointer',
                                    pointerEvents: 'auto',
                                    mr: -2,
                                }}
                                onClick={() => scrollRelatedProducts('right')}
                            />
                        </Box>

                        {/* Related Products Scrollable Container */}
                        <Box
                            id="related-products-scroll-container"
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                '&::-webkit-scrollbar': { display: 'none' },
                                gap: 3,
                                py: 2,
                                pb: 4,
                                pr: 2,
                                pl: 2,
                            }}
                        >
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map((relatedProduct) => (
                                    <Box
                                        key={relatedProduct.id}
                                        sx={{
                                            flexShrink: 0,
                                            width: { xs: 'calc(50% - 12px)', sm: 'calc(33.33% - 16px)', md: 'calc(25% - 18px)', lg: 'calc(20% - 20px)' },
                                            minWidth: '160px',
                                            bgcolor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                            p: 2,
                                            textAlign: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                boxShadow: '0 0 10px rgba(47, 97, 93, 0.5)',
                                            },
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                        component={Link} // Use Link component for navigation
                                        to={`/product/${relatedProduct.id}`}
                                    >
                                        <Box sx={{ width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                            <img
                                                src={relatedProduct.image_url ? `${API_BASE_URL}${relatedProduct.image_url}` : '/path-to-default-image.jpg'}
                                                alt={relatedProduct.name}
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                        </Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                            {relatedProduct.name}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1" sx={{ color: '#2f615d', width: '100%', textAlign: 'center' }}>
                                    No related products found.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

        </Box>
    );
}
