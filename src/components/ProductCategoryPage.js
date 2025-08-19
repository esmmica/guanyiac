import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import axios from 'axios';
import API_BASE_URL from '../config';
import {
    Box,
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Typography,
    Button,
    Container,
    InputAdornment // NEW: Import InputAdornment for labels inside inputs
} from '@mui/material'; // NEW: Import Material-UI components
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // NEW: Import icon

export default function ProductCategoryPage() {
    const { categoryId } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate(); // NEW: Initialize navigate

    // State to hold products for the selected category
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // <--- THIS LINE IS CRUCIAL
    // State to hold applications for the selected category (needed for filtering products)
    const [applications, setApplications] = useState([]);
    // State to hold the category name for display
    const [categoryName, setCategoryName] = useState('Loading Category...');

    // NEW: State for Product Finder filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplicationId, setSelectedApplicationId] = useState(''); // Stores ID of selected app/sub-item
    const [filteredApplicationsInNavCategory, setFilteredApplicationsInNavCategory] = useState([]); // Filtered by current nav category

    // Sliders for ranges (using reasonable defaults for min/max for now)
    const [temperatureRange, setTemperatureRange] = useState([-100, 300]); // Example range
    const [weightRange, setWeightRange] = useState([0, 50]); // Example range in kg/m
    const [diameterRange, setDiameterRange] = useState([0, 100]); // Example range in mm
    const [workingPressureRange, setWorkingPressureRange] = useState([0, 1000]); // Example range in Psi

    // Helper to get all applications (top-level and sub-items) in a flat list for dropdown
    const getAllApplicationsFlat = (categoryObject) => {
        const allApps = [];
        if (categoryObject && categoryObject.applications) {
            categoryObject.applications.forEach(app => {
                allApps.push({ id: app.id, name: app.name, parent_id: app.parent_id, category_id: categoryObject.id });
                app.subItems.forEach(subItem => {
                    allApps.push({ id: subItem.id, name: subItem.name, parent_id: subItem.parent_id, category_id: categoryObject.id });
                });
            });
        }
        return allApps.sort((a, b) => a.name.localeCompare(b.name)); // Sort for consistent order
    };

    // Helper to get formatted application name with hierarchy for display in dropdown
    const getFormattedApplicationName = (appId, allCategoriesData) => {
        // Find the application within the flat list derived from all categories
        const allApplicationsGlobally = [];
        allCategoriesData.forEach(category => {
            getAllApplicationsFlat(category).forEach(app => allApplicationsGlobally.push(app));
        });

        const application = allApplicationsGlobally.find(app => app.id === appId);
        if (!application) return 'N/A';

        let name = application.name;
        let currentApp = application;
        // Traverse up the parent chain to build the hierarchy, but stop before adding the category name
        while(currentApp.parent_id !== null) {
            const parentApp = allApplicationsGlobally.find(app => app.id === currentApp.parent_id);
            // Ensure the parent is in the *same category* as the current application
            // This prevents displaying a parent from a different category if IDs overlap
            if (parentApp && parentApp.category_id === application.category_id) {
                name = `${parentApp.name} > ${name}`;
                currentApp = parentApp;
            } else {
                break; // Stop if no parent or if parent is from a different category
            }
        }
        // Removed: Logic to add category name at the beginning for full hierarchy
        // const category = allCategoriesData.find(cat => cat.id === currentApp.category_id);
        // if (category) {
        //     name = `${category.name} > ${name}`;
        // }
        return name;
    };

    // Fetch categories on initial load and whenever categoryId changes
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching all categories:', error);
            }
        };
        fetchAllCategories();
    }, []); // Run once on mount

    // Effect to set category name and filter applications based on the current categoryId
    useEffect(() => {
        if (categories.length > 0 && categoryId) {
            const currentCategory = categories.find(cat => cat.id.toString() === categoryId);
            if (currentCategory) {
                setCategoryName(currentCategory.name);
                setFilteredApplicationsInNavCategory(getAllApplicationsFlat(currentCategory));
            } else {
                setCategoryName('Category Not Found');
                setFilteredApplicationsInNavCategory([]);
            }
        }
    }, [categories, categoryId]);

    // Effect to fetch products based on categoryId and filters
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products for category:', categoryId);
                
                // Simple fetch without complex filtering for now
                const productsResponse = await axios.get(`${API_BASE_URL}/api/products`);
                console.log('Products fetched:', productsResponse.data);
                
                // Filter products by category if needed
                const filteredProducts = productsResponse.data.filter(product => {
                    // Check if product belongs to this category
                    return true; // For now, show all products
                });
                
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                console.error('Error details:', error.response?.data);
                setProducts([]);
            }
        };

        // Always fetch if we have a categoryId
        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]); // Simplified dependencies

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedApplicationId('');
        setTemperatureRange([-100, 300]); // Reset to default min/max
        setWeightRange([0, 50]);
        setDiameterRange([0, 100]);
        setWorkingPressureRange([0, 1000]);
    };

    // NEW: Handler for View Details button click
    const handleViewDetailsClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            {/* Section 1: "PRODUCT FINDER" and "INDUSTRIAL HOSES" (single dark teal background) */}
            <Box sx={{
                bgcolor: '#2C5E57', // Dark teal background for this entire section
                py: 4, // Reduced vertical padding from 6 to 4
                // No mb here, as the white visual gap will follow directly
            }}>
                <Container maxWidth="lg"> {/* Content aligned within container */}
                    <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
                        PRODUCT FINDER
                    </Typography>

                    {/* White Separator Line between titles */}
                    <Box sx={{
                        width: '100%', // Line spans full container width
                        borderBottom: '2px solid white',
                        mt: 2, // Reduced margin top from 4 to 2
                        mb: 2, // Reduced margin bottom from 4 to 2
                    }} />

                    <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 0 }}>
                        {categoryName.toUpperCase()}
                    </Typography>
                </Container>
            </Box>

            {/* Section 2: White Visual Gap */}
            <Box sx={{
                bgcolor: 'white', // White background for the gap
                height: '30px', // Reduced height from 50px to 30px
                mb: 0, // No margin bottom, as the filters section will follow directly
            }} />

            {/* Section 3: Product Finder Filters, Buttons, and Message (dark teal background) */}
            <Box sx={{
                bgcolor: '#2C5E57', // Dark teal background for this section
                py: 4, // Reduced vertical padding from 6 to 4
                mb: 5, // Margin bottom to separate from "Featured Products"
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2} alignItems="center" justifyContent="center"> {/* Reduced spacing from 3 to 2 */}
                        {/* SEARCH TextField */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'left' }}>SEARCH</Typography>
                                <TextField
                                    placeholder="Search by name or key."
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        style: { borderRadius: '25px' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#dcdcdc' },
                                            '&:hover fieldset': { borderColor: '#b0b0b0' },
                                            '&.Mui-focused fieldset': { borderColor: '#2f615d' },
                                        },
                                        '& .MuiInputBase-input::placeholder': { opacity: 0.7, color: '#888' },
                                    }}
                                />
                            </Box>
                        </Grid>
                        {/* APPLICATION Select */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'left' }}>APPLICATION</Typography>
                                <FormControl fullWidth variant="outlined" size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '25px',
                                            '& fieldset': { borderColor: '#dcdcdc' },
                                            '&:hover fieldset': { borderColor: '#b0b0b0' },
                                            '&.Mui-focused fieldset': { borderColor: '#2f615d' },
                                        },
                                    }}
                                >
                                    <Select
                                        value={selectedApplicationId}
                                        onChange={(e) => setSelectedApplicationId(e.target.value)}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (selected === '') {
                                                return <em>Select</em>;
                                            }
                                            return getFormattedApplicationName(selected, categories);
                                        }}
                                        inputProps={{
                                            style: { paddingLeft: '14px' }
                                        }}
                                    >
                                        <MenuItem value=""><em>Select</em></MenuItem>
                                        {filteredApplicationsInNavCategory.map(app => (
                                            <MenuItem key={app.id} value={app.id}>
                                                {getFormattedApplicationName(app.id, categories)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {/* WEIGHT Select */}
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'left' }}>WEIGHT (KG/M)</Typography>
                                <FormControl fullWidth variant="outlined" size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '25px',
                                            '& fieldset': { borderColor: '#dcdcdc' },
                                            '&:hover fieldset': { borderColor: '#b0b0b0' },
                                            '&.Mui-focused fieldset': { borderColor: '#2f615d' },
                                        },
                                    }}
                                >
                                    <Select
                                        value={weightRange[1] === 50 && weightRange[0] === 0 ? '' : 'custom'}
                                        onChange={(e) => {
                                            if (e.target.value === '') {
                                                setWeightRange([0, 50]);
                                            }
                                        }}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (selected === '') {
                                                return <em>Select</em>;
                                            }
                                            return `${weightRange[0]}kg/m to ${weightRange[1]}kg/m`;
                                        }}
                                        inputProps={{
                                            style: { paddingLeft: '14px' }
                                        }}
                                    >
                                        <MenuItem value=""><em>Select</em></MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>

                        {/* Second row of sliders */}
                        {/* TEMPERATURE Slider */}
                        <Grid item xs={12} sm={6} md={4} sx={{ mt: 2 }}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'center' }}>TEMPERATURE RANGE</Typography>
                                <Box sx={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Slider
                                        value={temperatureRange}
                                        onChange={(e, newValue) => setTemperatureRange(newValue)}
                                        valueLabelDisplay="off"
                                        min={-100}
                                        max={300}
                                        sx={{
                                            color: '#2f615d',
                                            '& .MuiSlider-thumb': { bgcolor: '#2f615d', border: '2px solid white', width: 16, height: 16 },
                                            '& .MuiSlider-track': { bgcolor: '#2f615d', height: 4 },
                                            '& .MuiSlider-rail': { bgcolor: '#c8c8c8', height: 4 },
                                        }}
                                    />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: '#555', mt: 0.5 }}>
                                        {temperatureRange[0]}° to {temperatureRange[1]}°
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        {/* DIAMETER Slider */}
                        <Grid item xs={12} sm={6} md={4} sx={{ mt: 2 }}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'center' }}>DIAMETER (MM)</Typography>
                                <Box sx={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Slider
                                        value={diameterRange}
                                        onChange={(e, newValue) => setDiameterRange(newValue)}
                                        valueLabelDisplay="off"
                                        min={0}
                                        max={100}
                                        sx={{
                                            color: '#2f615d',
                                            '& .MuiSlider-thumb': { bgcolor: '#2f615d', border: '2px solid white', width: 16, height: 16 },
                                            '& .MuiSlider-track': { bgcolor: '#2f615d', height: 4 },
                                            '& .MuiSlider-rail': { bgcolor: '#c8c8c8', height: 4 },
                                        }}
                                    />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: '#555', mt: 0.5 }}>
                                        {diameterRange[0]}mm to {diameterRange[1]}mm
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        {/* WORKING PRESSURE Slider */}
                        <Grid item xs={12} sm={6} md={4} sx={{ mt: 2 }}>
                            <Box sx={{ bgcolor: 'white', borderRadius: '25px', p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}> {/* Reduced padding from 2 to 1.5 */}
                                <Typography gutterBottom sx={{ color: '#2f615d', mb: 1, fontWeight: 'bold', fontSize: '0.9em', textAlign: 'center' }}>WORKING PRESSURE</Typography>
                                <Box sx={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Slider
                                        value={workingPressureRange}
                                        onChange={(e, newValue) => setWorkingPressureRange(newValue)}
                                        valueLabelDisplay="off"
                                        min={0}
                                        max={1000}
                                        sx={{
                                            color: '#2f615d',
                                            '& .MuiSlider-thumb': { bgcolor: '#2f615d', border: '2px solid white', width: 16, height: 16 },
                                            '& .MuiSlider-track': { bgcolor: '#2f615d', height: 4 },
                                            '& .MuiSlider-rail': { bgcolor: '#c8c8c8', height: 4 },
                                        }}
                                    />
                                    <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: '#555', mt: 0.5 }}>
                                        {workingPressureRange[0]}psi to {workingPressureRange[1]}psi
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Buttons and message - still on dark teal background, centered */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}> {/* Reduced mt from 4 to 3 */}
                        <Button
                            variant="contained"
                            onClick={() => {
                                // Trigger product fetch with current filters (useEffect handles this)
                            }}
                            sx={{
                                bgcolor: '#2f615d',
                                '&:hover': { bgcolor: '#244d49' },
                                borderRadius: '8px',
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                                mr: { xs: 0, sm: 2 },
                                mb: { xs: 2, sm: 0 },
                            }}
                        >
                            SEARCH
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleResetFilters}
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.08)' },
                                borderRadius: '8px',
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                                mr: 2,
                            }}
                        >
                            RESET FILTER
                        </Button>
                    </Box>
                    <Typography variant="caption" sx={{ textAlign: 'center', fontStyle: 'italic', maxWidth: '250px', color: 'white', mt: 1.5 }}> {/* Reduced mt from 2 to 1.5 */}
                        Please select at least one filter option to get matching search
                    </Typography>

                </Container>
            </Box>

            {/* Featured Products Section (Existing product display) */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
                    FEATURED PRODUCTS
                </Typography>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="new-product-card" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <img
                                    src={product.image_url ? `${API_BASE_URL}${product.image_url}` : '/path-to-default-image.jpg'}
                                    alt={product.name}
                                    style={{ width: '100%', height: '250px', objectFit: 'contain', backgroundColor: '#f0f0f0' }}
                                />
                                <div className="product-info" style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <h3 style={{ margin: '0 0 10px 0', color: '#2f615d', fontSize: '1.5em', fontWeight: 'bold' }}>{product.name}</h3>
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '1.5em !important', ml: 0 }} />}
                                        sx={{
                                            bgcolor: '#2f615d',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            minWidth: 'unset',
                                            padding: 0,
                                            alignSelf: 'flex-end',
                                            mt: 1,
                                            '&:hover': {
                                                bgcolor: '#244d49',
                                                boxShadow: 'none',
                                            },
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onClick={() => handleViewDetailsClick(product.id)} // NEW: Added onClick handler
                                    >
                                        {/* No text inside the button */}
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>No products found for this category or matching your filters.</p>
                    )}
                </div>
            </Container>
        </Box>
    );
}
