import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Avatar,
  Badge,
  Paper,
  Grid,
  Container,
  Button,
  InputBase,
  styled,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormLabel,
  FormGroup,
  Collapse,
  FormControlLabel,
  LinearProgress, // NEW: For loading state in inquiries
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import HubIcon from '@mui/icons-material/Hub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import GridViewIcon from '@mui/icons-material/GridView';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ScienceIcon from '@mui/icons-material/Science';
import CompressIcon from '@mui/icons-material/Compress';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // NEW: Import icon for Inquiries
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/guanyiac.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Menu from '@mui/material/Menu';
import AdminContactEditor from './AdminContactEditor';
import AdminBrandPartners from "./AdminBrandPartners";
import PhoneIcon from '@mui/icons-material/Phone';
import ContactSubmissionsTable from './ContactSubmissionsTable';
import API_BASE_URL from '../config';


const drawerWidth = 240;
const collapsedDrawerWidth = 80;
const desiredContentLeftMargin = 20;

const MainContent = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${desiredContentLeftMargin}px`,
    [theme.breakpoints.up('sm')]: {
       marginLeft: `${desiredContentLeftMargin}px`,
    },
    bgcolor: '#f4f6f9',
    minHeight: '100vh',
    paddingLeft: open ? `${theme.spacing(3) + (drawerWidth - desiredContentLeftMargin)}px` : theme.spacing(3),
     [theme.breakpoints.up('sm')]: {
        paddingLeft: open ? `${theme.spacing(3) + (drawerWidth - desiredContentLeftMargin)}px` : theme.spacing(3),
     },
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'sidebarOpen' && prop !== 'selected'
})(({ theme, sidebarOpen, selected }) => ({
  minHeight: 48,
  justifyContent: sidebarOpen ? 'initial' : 'center',
  padding: theme.spacing(1.5, sidebarOpen ? 2.5 : 0),
  borderRadius: sidebarOpen ? '0 24px 24px 0' : '50%',
  marginRight: sidebarOpen ? '8px' : 'auto',
  marginLeft: sidebarOpen ? '0' : '8px',
  width: sidebarOpen ? 'auto' : '48px',
  backgroundColor: selected ? '#2f615d' : 'transparent',
  color: selected ? 'white' : '#2f615d',

  transition: theme.transitions.create(['background-color', 'color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  '&:hover': {
    backgroundColor: selected ? '#2f615d' : '#e0e0e0',
    color: selected ? 'white' : '#2f615d',
    '& .MuiListItemIcon-root': {
      color: selected ? 'white' : '#2f615d',
    },
  },
  '&.Mui-selected': {
     backgroundColor: '#2f615d',
     color: 'white',
     '& .MuiListItemIcon-root': {
       color: 'white',
     },
     '&::after': {
       content: 'none',
     },
   },
  '&.Mui-selected:hover': {
    backgroundColor: '#2f615d',
  },


  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: sidebarOpen ? theme.spacing(3) : 'auto',
    justifyContent: 'center',
    color: selected ? 'white' : '#2f615d',
    marginTop: sidebarOpen ? 0 : '12px',
    marginBottom: sidebarOpen ? 0 : '12px',
  },

  ...(!sidebarOpen && {
    justifyContent: 'center',
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 'auto',
      paddingY: '0',
      margin: 'auto',
      color: selected ? 'white' : '#2f615d',
    },
    '& .MuiListItemText-root': {
      display: 'none',
    },
  }),
}));

const LargeInfoCard = ({ title, subtitle, bgcolor, color, icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2.5,
      borderRadius: 3,
      height: 150,
      backgroundColor: bgcolor || '#f4f6f9',
      color: color || '#244d49',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      boxShadow: '0 2px 12px 0 rgba(60,72,88,0.08)',
      transition: 'transform 0.18s, box-shadow 0.18s',
      '&:hover': {
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)',
      },
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Box sx={{ fontSize: 28, mb: 0.5, opacity: 0.13, position: 'absolute', right: 12, top: 12 }}>
      {icon}
    </Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: color || '#244d49', mb: 0.5, zIndex: 1, fontSize: '1.05rem' }}>
      {title}
    </Typography>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        color: color || '#244d49',
        mb: 0,
        zIndex: 1,
        fontSize: '1.5rem',
        lineHeight: 1.2
      }}
    >
      {subtitle}
    </Typography>
  </Paper>
);

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [editingApplicationId, setEditingApplicationId] = useState(null);
  const [editedApplicationName, setEditedApplicationName] = useState('');

  // State for adding new applications (top-level form)
  const [newApplicationName, setNewApplicationName] = useState('');
  const [selectedCategoryIdForNewApp, setSelectedCategoryIdForNewApp] = useState('');

  // State for adding new sub-items (top-level form)
  const [newSubItemName, setNewSubItemName] = useState('');
  const [selectedCategoryIdForNewSubItem, setSelectedCategoryIdForNewSubItem] = useState('');
  const [selectedApplicationIdForNewSubItem, setSelectedApplicationIdForNewSubItem] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    application_id: '',
    brand: '',
    temperature_range: '', // This existing field is for the main Temperature Range
    material: '',
    image_url: '',
    description: '',
    is_new: false,
    specs: [],
    // {{ MODIFIED: Removed 'TEMPERATURE RANGE' from default product_features }}
    product_features: [
      { name: 'SMOOTH SURFACE', type: 'rating', value: 0 },
      { name: 'FLEXIBILITY', type: 'rating', value: 0 },
      { name: 'ABRASION RESISTANCE', type: 'rating', value: 0 },
      { name: 'CHEMICAL RESISTANCE', type: 'value', textValue: '' },
      { name: 'CRUSHING RESISTANCE', type: 'rating', value: 0 },
    ]
  });

  // New state for product editing
  const [editingProductId, setEditingProductId] = useState(null);

  // New state for pasted specs text
  const [pastedSpecsText, setPastedSpecsText] = useState('');

  // NEW: State for selected image file
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  // NEW: State for image preview URL
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // New state for selected category in the Add New Product form
  const [selectedCategoryIdForNewProduct, setSelectedCategoryIdForNewProduct] = useState('');
  // New state for filtered applications based on selected category
  const [filteredApplicationsForNewProduct, setFilteredApplicationsForNewProduct] = useState([]);

  const [openSpecs, setOpenSpecs] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); // NEW: State for logged-in user

  // NEW: States for Inquiries
  const [inquiries, setInquiries] = useState([]); // Raw fetched inquiries
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [inquiriesError, setInquiriesError] = useState(null);
  // NEW: States for Customer Inquiry Summary and Detail View
  const [customerInquirySummaries, setCustomerInquirySummaries] = useState([]); // Grouped by customer
  const [selectedCustomerInquiryDetails, setSelectedCustomerInquiryDetails] = useState(null); // For detailed view
  const [showCustomerInquiryDetails, setShowCustomerInquiryDetails] = useState(false); // To toggle detail view
  // State for unread inquiry count
  const [unreadInquiryCount, setUnreadInquiryCount] = useState(0);

  // States for adding new users
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserRole, setNewUserRole] = useState('staff'); // Default to 'staff'
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [addUserMessage, setAddUserMessage] = useState(''); // For success/error messages

  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Products', icon: <Inventory2Icon />, path: '/admin/products' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Inquiries', icon: <MailOutlineIcon />, path: '/admin/inquiries' }, // NEW: Inquiries menu item
    { text: 'Edit Contact Info', icon: <PhoneIcon />, path: '/admin/contact-info' }, // NEW: Added new menu item
    { text: 'Brand Partners', icon: <HubIcon />, path: '/admin/brand-partners' }, // NEW: Added new menu item
    { text: 'Contact Submissions', icon: <MailOutlineIcon />, path: '/admin/contact-submissions' },
    // { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }, // Example for future
  ];

  const currentPathSegment = location.pathname.split('/').pop();
  const selectedMenu = sidebarItems.find(item => item.path.endsWith(currentPathSegment))?.text || 'Dashboard';

  // Keep only ONE set of these helper functions, near the top of the component
  const parseCombinedDimension = (combinedString) => {
      const match = combinedString.match(/^(.+?)(?:\s*\((.+?)mm\))?$/);
      if (match) {
          return {
              primary: match[1] || '',
              secondary: match[2] || '',
          };
      }
      return { primary: combinedString, secondary: '' }; // Return original if no match
  };

  const parseCombinedWeight = (combinedString) => {
      const match = combinedString.match(/^(.+?)(?:\s*\((.+?)kg\/m\))?$/);
      if (match) {
          return {
              primary: match[1] || '',
              secondary: match[2] || '',
          };
      }
      return { primary: combinedString, secondary: '' }; // Return original if no match
  };

  const parseCombinedMaxWp = (combinedString) => {
      const match = combinedString.match(/^(.+?)(?:\s*\((.+?)MPa\))?$/);
      if (match) {
          return {
              primary: match[1] || '', // Psi value
              secondary: match[2] || '', // MPa value
          };
      }
      return { primary: combinedString, secondary: '' }; // Return original if no match
  };

  // NEW: Helper to transform flat specs from backend into the pivoted structure for DISPLAY (Excel-like)
  const prepareSpecsForExcelDisplay = (flatSpecs) => {
      const models = {}; // { 'ORTAC® 250': { uniqueColors: Set, dimensionalRows: Map } }

      flatSpecs.forEach(spec => {
          const modelKey = spec.model_series || 'Default';
          const color = spec.color || 'N/A'; // Ensure color is always present

          if (!models[modelKey]) {
              models[modelKey] = {
                  uniqueColors: new Set(),
                  dimensionalRows: new Map() // Key: JSON.stringify([nom_id, nom_od, max_wp, weight])
              };
          }

          models[modelKey].uniqueColors.add(color);

          // Use the raw combined strings for the dimensional key, as this is how they are stored in DB.
          const dimensionalKey = `${spec.nom_id}-${spec.nom_od}-${spec.max_wp}-${spec.weight}`;

          if (!models[modelKey].dimensionalRows.has(dimensionalKey)) {
              models[modelKey].dimensionalRows.set(dimensionalKey, {
                  nom_id_combined: spec.nom_id,
                  nom_od_combined: spec.nom_od,
                  max_wp_combined: spec.max_wp,
                  weight_combined: spec.weight,
                  sapsByColor: {} // { 'Black': 'SAP#', 'Red': 'SAP#' }
              });
          }
          // Store the SAP for the specific color
          models[modelKey].dimensionalRows.get(dimensionalKey).sapsByColor[color] = spec.sap;
      });

      // Convert Maps and Sets to arrays for rendering
      const displayData = Object.keys(models).map(modelSeries => {
          const model = models[modelSeries];
          const uniqueColorsArray = Array.from(model.uniqueColors).sort(); // Sort colors for consistent column order

          const rows = Array.from(model.dimensionalRows.values()).map(row => {
              const sapsByColor = {};
              uniqueColorsArray.forEach(color => {
                  sapsByColor[color] = row.sapsByColor[color] || ''; // Use empty string for missing SAPs
              });

              // Parse combined strings into primary/secondary for display in table cells
              const parsedNomId = parseCombinedDimension(row.nom_id_combined);
              const parsedNomOd = parseCombinedDimension(row.nom_od_combined);
              const parsedMaxWp = parseCombinedMaxWp(row.max_wp_combined);
              const parsedWeight = parseCombinedWeight(row.weight_combined);

              return {
                  sapsByColor,
                  nom_id_in: parsedNomId.primary,
                  nom_id_mm: parsedNomId.secondary,
                  nom_od_in: parsedNomOd.primary,
                  nom_od_mm: parsedNomOd.secondary,
                  max_wp_psi: parsedMaxWp.primary,
                  max_wp_mpa: parsedMaxWp.secondary,
                  weight_lbft: parsedWeight.primary,
                  weight_kgm: parsedWeight.secondary,
              };
          });

          // Sort rows to maintain consistent order, e.g., by nom_id_in
          rows.sort((a, b) => {
              // Handle potential non-numeric 'in' values like '1/4', '1/2' for sorting
              const convertToNumber = (val) => {
                  if (val.includes('/')) {
                      const [num, den] = val.split('/').map(Number);
                      return num / den;
                  }
                  return parseFloat(val);
              };
              const aVal = convertToNumber(a.nom_id_in);
              const bVal = convertToNumber(b.nom_id_in);

              if (isNaN(aVal) || isNaN(bVal)) {
                  return a.nom_id_in.localeCompare(b.nom_id_in); // Fallback to string compare
              }
              return aVal - bVal;
          });

          return {
              model_series: modelSeries,
              uniqueColors: uniqueColorsArray,
              rows
          };
      });

      // Sort model groups by name for consistent display
      displayData.sort((a, b) => a.model_series.localeCompare(b.model_series, undefined, { numeric: true, sensitivity: 'base' }));

      return displayData;
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Category List', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Product List', icon: <Inventory2Icon />, path: '/admin/products' },
    { text: 'Inquiries', icon: <MailOutlineIcon />, path: '/admin/inquiries' },
    { text: 'Brand Partners', icon: <HubIcon />, path: '/admin/brand-partners' },
    { text: 'Contact Info', icon: <PhoneIcon />, path: '/admin/contact-info' }, // NEW: Added new menu item // <-- Add here!
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  ];

  const currentPageTitle = navItems.find(item => item.path === location.pathname)?.text || 'Dashboard';

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchCategories();
    fetchInquiries(); // Fetch inquiries on component mount
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
      if (selectedCategoryIdForNewProduct) {
          const category = categories.find(cat => cat.id === selectedCategoryIdForNewProduct);
          if (category) {
              // Flatten all applications and sub-items for the selected category
              const allAppsAndSubItems = [];
              category.applications.forEach(app => {
                  allAppsAndSubItems.push({ id: app.id, name: app.name, parent_id: app.parent_id }); // Add top-level app
                  app.subItems.forEach(subItem => {
                      allAppsAndSubItems.push({ id: subItem.id, name: subItem.name, parent_id: subItem.parent_id }); // Add sub-item
                  });
              });
               // Sort alphabetically by name for better usability
              allAppsAndSubItems.sort((a, b) => a.name.localeCompare(b.name));
              setFilteredApplicationsForNewProduct(allAppsAndSubItems);
          } else {
              setFilteredApplicationsForNewProduct([]);
          }
      } else {
          setFilteredApplicationsForNewProduct([]);
      }
       // Reset selected application when category changes
      setNewProduct(prevProduct => ({ ...prevProduct, application_id: '' }));

  }, [categories, selectedCategoryIdForNewProduct]);

  // Helper function to get all applications (top-level and sub-items) in a flat list for dropdown
  const getAllApplications = () => {
      const allApps = [];
      categories.forEach(category => {
          category.applications.forEach(app => {
              allApps.push({ id: app.id, name: app.name, category_id: category.id, parent_id: app.parent_id });
              app.subItems.forEach(subItem => {
                   allApps.push({ id: subItem.id, name: subItem.name, category_id: category.id, parent_id: subItem.parent_id });
              });
          });
      });
      return allApps;
  };

   // Helper to get formatted application name with hierarchy for display in dropdown
   const getFormattedApplicationName = (appId) => {
       const application = getAllApplications().find(app => app.id === appId);
       if (!application) return 'N/A';

       // Build the hierarchical name
       let name = application.name;
       let currentApp = application;
       // Trace back up the parent chain to build the name
       while(currentApp.parent_id !== null) {
           const parentApp = getAllApplications().find(app => app.id === currentApp.parent_id);
           if (parentApp) {
               name = `${parentApp.name} > ${name}`;
               currentApp = parentApp;
           } else {
               // Stop if parent not found to prevent infinite loop
               break;
           }
       }
       // Add category name at the beginning
       const category = categories.find(cat => cat.id === currentApp.category_id);
        if (category) {
            name = `${category.name} > ${name}`;
        }
       return name;
   };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the stored token
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token to the Authorization header
        }
      });
      setUsers(response.data);

      // NEW: Set logged-in user
      const currentUser = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored here
      if (currentUser && currentUser.id) {
          const foundUser = response.data.find(user => user.id === currentUser.id);
          setLoggedInUser(foundUser);
      }

    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      // You might also want to add more specific error handling here,
      // e.g., if the error is 401 or 403, redirect to login page.
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert('Session expired or unauthorized. Please log in again.');
          // navigate('/login'); // Uncomment if you have a navigate function available and want to redirect
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      setEditingCategoryId(null);
      setEditedCategoryName('');
      setEditingApplicationId(null);
      setEditedApplicationName('');
      // Reset add application form state
      setNewApplicationName('');
      setSelectedCategoryIdForNewApp('');
      // Reset add sub-item form state
      setNewSubItemName('');
      setSelectedCategoryIdForNewSubItem('');
      setSelectedApplicationIdForNewSubItem('');
    }
  };

  // NEW: Function to fetch inquiries
  const fetchInquiries = async () => {
    try {
      setInquiriesLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(response.data); // Keep raw inquiries for potential future use or debugging

      // Count unread inquiries
      const unreadCount = response.data.filter(inquiry => !inquiry.is_read).length;
      setUnreadInquiryCount(unreadCount);

      // Process inquiries to group by customer
      const groupedInquiries = response.data.reduce((acc, inquiry) => {
          const customerKey = inquiry.customer_email; // Use email as unique identifier for customer
          if (!acc[customerKey]) {
              acc[customerKey] = {
                  customer_name: inquiry.customer_name,
                  customer_email: inquiry.customer_email,
                  total_inquiries: 0,
                  unread_count: 0, // NEW: Track unread count per customer
                  inquiry_list: [] // Store full inquiry objects for this customer
              };
          }
          acc[customerKey].total_inquiries++;
          if (!inquiry.is_read) {
            acc[customerKey].unread_count++;
          }
          acc[customerKey].inquiry_list.push(inquiry);
          return acc;
      }, {});

      // Convert the grouped object into an array of summaries
      const summaries = Object.values(groupedInquiries);
      setCustomerInquirySummaries(summaries); // Set the new state with grouped data
      setInquiriesError(null);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setInquiriesError('Failed to load inquiries.');
      setInquiries([]);
      setCustomerInquirySummaries([]); // Clear summaries on error
      setUnreadInquiryCount(0);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    // ... existing useEffect content ...
  }, []); // Empty dependency array means this runs once on mount

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategoryName.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/categories`, { name: newCategoryName });
      console.log('Category added:', response.data);
      setNewCategoryName('');
      fetchCategories();
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.response && error.response.status === 409) {
        alert('Category with this name already exists.');
      } else {
        alert('Failed to add category.');
      }
    }
  };

   // Function to add a top-level application
   const handleAddApplication = async (e) => {
      e.preventDefault();

      if (!newApplicationName.trim() || !selectedCategoryIdForNewApp) {
         alert('Application name and parent category are required.');
         return;
      }

      try {
         // parent_id is null for a top-level application
         const response = await axios.post(`${API_BASE_URL}/api/applications`, {
            name: newApplicationName,
            category_id: selectedCategoryIdForNewApp,
            parent_id: null // Applications are direct children of categories
         });
         console.log('New application added:', response.data);
         setNewApplicationName('');
         setSelectedCategoryIdForNewApp('');
         fetchCategories(); // Refresh the list
         alert('Application added successfully!');
      } catch (error) {
         console.error('Error adding new application:', error);
          if (error.response && error.response.status === 409) {
             alert('Application with this name already exists in the selected category.');
          } else {
             alert('Failed to add application.');
          }
      }
   };

   // --- New function to add a sub-item ---
   const handleAddSubItem = async (e) => {
      e.preventDefault();

      if (!newSubItemName.trim() || !selectedCategoryIdForNewSubItem || !selectedApplicationIdForNewSubItem) {
         alert('Sub-item name, parent category, and parent application are required.');
         return;
      }

      try {
         // parent_id is the selected application's ID
         const response = await axios.post(`${API_BASE_URL}/api/applications`, {
            name: newSubItemName,
            category_id: selectedCategoryIdForNewSubItem,
            parent_id: selectedApplicationIdForNewSubItem
         });
         console.log('New sub-item added:', response.data);
         setNewSubItemName('');
         setSelectedCategoryIdForNewSubItem('');
         setSelectedApplicationIdForNewSubItem('');
         fetchCategories(); // Refresh the list
         alert('Sub-item added successfully!');
      } catch (error) {
         console.error('Error adding new sub-item:', error);
         if (error.response && error.response.status === 409) {
            alert('Sub-item with this name already exists under the selected application.');
         } else {
            alert('Failed to add sub-item.');
         }
      }
   };
   // --- End of new function ---

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setEditedCategoryName(category.name);
    // Close any active editing forms for applications
    setEditingApplicationId(null);
    setEditedApplicationName('');
  };

  const handleSaveEdit = async (categoryId) => {
    if (!editedCategoryName.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/categories/${categoryId}`, { name: editedCategoryName });
      console.log(`Category ${categoryId} updated.`);
      setEditingCategoryId(null);
      setEditedCategoryName('');
      fetchCategories();
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.response && error.response.status === 409) {
        alert('Category with this name already exists.');
      } else {
        alert('Failed to update category.');
      }
    }
  };

  const handleDeleteClick = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all associated applications and sub-items.')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/categories/${categoryId}`);
        console.log(`Category ${categoryId} deleted.`);
        fetchCategories();
        alert('Category deleted successfully!');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category.');
      }
    }
  };

   // Updated functions for editing/deleting applications (connecting to backend)
  const handleEditApplicationClick = (application) => {
     setEditingApplicationId(application.id);
     setEditedApplicationName(application.name);
     // Close any active editing forms for categories
     setEditingCategoryId(null);
     setEditedCategoryName('');
  };

  // NEW FUNCTION: handleCancelApplicationEdit
  const handleCancelApplicationEdit = () => {
     setEditingApplicationId(null);
     setEditedApplicationName('');
  };

  const handleSaveApplicationEdit = async (applicationId) => {
     if (!editedApplicationName.trim()) {
       alert('Name cannot be empty.');
       return;
     }
     try {
        // Use the backend PUT endpoint for applications/sub-items
        await axios.put(`${API_BASE_URL}/api/applications/${applicationId}`, { name: editedApplicationName });
        fetchCategories(); // After successful save, refetch categories to update the list
        setEditingApplicationId(null);
        setEditedApplicationName('');
        alert('Item updated successfully!');
     } catch (error) {
        console.error('Error updating item:', error);
         if (error.response && error.response.status === 409) {
             alert('Another item with this name already exists.'); // Check backend for more specific message
         } else {
            alert('Failed to update item.');
         }
     }
  };

  const handleDeleteApplicationClick = async (applicationId) => {
     if (window.confirm('Are you sure you want to delete this item? This will also delete any sub-items under it.')) {
       try {
         // Use the backend DELETE endpoint for applications/sub-items
         await axios.delete(`${API_BASE_URL}/api/applications/${applicationId}`);
         fetchCategories(); // After successful delete, refetch categories
         alert('Item deleted successfully!');
       } catch (error) {
         console.error('Error deleting item:', error);
         alert('Failed to delete item.');
       }
     }
  };

  // Handle input changes for new product form
  const handleNewProductChange = (e) => {
    const { name, value, type, checked, files } = e.target; // Destructure 'files' for file input

    if (name === 'image_file' && files && files[0]) {
        const file = files[0];
        setSelectedImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
        setNewProduct(prev => ({ ...prev, image_url: '' })); // Clear URL if file selected
    } else if (name === 'image_url') { // Handle explicit URL input
        setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
        setImagePreviewUrl(value); // Set preview from URL
        setSelectedImageFile(null); // Clear any selected file
        // Clear file input visually
        const fileInput = document.getElementById('raised-button-file');
        if (fileInput) fileInput.value = '';
    }
    // Handle category selection separately to filter applications
    else if (name === 'category_id') {
        setSelectedCategoryIdForNewProduct(value);
        // application_id will be reset in the useEffect that watches selectedCategoryIdForNewProduct
    } else {
        setNewProduct(prevProduct => ({
          ...prevProduct,
          [name]: type === 'checkbox' ? checked : value
        }));
    }
  };

  // NEW: handleAddSpecGroup for the new pivoted structure
  const handleAddSpecGroup = () => {
    setNewProduct(prevProduct => ({
      ...prevProduct,
      specs: [...prevProduct.specs, { model_series: '', uniqueColors: [], rows: [] }]
    }));
  };

  // NEW: handleSpecGroupChange for model_series only
  const handleSpecGroupChange = (modelGroupIndex, e) => {
    const { name, value } = e.target; // 'name' will be 'model_series'
    setNewProduct(prevProduct => {
      const updatedSpecs = [...prevProduct.specs];
      updatedSpecs[modelGroupIndex] = {
        ...updatedSpecs[modelGroupIndex],
        [name]: value
      };
      return { ...prevProduct, specs: updatedSpecs };
    });
  };

  // NEW: handleRemoveSpecGroup
  const handleRemoveSpecGroup = (modelGroupIndex) => {
    setNewProduct(prevProduct => ({
      ...prevProduct,
      specs: prevProduct.specs.filter((_, i) => i !== modelGroupIndex)
    }));
  };

  // NEW: handleAddSpecRow for the pivoted structure
  const handleAddSpecRow = (modelGroupIndex) => {
    setNewProduct(prevProduct => {
      const updatedSpecs = [...prevProduct.specs];
      const newRow = {
          sapsByColor: {}, // Initialize with empty object for colors
          nom_id_in: '', nom_id_mm: '',
          nom_od_in: '', nom_od_mm: '',
          max_wp_psi: '', max_wp_mpa: '',
          weight_lbft: '', weight_kgm: ''
      };
      // Populate sapsByColor for all unique colors known to this modelGroup
      updatedSpecs[modelGroupIndex].uniqueColors.forEach(color => {
          newRow.sapsByColor[color] = '';
      });
      updatedSpecs[modelGroupIndex].rows.push(newRow);
      return { ...prevProduct, specs: updatedSpecs };
    });
  };

  // NEW: handleSpecRowChange for the pivoted structure
  const handleSpecRowChange = (modelGroupIndex, rowIndex, fieldName, value) => {
    setNewProduct(prevProduct => {
      const updatedSpecs = [...prevProduct.specs];
      const currentRow = { ...updatedSpecs[modelGroupIndex].rows[rowIndex] };

      // Check if the field is a color's SAP
      if (fieldName.startsWith('sap_')) {
          const color = fieldName.substring(4); // 'sap_red' => 'red'
          currentRow.sapsByColor = { ...currentRow.sapsByColor, [color]: value };
      } else {
          // It's a dimensional field
          currentRow[fieldName] = value;
      }
      updatedSpecs[modelGroupIndex].rows[rowIndex] = currentRow;
      return { ...prevProduct, specs: updatedSpecs };
    });
  };

  // NEW: handleRemoveSpecRow for the pivoted structure
  const handleRemoveSpecRow = (modelGroupIndex, rowIndex) => {
    setNewProduct(prevProduct => {
      const updatedSpecs = [...prevProduct.specs];
      updatedSpecs[modelGroupIndex].rows = updatedSpecs[modelGroupIndex].rows.filter((_, i) => i !== rowIndex);
      return { ...prevProduct, specs: updatedSpecs };
    });
  };

  // NEW: handleAddColorColumn to allow adding a new color to a model group
  const handleAddColorColumn = (modelGroupIndex) => {
      const newColor = prompt("Enter new color name (e.g., 'Green'):");
      if (newColor && newColor.trim() !== '') {
          setNewProduct(prevProduct => {
              const updatedSpecs = [...prevProduct.specs];
              const currentModelGroup = updatedSpecs[modelGroupIndex];
              const lowerCaseNewColor = newColor.trim().toLowerCase();

              if (!currentModelGroup.uniqueColors.includes(lowerCaseNewColor)) {
                  currentModelGroup.uniqueColors.push(lowerCaseNewColor);
                  // Initialize SAP for this new color in all existing rows
                  currentModelGroup.rows.forEach(row => {
                      row.sapsByColor[lowerCaseNewColor] = '';
                  });
              }
              return { ...prevProduct, specs: updatedSpecs };
          });
      }
  };

  // NEW: handleRemoveColorColumn to remove a color column
  const handleRemoveColorColumn = (modelGroupIndex, colorToRemove) => {
      if (window.confirm(`Are you sure you want to remove the '${colorToRemove}' color column? This will delete all SAPs for this color in this model series.`)) {
          setNewProduct(prevProduct => {
              const updatedSpecs = [...prevProduct.specs];
              const currentModelGroup = updatedSpecs[modelGroupIndex];

              currentModelGroup.uniqueColors = currentModelGroup.uniqueColors.filter(c => c !== colorToRemove);
              currentModelGroup.rows.forEach(row => {
                  delete row.sapsByColor[colorToRemove];
              });
              return { ...prevProduct, specs: updatedSpecs };
          });
      }
  };

  // MODIFIED: handlePasteSpecs to handle multi-color SAP columns and flexible headers
  const handlePasteSpecs = () => {
    const lines = pastedSpecsText.trim().split('\n');
    const newSpecs = []; // Will store a flat list of spec objects for grouping
    let currentModelSeries = '';
    let colorSapColumnMap = {}; // Maps color name to its SAP column index (e.g., { 'black': 0, 'red': 2 })
    let dimensionalUnitColumnMap = {}; // Maps unit (e.g., 'in_nom_id', 'mm_nom_id') to index
    let dataStartsAfterColumnIndex = -1; // Index after the last SAP color column

    let headerRow1Index = -1; // Index of "SAP#, Nom. ID, Nom. OD..."
    let headerRow2Index = -1; // Index of "Black, Blue, Red, In, mm..."

    // First pass: Detect Model Series and the two header rows
    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim();
      const columns = trimmedLine.split('\t').map(col => col.trim());

      // Try to detect Model Series line (e.g., "ORTAC® 250")
      const modelSeriesMatch = trimmedLine.match(/^ORTAC®?\s*(\d+)$/i);
      if (modelSeriesMatch && columns.length === 1) { // Must be a single column matching the pattern
          currentModelSeries = modelSeriesMatch[1];
          continue; // Skip processing this line further as a header/data
      }

      // Detect the first header row (SAP#, Nom. ID, etc.)
      const isHeaderRow1 = columns.some(c => c.toLowerCase().includes('sap#')) &&
                           columns.some(c => c.toLowerCase().includes('nom. id')) &&
                           columns.some(c => c.toLowerCase().includes('nom. od')); // Basic check
      if (isHeaderRow1 && headerRow1Index === -1) {
          headerRow1Index = i;
          continue;
      }

      // Detect the second header row (Black, Blue, Red, In, mm, etc.)
      // This row typically follows the first header row.
      const hasColors = columns.some(c => ['black', 'blue', 'red', 'yellow', 'green', 'orange', 'purple', 'white', 'gray', 'brown', 'silver', 'gold'].includes(c.toLowerCase()));
      const hasUnits = columns.some(c => ['in', 'mm', 'psi', 'mpa', 'lb/ft', 'kg/m'].includes(c.toLowerCase()));

      if (hasColors && hasUnits && headerRow1Index !== -1 && i === headerRow1Index + 1 && headerRow2Index === -1) {
          headerRow2Index = i;

          // Map color SAP columns and dimensional unit columns
          let currentSAPCategory = ''; // To track if we are under SAP#, Nom. ID etc.
          let currentDimensionPrefix = ''; // To create unique keys like 'in_nom_id', 'mm_nom_od'

          for (let k = 0; k < columns.length; k++) {
              const colHeader = columns[k].toLowerCase();

              // Heuristic for SAP# color columns
              if (['black', 'blue', 'red', 'yellow', 'green', 'orange', 'purple', 'white', 'gray', 'brown', 'silver', 'gold'].includes(colHeader)) {
                  colorSapColumnMap[colHeader] = k;
                  currentSAPCategory = 'sap'; // We are in the SAP section
              }
              // Heuristic for dimensional units
              else if (['in', 'mm', 'psi', 'mpa', 'lb/ft', 'kg/m'].includes(colHeader)) {
                  // Determine which main header this unit falls under
                  if (headerRow1Index !== -1) {
                      const mainHeaders = lines[headerRow1Index].trim().split('\t').map(h => h.trim().toLowerCase());
                      // Find the main header that this unit belongs to.
                      // This is a rough heuristic, might need refinement based on exact column widths.
                      let foundMainHeader = false;
                      for (let j = 0; j <= k && j < mainHeaders.length; j++) {
                           // Iterate backwards from current column to find the closest non-empty main header
                           // This assumes main headers span over their sub-headers.
                           if (mainHeaders[j] === 'nom. id') { currentDimensionPrefix = 'nom_id'; foundMainHeader = true; }
                           else if (mainHeaders[j] === 'nom. od') { currentDimensionPrefix = 'nom_od'; foundMainHeader = true; }
                           else if (mainHeaders[j] === 'max. wp') { currentDimensionPrefix = 'max_wp'; foundMainHeader = true; }
                           else if (mainHeaders[j] === 'weight') { currentDimensionPrefix = 'weight'; foundMainHeader = true; }
                      }
                  }
                  dimensionalUnitColumnMap[`${colHeader}_${currentDimensionPrefix}`] = k;
              }
          }

          // Determine where common data columns start (after the last identified color SAP column)
          const lastSapColIndex = Object.values(colorSapColumnMap).length > 0
                                     ? Math.max(...Object.values(colorSapColumnMap))
                                     : -1;
          dataStartsAfterColumnIndex = lastSapColIndex; // Data columns start right after the last SAP column

          break; // Found both header rows, exit loop
      }
    }

    // Validation: Ensure headers were found
    if (headerRow1Index === -1 || headerRow2Index === -1 || Object.keys(colorSapColumnMap).length === 0 || Object.keys(dimensionalUnitColumnMap).length === 0) {
        alert('Could not parse the pasted table format. Please ensure it closely matches the example in the placeholder, including both header rows (SAP#, Nom. ID, etc. AND Black, Blue, Red, In, mm, etc.).');
        setPastedSpecsText('');
        return;
    }

    // Process data rows starting from the line AFTER the second header row
    for (let lineIdx = headerRow2Index + 1; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx].trim();
        const cols = line.split('\t').map(c => c.trim());

        // Skip completely empty lines
        if (cols.filter(c => c.length > 0).length === 0) {
            continue;
        }

        // Handle Model Series appearing mid-data (e.g., ORTAC® 400 after ORTAC® 250 data)
        const midDataModelSeriesMatch = line.match(/^ORTAC®?\s*(\d+)$/i);
        if (midDataModelSeriesMatch && cols.length === 1) { // Only single column should match
             currentModelSeries = midDataModelSeriesMatch[1];
             continue; // Skip this line as it's a new model series header
        }

        // Extract dimensional values using the mapped indices.
        // Provide fallback to empty string if column is out of bounds.
        const nom_id_in = cols[dimensionalUnitColumnMap['in_nom_id']] || '';
        const nom_id_mm = cols[dimensionalUnitColumnMap['mm_nom_id']] || '';
        const nom_od_in = cols[dimensionalUnitColumnMap['in_nom_od']] || '';
        const nom_od_mm = cols[dimensionalUnitColumnMap['mm_nom_od']] || '';
        const max_wp_psi = cols[dimensionalUnitColumnMap['psi_max_wp']] || '';
        const max_wp_mpa = cols[dimensionalUnitColumnMap['mpa_max_wp']] || '';
        const weight_lbft = cols[dimensionalUnitColumnMap['lb/ft_weight']] || '';
        const weight_kgm = cols[dimensionalUnitColumnMap['kg/m_weight']] || '';

        // Combine for storage (as per current database schema)
        const nom_id_display = `${nom_id_in}${nom_id_mm && nom_id_mm !== '-' ? ` (${nom_id_mm}mm)` : ''}`;
        const nom_od_display = `${nom_od_in}${nom_od_mm && nom_od_mm !== '-' ? ` (${nom_od_mm}mm)` : ''}`;
        const max_wp_display = `${max_wp_psi}${max_wp_mpa && max_wp_mpa !== '-' ? ` (${max_wp_mpa}MPa)` : ''}`;
        const weight_display = `${weight_lbft}${weight_kgm && weight_kgm !== '-' ? ` (${weight_kgm}kg/m)` : ''}`;

        let foundSapInRow = false; // Flag to ensure at least one SAP was found

        // Iterate through each identified color and its SAP# column
        // Ensure consistent order of colors by sorting the keys from the map
        const sortedColors = Object.keys(colorSapColumnMap).sort((a, b) => colorSapColumnMap[a] - colorSapColumnMap[b]);

        for (const color of sortedColors) {
            const sapColIndex = colorSapColumnMap[color];
            const sap = cols[sapColIndex] || '';

            // Only add a spec if there's a valid SAP# for this color and it's not a placeholder like '---'
            if (sap && sap.match(/^\d+$/) && sap !== '---') { // Ensure SAP is numeric and not empty/placeholder
                newSpecs.push({
                    model_series: currentModelSeries || 'Default', // Use detected model series, or 'Default'
                    color: color,
                    sap: sap,
                    nom_id: nom_id_display, // Still storing combined strings as per current DB design
                    nom_od: nom_od_display,
                    max_wp: max_wp_display,
                    weight: weight_display,
                });
                foundSapInRow = true;
            }
        }
        
        if (!foundSapInRow && cols.filter(c => c.length > 0).length > 0) {
             // If no SAP was found in a row, but it has other dimensional data, it's an unparseable data row.
             console.warn('Skipping data row as no valid SAP was found (or it was a placeholder):', line);
        }
    }

    // NEW: Use the new helper to transform flat specs into the editable pivoted structure
    const pivotedSpecs = transformFlatSpecsForEditing(newSpecs);

    setNewProduct(prevProduct => ({
      ...prevProduct,
      specs: [...prevProduct.specs, ...pivotedSpecs] // Append new groups to existing ones
    }));
    setPastedSpecsText(''); // Clear the textarea after parsing
    console.log('Final newProduct.specs after paste:', pivotedSpecs);
  };


  // NEW: Helper to transform flat specs from backend into the pivoted structure for the EDITING FORM
  const transformFlatSpecsForEditing = (flatSpecs) => {
      const models = {}; // { 'ORTAC® 250': { uniqueColors: Set, dimensionalRows: Map } }

      flatSpecs.forEach(spec => {
          const modelKey = spec.model_series || 'Default';
          const color = spec.color || 'N/A'; // Ensure color is always present

          if (!models[modelKey]) {
              models[modelKey] = {
                  uniqueColors: new Set(),
                  dimensionalRows: new Map() // Key: JSON.stringify([nom_id, nom_od, max_wp, weight])
              };
          }

          models[modelKey].uniqueColors.add(color);

          // We need a stable key for dimensional data grouping.
          // Use the raw combined strings for the key.
          const dimensionalKey = `${spec.nom_id}-${spec.nom_od}-${spec.max_wp}-${spec.weight}`;

          if (!models[modelKey].dimensionalRows.has(dimensionalKey)) {
              models[modelKey].dimensionalRows.set(dimensionalKey, {
                  nom_id_combined: spec.nom_id,
                  nom_od_combined: spec.nom_od,
                  max_wp_combined: spec.max_wp,
                  weight_combined: spec.weight,
                  sapsByColor: {} // { 'Black': 'SAP#', 'Red': 'SAP#' }
              });
          }
          // Store the SAP for the specific color
          models[modelKey].dimensionalRows.get(dimensionalKey).sapsByColor[color] = spec.sap;
      });

      // Convert Maps and Sets to arrays for rendering in the editing form
      const editableData = Object.keys(models).map(modelSeries => {
          const model = models[modelSeries];
          const uniqueColorsArray = Array.from(model.uniqueColors).sort(); // Sort colors for consistent column order

          const rows = Array.from(model.dimensionalRows.values()).map(row => {
              const sapsByColor = {};
              uniqueColorsArray.forEach(color => {
                  sapsByColor[color] = row.sapsByColor[color] || ''; // Use empty string for missing SAPs in editing form
              });

              // Parse combined strings into primary/secondary for editable fields
              const parsedNomId = parseCombinedDimension(row.nom_id_combined);
              const parsedNomOd = parseCombinedDimension(row.nom_od_combined);
              const parsedMaxWp = parseCombinedMaxWp(row.max_wp_combined);
              const parsedWeight = parseCombinedWeight(row.weight_combined);

              return {
                  sapsByColor,
                  nom_id_in: parsedNomId.primary,
                  nom_id_mm: parsedNomId.secondary,
                  nom_od_in: parsedNomOd.primary,
                  nom_od_mm: parsedNomOd.secondary,
                  max_wp_psi: parsedMaxWp.primary,
                  max_wp_mpa: parsedMaxWp.secondary,
                  weight_lbft: parsedWeight.primary,
                  weight_kgm: parsedWeight.secondary,
              };
          });

          // Sort rows to maintain consistent order, e.g., by nom_id_in
          rows.sort((a, b) => a.nom_id_in.localeCompare(b.nom_id_in, undefined, { numeric: true, sensitivity: 'base' }));


          return {
              model_series: modelSeries,
              uniqueColors: uniqueColorsArray,
              rows
          };
      });

      // Sort model groups by name for consistent display
      editableData.sort((a, b) => a.model_series.localeCompare(b.model_series));

      return editableData;
  };

  // MODIFIED: handleEditProductClick to populate product_features for editing
  const handleEditProductClick = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      application_id: product.application_id || '',
      brand: product.brand,
      temperature_range: product.temperature_range,
      material: product.material,
      image_url: product.image_url || '',
      description: product.description || '',
      is_new: product.is_new === 1 ? true : false,
      specs: transformFlatSpecsForEditing(product.specs || []),
      // {{ MODIFIED: Use product_features from backend, or fall back to defaults if none exist }}
      product_features: (product.product_features && product.product_features.length > 0)
          ? product.product_features.map(feature => ({
              name: feature.name,
              type: feature.rating !== undefined ? 'rating' : 'value', // Determine type
              value: feature.rating, // For rating features
              textValue: feature.value // For value features
          }))
          : [ // Fallback to these default features if none exist for the product
              { name: 'SMOOTH SURFACE', type: 'rating', value: 0 },
              { name: 'FLEXIBILITY', type: 'rating', value: 0 },
              { name: 'ABRASION RESISTANCE', type: 'rating', value: 0 },
              { name: 'CHEMICAL RESISTANCE', type: 'value', textValue: '' },
              { name: 'CRUSHING RESISTANCE', type: 'rating', value: 0 },
            ]
    });
    // Set image preview if an image_url exists
    if (product.image_url) {
        // Construct the full URL for the preview if it's a relative path from uploads
        const fullImageUrl = `${API_BASE_URL}${product.image_url}`;
        setImagePreviewUrl(fullImageUrl);
    } else {
        setImagePreviewUrl('');
    }
    setSelectedImageFile(null); // Clear any previously selected file
    // Clear file input visually
    const fileInput = document.getElementById('raised-button-file');
    if (fileInput) fileInput.value = '';

    // Set category for filtering applications if product has an application_id
    if (product.application_id) {
        const productCategory = categories.find(cat =>
            cat.applications.some(app => app.id === product.application_id || app.subItems.some(sub => sub.id === product.application_id))
        );
        if (productCategory) {
            setSelectedCategoryIdForNewProduct(productCategory.id);
        } else {
            setSelectedCategoryIdForNewProduct('');
        }
    } else {
        setSelectedCategoryIdForNewProduct('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // The existing `groupSpecsByModelAndColor` is kept for the final *display* table, as its structure is different.
  const groupSpecsByModelAndColor = (flatSpecs) => {
      const grouped = {};
      flatSpecs.forEach(spec => {
          const key = `${spec.model_series || 'No Model'}-${spec.color || 'No Color'}`;
          if (!grouped[key]) {
              grouped[key] = {
                  model_series: spec.model_series || '',
                  color: spec.color || '',
                  details: []
              };
          }
          grouped[key].details.push({
              sap: spec.sap,
              nom_id: spec.nom_id,
              nom_od: spec.nom_od,
              max_wp: spec.max_wp,
              weight: spec.weight,
          });
      });
      return Object.values(grouped);
  };

  // MODIFIED: handleSubmit to include product_features in the payload
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Flatten the new pivoted specs structure back to a flat array for the backend
    const flattenedSpecs = newProduct.specs.flatMap(modelGroup =>
        modelGroup.rows.flatMap(row =>
            modelGroup.uniqueColors.flatMap(color => {
                const sap = row.sapsByColor[color];
                if (sap && sap.trim() !== '' && sap !== '---') { // Only include if SAP is present and not '---'
                    return [{
                        model_series: modelGroup.model_series,
                        color: color,
                        sap: sap,
                        // Re-combine primary/secondary values for database storage
                        nom_id: `${row.nom_id_in}${row.nom_id_mm && row.nom_id_mm !== '-' ? ` (${row.nom_id_mm}mm)` : ''}`,
                        nom_od: `${row.nom_od_in}${row.nom_od_mm && row.nom_od_mm !== '-' ? ` (${row.nom_od_mm}mm)` : ''}`,
                        max_wp: `${row.max_wp_psi}${row.max_wp_mpa && row.max_wp_mpa !== '-' ? ` (${row.max_wp_mpa}MPa)` : ''}`,
                        weight: `${row.weight_lbft}${row.weight_kgm && row.weight_kgm !== '-' ? ` (${row.weight_kgm}kg/m)` : ''}`,
                    }];
                }
                return []; // Don't return if SAP is empty or '---'
            })
        )
    );

    // Prepare product_features for submission
    const featuresToSubmit = newProduct.product_features.map(feature => {
        const submittedFeature = { name: feature.name };
        if (feature.type === 'rating') {
            submittedFeature.rating = feature.value; // Send as 'rating' for backend
        } else if (feature.type === 'value') {
            submittedFeature.value = feature.textValue; // Send as 'value' for backend
        }
        return submittedFeature;
    }).filter(f => f.name.trim() !== ''); // Only send features with a name

    // Create FormData object to send both text fields and the file
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('application_id', newProduct.application_id);
    formData.append('brand', newProduct.brand);
    formData.append('temperature_range', newProduct.temperature_range);
    formData.append('material', newProduct.material);
    formData.append('description', newProduct.description);
    formData.append('is_new', newProduct.is_new ? 1 : 0);
    formData.append('specs', JSON.stringify(flattenedSpecs)); // Stringify specs array
    // {{ NEW: Append product_features to formData }}
    formData.append('product_features', JSON.stringify(featuresToSubmit));

    // Handle image based on source (file upload/paste vs. URL)
    if (selectedImageFile) {
        formData.append('image', selectedImageFile); // Prioritize actual file if selected/pasted
    } else if (newProduct.image_url) {
        // If no file, but a URL is present (either manually entered or from existing product)
      formData.append('image_url_fallback', newProduct.image_url);
    } else if (editingProductId && !newProduct.image_url && !selectedImageFile) {
        // If editing and user explicitly removed the image (both selectedFile and image_url are empty)
      formData.append('clear_image', 'true');
    }


    console.log(`${editingProductId ? 'Updating' : 'Submitting new'} product:`, formData);

    if (!newProduct.name || !newProduct.brand || !newProduct.material || !newProduct.application_id) {
        alert('Please fill in all required product details (Name, Application Type, Brand, Material).');
        return;
    }

    try {
      if (editingProductId) {
        const response = await axios.put(`${API_BASE_URL}/api/products/${editingProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // IMPORTANT for file uploads
          },
        });
        console.log('Product updated:', response.data);
        alert('Product updated successfully!');
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/products`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // IMPORTANT for file uploads
          },
        });
      console.log('Product added:', response.data);
        alert('Product added successfully!');
      }
      handleCancelEdit();
      fetchProducts();
    } catch (error) {
      console.error(`Error ${editingProductId ? 'updating' : 'adding'} product:`, error);
       if (error.response && error.response.status === 409) {
         alert(`Product with this name already exists.`);
       } else {
         alert(`Failed to ${editingProductId ? 'update' : 'add'} product.`);
       }
    }
  };

  // MODIFIED: handleCancelEdit to clear image states
  const handleCancelEdit = () => {
    setEditingProductId(null);
      setNewProduct({
        name: '',
        application_id: '',
        brand: '',
        temperature_range: '',
        material: '',
        image_url: '', // Reset image URL too
        description: '',
        is_new: false,
        specs: [], // Reset to empty array for new product
        product_features: [] // {{ Reset product_features too }}
      });
    setSelectedCategoryIdForNewProduct('');
    setFilteredApplicationsForNewProduct([]);
    setPastedSpecsText(''); // Clear pasted text too
    setSelectedImageFile(null); // Clear selected file
    setImagePreviewUrl(''); // Clear image preview
  };

  // NEW FUNCTION: handleDeleteProductClick
  const handleDeleteProductClick = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
        alert('Product deleted successfully!');
      fetchProducts(); // Refresh the product list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  // NEW: Function to handle viewing a specific customer's inquiries
  const handleViewCustomerInquiries = (customerSummary) => {
      // Mark all unread inquiries as read when viewing
      customerSummary.inquiry_list.forEach(inquiry => {
        if (!inquiry.is_read) {
          markInquiryAsRead(inquiry.id);
        }
      });
      setSelectedCustomerInquiryDetails(customerSummary);
      setShowCustomerInquiryDetails(true);
  };

  // NEW: Function to go back from customer inquiry detail to summary list
  const handleBackToInquirySummary = () => {
      setSelectedCustomerInquiryDetails(null);
      setShowCustomerInquiryDetails(false);
  };

   // Toggle collapse for product specs
   const handleToggleSpecs = (productId) => {
       setOpenSpecs(prevState => ({
           ...prevState,
           [productId]: !prevState[productId]
       }));
   };

  // NEW: State for unread inquiry count


  // {{ MODIFIED: Redefine dashboardStats with relevant metrics }}
  const dashboardStats = [
      { title: "Total Products", value: products.length, color: '#8ab6f9' },
      { title: "Total Categories", value: categories.length, color: '#4b49ac' },
      { title: "Total Users", value: users.length, color: '#7464ed' },
      { title: "Unread Inquiries", value: unreadInquiryCount, color: '#f16b6b' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const isSelected = (path) => {
    return location.pathname === path;
  };

  // Helper function to find applications for a given category
  const getApplicationsForCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.applications || [] : [];
  };

  // NEW: handlePasteImage to allow pasting image files or URLs
  const handlePasteImage = (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      let handled = false;

      // Try to handle pasted image file
      for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
              const file = items[i].getAsFile();
              if (file) {
                  setSelectedImageFile(file);
                  setImagePreviewUrl(URL.createObjectURL(file));
                  setNewProduct(prev => ({ ...prev, image_url: '' })); // Clear manual URL if image pasted
                  const fileInput = document.getElementById('raised-button-file');
                  if (fileInput) fileInput.value = ''; // Clear file input visually
                  handled = true;
                  break; // Only handle the first image found
              }
          }
      }

      // If no image file, try to handle pasted text as an image URL
      if (!handled) {
          const pastedText = (event.clipboardData || event.originalEvent.clipboardData).getData('text');
          if (pastedText) {
              try {
                  const url = new URL(pastedText); // Check if it's a valid URL
                  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
                  if (imageExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))) {
                      setNewProduct(prev => ({ ...prev, image_url: pastedText }));
                      setImagePreviewUrl(pastedText); // Set preview from URL
                      setSelectedImageFile(null); // Clear any selected file
                      const fileInput = document.getElementById('raised-button-file');
                      if (fileInput) fileInput.value = ''; // Clear file input visually
                      handled = true;
                  }
              } catch (e) {
                  // Not a valid URL, or not an image URL
              }
          }
      }

      if (handled) {
          event.preventDefault(); // Prevent default paste behavior if handled
      }
  };

  // NEW: Helper function to get the appropriate icon based on feature name (Copied from ProductDetailPage.js)
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

  // {{ NEW: Functions for managing Product Features }}
  const handleAddFeature = () => {
    setNewProduct(prevProduct => ({
      ...prevProduct,
      product_features: [...prevProduct.product_features, { name: '', type: 'rating', value: 0 }] // Default to rating type
    }));
  };

  const handleRemoveFeature = (index) => {
    setNewProduct(prevProduct => ({
      ...prevProduct,
      product_features: prevProduct.product_features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setNewProduct(prevProduct => {
      const updatedFeatures = [...prevProduct.product_features];
      const featureToUpdate = { ...updatedFeatures[index] };

      if (field === 'type') {
          featureToUpdate.type = value;
          // Reset value/rating when type changes
          if (value === 'rating') {
              featureToUpdate.value = 0; // Default rating
              delete featureToUpdate.textValue; // Remove text value if present
          } else { // type is 'value'
              featureToUpdate.textValue = ''; // Default empty text
              delete featureToUpdate.value; // Remove rating if present
          }
      } else if (field === 'name') {
          featureToUpdate.name = value;
      } else if (field === 'rating') {
          featureToUpdate.value = value; // Store rating in 'value' field
      } else if (field === 'textValue') {
          featureToUpdate.textValue = value; // Store text value in 'textValue' field
      }

      updatedFeatures[index] = featureToUpdate;
      return { ...prevProduct, product_features: updatedFeatures };
    });
  };

  // NEW: Function to mark inquiry as read
  const markInquiryAsRead = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/inquiries/${inquiryId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh inquiries to update the UI
      await fetchInquiries();
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
      // Optionally show an error message to the user
      setInquiriesError('Failed to mark inquiry as read');
    }
  };

  // NEW: Function to mark all inquiries as read
  const markAllInquiriesAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const unreadInquiries = inquiries.filter(inquiry => !inquiry.is_read);
      
      // Mark each unread inquiry as read
      await Promise.all(
        unreadInquiries.map(inquiry => 
          axios.put(`${API_BASE_URL}/api/inquiries/${inquiry.id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      
      // Refresh the inquiries list
      await fetchInquiries();
    } catch (error) {
      console.error('Error marking all inquiries as read:', error);
      setInquiriesError('Failed to mark all inquiries as read');
    }
  };

  // {{ NEW: Functions for User Management (Add User with Verification) }}

  const handleInitiateAddUser = async (e) => {
      e.preventDefault();
      setAddUserMessage('');

      if (!newUserName || !newUserPassword || !newUserFirstName || !newUserLastName || !newUserRole) {
          setAddUserMessage('Please fill all required fields: Username, Password, First Name, Last Name, and Role.');
          return;
      }

      try {
          const token = localStorage.getItem('token');
          await axios.post(`${API_BASE_URL}/api/admin/users/initiate-add`, {
              new_username: newUserName,
              new_password: newUserPassword,
              new_first_name: newUserFirstName,
              new_last_name: newUserLastName,
              new_role: newUserRole,
          }, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setAddUserMessage('Verification code sent to your admin email. Please enter it below to confirm.');
          setShowVerificationInput(true);
      } catch (error) {
          console.error('Error initiating user add:', error);
          setAddUserMessage(error.response?.data || 'Failed to send verification code.');
          setShowVerificationInput(false);
      }
  };

  const handleConfirmAddUser = async (e) => {
      e.preventDefault();
      setAddUserMessage('');

      if (!verificationCode) {
          setAddUserMessage('Please enter the verification code.');
          return;
      }

      try {
          const token = localStorage.getItem('token');
          await axios.post(`${API_BASE_URL}/api/admin/users/confirm-add`, {
              verification_code: verificationCode,
          }, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setAddUserMessage('New user created successfully!');
          // Reset form and UI
          setNewUserName('');
          setNewUserPassword('');
          setNewUserFirstName('');
          setNewUserLastName('');
          setNewUserRole('staff');
          setVerificationCode('');
          setShowVerificationInput(false);
          fetchUsers(); // Refresh the user list
      } catch (error) {
          console.error('Error confirming user add:', error);
          setAddUserMessage(error.response?.data || 'Failed to confirm user creation. Invalid or expired code.');
      }
  };

  // {{ NEW: Function to handle deleting a user }}
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('User deleted successfully!');
        fetchUsers(); // Refresh the user list after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user: ' + (error.response?.data || error.message));
        // If unauthorized/forbidden, prompt re-login or show specific message
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            alert('You are not authorized to perform this action. Please log in as an administrator.');
        }
      }
    }
  };

  // --- Add these derived values after your state and data fetching ---

  // 1️⃣ Inquiries This Week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday as start
  startOfWeek.setHours(0, 0, 0, 0);
  const weeklyInquiryCount = inquiries.filter(inq => new Date(inq.created_at) >= startOfWeek).length;

  // 2️⃣ Recent Inquiry
  const sortedInquiries = [...inquiries].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const recentInquiry = sortedInquiries[0];
  const recentInquiryText = recentInquiry
    ? `${recentInquiry.customer_name || 'Unknown'}: ${recentInquiry.customer_message || 'No message'}`
    : 'No inquiries yet';

  // 4️⃣ Most Inquired Product
  const productInquiryCounts = {};
  inquiries.forEach(inq => {
    (inq.inquiry_items || []).forEach(item => {
      if (item.product_name) {
        productInquiryCounts[item.product_name] = (productInquiryCounts[item.product_name] || 0) + 1;
      }
    });
  });
  const mostInquiredProductName = Object.keys(productInquiryCounts).length
    ? Object.entries(productInquiryCounts).sort((a, b) => b[1] - a[1])[0][0]
    : 'N/A';

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/inquiries/${inquiryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Inquiry deleted successfully!');
      fetchInquiries(); // Refresh the list
    } catch (err) {
      alert('Failed to delete inquiry.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f6f9', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
          bgcolor: '#ffffff',
          color: '#333',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ pr: '24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: sidebarOpen ? drawerWidth : collapsedDrawerWidth, transition: (theme) => theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen, }) }}>
            <img src={logo} alt="GUANYIAC Logo" style={{ height: 38, marginRight: sidebarOpen ? 10 : 'auto', marginLeft: sidebarOpen ? 10 : 0 }} />
            {sidebarOpen && (
               <Typography
                 variant="h6"
                 noWrap
                 component="div"
                 sx={{
                   fontWeight: 900,
                   color: '#2f615d',
                   fontSize: '1.25rem',
                 }}
               >
                 GUANYIAC
               </Typography>
            )}
             <IconButton
               color="inherit"
               aria-label={sidebarOpen ? 'close drawer' : 'open drawer'}
               onClick={handleDrawerToggle}
               edge="start"
               sx={{ color: '#333', marginLeft: sidebarOpen ? 'auto' : 0, padding: sidebarOpen ? '8px' : '8px', mr: sidebarOpen ? 0 : '8px' }}
             >
               <MenuIcon />
             </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                marginRight: 2,
                marginLeft: 2,
                width: 'auto',
              }}
            >
              <Box sx={{ padding: '0 8px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchIcon sx={{ color: '#2f615d' }} />
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  color: '#333',
                  paddingLeft: '32px',
                  paddingRight: '8px',
                  width: '200px',
                }}
              />
            </Box>
            {/* {{ MODIFIED: Make the notification icon clickable and link to Inquiries page }} */}
            <IconButton
              color="inherit"
              sx={{ color: '#2f615d', mr: 1 }}
              component={Link} // Add component prop to render as a Link
              to="/admin/inquiries" // Set the destination path
            >
              <Badge badgeContent={unreadInquiryCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
             <IconButton
              color="inherit"
              sx={{ color: '#2f615d', mr: 1 }}
              onClick={handleProfileClick}
            >
              <Avatar
                src={loggedInUser?.profileImageUrl || undefined} // Use your user image URL here
                alt={loggedInUser ? `${loggedInUser.first_name} ${loggedInUser.last_name}` : 'User'}
                sx={{ width: 32, height: 32, bgcolor: '#b2dfdb', color: '#2f615d', fontWeight: 700 }}
              >
                {loggedInUser ? loggedInUser.first_name?.[0] : <AccountCircleIcon />}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { minWidth: 200, borderRadius: 2, p: 1 }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, pb: 1 }}>
                <Avatar
                  src={loggedInUser?.profileImageUrl || undefined}
                  alt={loggedInUser ? `${loggedInUser.first_name} ${loggedInUser.last_name}` : 'User'}
                  sx={{ width: 48, height: 48, mr: 2, bgcolor: '#b2dfdb', color: '#2f615d', fontWeight: 700 }}
                >
                  {loggedInUser ? loggedInUser.first_name?.[0] : <AccountCircleIcon />}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2f615d' }}>
                    {loggedInUser ? `${loggedInUser.first_name} ${loggedInUser.last_name}` : 'Admin User'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    {loggedInUser?.username}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={() => { handleProfileClose(); handleLogout(); }} sx={{ color: '#c62828', fontWeight: 600 }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            color: '#333',
            borderRight: 'none',
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          },
        }}
      >
         <DrawerHeader />
        <Box sx={{ overflowX: 'hidden' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <StyledListItemButton
                  component={Link}
                  to={item.path}
                  selected={isSelected(item.path)}
                  sidebarOpen={sidebarOpen}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                     <ListItemText
                       primary={item.text}
                       sx={{
                          opacity: 1,
                          '& .MuiTypography-root': {
                             fontWeight: isSelected(item.path) ? 'bold' : 'normal',
                          }
                       }}
                     />
                   )}
                </StyledListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <MainContent open={sidebarOpen}>
        <Toolbar />
        <Container maxWidth="lg">
          <Box sx={{
            paddingTop: 3,
            paddingRight: 3,
            paddingBottom: 3,
            paddingLeft: 0,
            background: 'linear-gradient(135deg, #f4f6f9 60%, #e3f2fd 100%)',
            minHeight: '100vh',
            borderRadius: 3
          }}>
            {location.pathname === '/admin/brand-partners' && (
  <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
    <AdminBrandPartners />
  </Box>
)}
            {location.pathname === '/admin' && (
              <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>
                    Welcome {loggedInUser ? loggedInUser.first_name : 'Admin'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 4 }}>
                  All systems are running smoothly! You have <strong>{unreadInquiryCount} unread alerts!</strong>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Inquiries This Week"
                      subtitle={weeklyInquiryCount}
                      bgcolor="#e6f4f1"
                      color="#2f615d"
                      icon="📥"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Recent Inquiry"
                      subtitle={recentInquiryText}
                      bgcolor="#f9f7e8"
                      color="#bfa21a"
                      icon="🆕"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Total Products"
                      subtitle={products.length}
                      bgcolor="#e3ecfa"
                      color="#3b5998"
                      icon="📦"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Most Inquired Product"
                      subtitle={mostInquiredProductName}
                      bgcolor="#e6f7f1"
                      color="#2f615d"
                      icon="🌟"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Unread Inquiries"
                      subtitle={unreadInquiryCount}
                      bgcolor="#fbeaea"
                      color="#c62828"
                      icon="📬"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LargeInfoCard
                      title="Total Users"
                      subtitle={users.length}
                      bgcolor="#ece7fa"
                      color="#5e35b1"
                      icon="👤"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 5 }}>
                  <Typography variant="h6" sx={{ color: '#2f615d', fontWeight: 700, mb: 2 }}>
                    Recent Activity
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafb' }}>
                    {inquiries.length === 0 ? (
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        No recent activity yet.
                      </Typography>
                    ) : (
                      <List>
                        {[...inquiries]
                          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          .slice(0, 6)
                          .map((inq, idx) => (
                            <ListItem key={inq.id || idx} alignItems="flex-start" sx={{ px: 0, py: 1.2 }}>
                              <ListItemIcon sx={{ minWidth: 36, color: '#2f615d' }}>
                                🕒
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#244d49' }}>
                                      {new Date(inq.created_at).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#2f615d', ml: 2 }}>
                                      Inquiry Submitted
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography variant="body2" sx={{ color: '#555' }}>
                                      {inq.inquiry_items && inq.inquiry_items.length > 0
                                        ? `${inq.inquiry_items.length} product${inq.inquiry_items.length > 1 ? 's' : ''} — ${inq.inquiry_items.slice(0, 3).map(item => item.product_name).join(', ')}${inq.inquiry_items.length > 3 ? ', ...' : ''}`
                                        : inq.customer_message
                                          ? `Message — "${inq.customer_message}"`
                                          : 'No details'}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                      </List>
                    )}
                  </Paper>
                </Box>
              </Box>
            )}
            {location.pathname === '/admin/categories' && (
              <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Categories & Applications Management</Typography>

                {/* Forms for Adding Category, Application, and Sub-item */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Add New Category Form */}
                   <Grid item xs={12} md={4}>
                      <Paper elevation={1} sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                         <Typography variant="h6" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add New Category</Typography>
                         <Box component="form" onSubmit={handleAddCategory} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 40px)' }}>
                            <TextField
                              label="Category Name"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              sx={{ mb: 2 }}
                            />
                            <Button variant="contained" type="submit">
                               Add Category
                           </Button>
                         </Box>
                      </Paper>
                   </Grid>

                   {/* Add New Application Form */}
                   <Grid item xs={12} md={4}>
                      <Paper elevation={1} sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                         <Typography variant="h6" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add New Application</Typography>
                         <Box component="form" onSubmit={handleAddApplication} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 40px)' }}>
                             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel id="select-category-label">Parent Category</InputLabel>
                                <Select
                                  labelId="select-category-label"
                                  id="select-category"
                                  value={selectedCategoryIdForNewApp}
                                  label="Parent Category"
                                  onChange={(e) => setSelectedCategoryIdForNewApp(e.target.value)}
                                >
                                   <MenuItem value="">
                                     <em>Select a Category</em>
                                   </MenuItem>
                                   {categories.map((category) => (
                                      <MenuItem key={category.id} value={category.id}>
                                         {category.name}
                                      </MenuItem>
                                   ))}
                                </Select>
                             </FormControl>
                             <TextField
                               label="Application Name"
                               variant="outlined"
                               fullWidth
                               size="small"
                               value={newApplicationName}
                               onChange={(e) => setNewApplicationName(e.target.value)}
                               sx={{ mb: 2 }}
                             />
                            <Button variant="contained" type="submit">
                               Add Application
                           </Button>
                         </Box>
                      </Paper>
                   </Grid>

                   {/* Add New Sub-item Form */}
                   <Grid item xs={12} md={4}>
                      <Paper elevation={1} sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                         <Typography variant="h6" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add New Sub-item</Typography>
                         <Box component="form" onSubmit={handleAddSubItem} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 40px)' }}>
                             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel id="select-parent-category-subitem-label">Parent Category</InputLabel>
                                <Select
                                  labelId="select-parent-category-subitem-label"
                                  id="select-parent-category-subitem"
                                  value={selectedCategoryIdForNewSubItem}
                                  label="Parent Category"
                                  onChange={(e) => {
                                     setSelectedCategoryIdForNewSubItem(e.target.value);
                                     setSelectedApplicationIdForNewSubItem(''); // Reset application when category changes
                                  }}
                                >
                                   <MenuItem value="">
                                     <em>Select a Category</em>
                                   </MenuItem>
                                   {categories.map((category) => (
                                      <MenuItem key={category.id} value={category.id}>
                                         {category.name}
                                      </MenuItem>
                                   ))}
                                </Select>
                             </FormControl>
                              <FormControl fullWidth size="small" sx={{ mb: 2 }} disabled={!selectedCategoryIdForNewSubItem}>
                                 <InputLabel id="select-parent-application-subitem-label">Parent Application</InputLabel>
                                 <Select
                                   labelId="select-parent-application-subitem-label"
                                   id="select-parent-application-subitem"
                                   value={selectedApplicationIdForNewSubItem}
                                   label="Parent Application"
                                   onChange={(e) => setSelectedApplicationIdForNewSubItem(e.target.value)}
                                 >
                                    <MenuItem value="">
                                      <em>Select an Application</em>
                                    </MenuItem>
                                    {/* Filter applications based on selected category */}
                                    {getApplicationsForCategory(selectedCategoryIdForNewSubItem)
                                       .filter(app => app.parent_id === null) // Only show top-level applications as parents for sub-items
                                       .map((application) => (
                                       <MenuItem key={application.id} value={application.id}>
                                          {application.name}
                                       </MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                             <TextField
                               label="Sub-item Name"
                               variant="outlined"
                               fullWidth
                               size="small"
                               value={newSubItemName}
                               onChange={(e) => setNewSubItemName(e.target.value)}
                               sx={{ mb: 2 }}
                             />
                            <Button variant="contained" type="submit">
                               Add Sub-item
               </Button>
                         </Box>
                      </Paper>
                   </Grid>
                </Grid>

                <Typography variant="h5" sx={{ mt: 4, color: '#2f615d', fontWeight: 'bold' }} gutterBottom>Current Categories & Applications</Typography>
                <Paper sx={{ p: 2, borderRadius: '8px', boxShadow: 1 }}>
                  <List>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <React.Fragment key={category.id}>
                          {/* Display Main Category */}
                          <ListItem secondaryAction={
                             <Box display="inline-flex">
                                {/* Edit/Delete Category Buttons */}
                                {editingCategoryId === category.id ? (
                                   <Box display="inline-flex">
                                      <IconButton edge="end" aria-label="save" onClick={() => handleSaveEdit(category.id)} sx={{ mr: 1, color: '#2f615d' }}>
                                         <SaveIcon />
                                      </IconButton>
                                      <IconButton edge="end" aria-label="cancel" onClick={handleCancelEdit} sx={{ color: '#2f615d' }}>
                                         <CancelIcon />
                                      </IconButton>
                                   </Box>
                                ) : (
                                   <Box display="inline-flex">
                                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(category)} sx={{ mr: 1, color: '#2f615d' }}>
                                         <EditIcon />
                                      </IconButton>
                                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(category.id)} sx={{ color: '#2f615d' }}>
                                         <DeleteIcon />
                                      </IconButton>
                                   </Box>
                                )}
                             </Box>
                          }>
                            {editingCategoryId === category.id ? (
                               <TextField
                                 variant="outlined"
                                 size="small"
                                 value={editedCategoryName}
                                 onChange={(e) => setEditedCategoryName(e.target.value)}
                                 sx={{ flexGrow: 1, mr: 2 }}
                                 onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                       e.preventDefault();
                                       handleSaveEdit(category.id);
                                    }
                                 }}
                               />
                            ) : (
                               <ListItemText primary={category.name} primaryTypographyProps={{ fontWeight: 'bold' }} />
                            )}
                          </ListItem>

                          {/* Display Applications */}
                          {category.applications && category.applications.length > 0 && (
                            <List component="div" disablePadding sx={{ pl: 0 }}>
                              {category.applications.map((application) => (
                                <React.Fragment key={application.id}>
                                   {/* Apply increased padding to the ListItem */}
                                  <ListItem secondaryAction={
                                     <Box display="inline-flex">
                                        {/* Edit/Delete Application Buttons */}
                                        {editingApplicationId === application.id ? (
                                           <Box display="inline-flex">
                                              <IconButton edge="end" aria-label="save" onClick={() => handleSaveApplicationEdit(application.id)} sx={{ mr: 1, color: '#2f615d' }}>
                                                 <SaveIcon />
                                              </IconButton>
                                              <IconButton edge="end" aria-label="cancel" onClick={handleCancelApplicationEdit} sx={{ color: '#2f615d' }}>
                                                 <CancelIcon />
                                              </IconButton>
                                           </Box>
                                        ) : (
                                           <Box display="inline-flex">
                                              <IconButton edge="end" aria-label="edit" onClick={() => handleEditApplicationClick(application)} sx={{ mr: 1, color: '#2f615d' }}>
                                                 <EditIcon />
                                              </IconButton>
                                              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteApplicationClick(application.id)} sx={{ color: '#2f615d' }}>
                                                 <DeleteIcon />
                                              </IconButton>
                                           </Box>
                                        )}
                                     </Box>
                                  } sx={{ pl: 4 }}> {/* Increased padding left */}
                                    {editingApplicationId === application.id ? (
                                       <TextField
                                         variant="outlined"
                                         size="small"
                                         value={editedApplicationName}
                                         onChange={(e) => setEditedApplicationName(e.target.value)}
                                         sx={{ flexGrow: 1, mr: 2 }}
                                         onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                               e.preventDefault();
                                               handleSaveApplicationEdit(application.id);
                                            }
                                         }}
                                       />
                                    ) : (
                                       <ListItemText
                                          primary={application.name}
                                          // Removed inline style={{ paddingLeft: '20px' }}
                                       />
                                    )}
                                  </ListItem>

                                  {/* Display Sub-items */}
                                  {application.subItems && application.subItems.length > 0 && (
                                    <List component="div" disablePadding sx={{ pl: 0 }}>
                                      {application.subItems.map((subItem) => (
                                         <ListItem key={subItem.id} secondaryAction={
                                            <Box display="inline-flex">
                                               {/* Edit/Delete icons for sub-items */}
                                               {editingApplicationId === subItem.id ? (
                                                  <Box display="inline-flex">
                                                     <IconButton edge="end" aria-label="save" onClick={() => handleSaveApplicationEdit(subItem.id)} sx={{ mr: 1, color: '#2f615d' }}>
                                                        <SaveIcon />
                                                     </IconButton>
                                                     <IconButton edge="end" aria-label="cancel" onClick={handleCancelApplicationEdit} sx={{ color: '#2f615d' }}>
                                                        <CancelIcon />
                                                     </IconButton>
                                                  </Box>
                                               ) : (
                                                  <Box display="inline-flex">
                                                     <IconButton edge="end" aria-label="edit" onClick={() => handleEditApplicationClick(subItem)} sx={{ mr: 1, color: '#2f615d' }}>
                                                        <EditIcon />
                                                     </IconButton>
                                                     <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteApplicationClick(subItem.id)} sx={{ color: '#2f615d' }}>
                                                        <DeleteIcon />
                                                     </IconButton>
                                                  </Box>
                                               )}
                                            </Box>
                                         } sx={{ pl: 8 }}> {/* Increased padding left */}
                                           {editingApplicationId === subItem.id ? (
                                              <TextField
                                                variant="outlined"
                                                size="small"
                                                value={editedApplicationName}
                                                onChange={(e) => setEditedApplicationName(e.target.value)}
                                                sx={{ flexGrow: 1, mr: 2 }}
                                                onKeyPress={(e) => {
                                                   if (e.key === 'Enter') {
                                                      e.preventDefault();
                                                      handleSaveApplicationEdit(subItem.id);
                                                   }
                                                }}
                                              />
                                           ) : (
                                              <ListItemText
                                                 primary={subItem.name}
                                                 // Removed inline style={{ paddingLeft: '40px' }}
                                              />
                                           )}
                                         </ListItem>
                                      ))}
                                    </List>
                                  )}
                                </React.Fragment>
                              ))}
                            </List>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No categories found." sx={{ '& .MuiTypography-root': { fontWeight: 'normal' } }} />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Box>
            )}
            {location.pathname === '/admin/products' && (
              <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Product List Page</Typography>

                {/* Add New Product Form */}
                <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '8px', boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add New Product</Typography>
                     <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Category Selection Dropdown */}
                             <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth size="small" required>
                                     <InputLabel>Category</InputLabel>
                                     <Select
                                       label="Category"
                                       name="category_id" // Use a temporary name, we only store application_id in newProduct
                                       value={selectedCategoryIdForNewProduct}
                                       onChange={handleNewProductChange} // This will also trigger filtering
                                     >
                                        <MenuItem value=""><em>Select Category</em></MenuItem>
                                         {categories.map(category => (
                                             <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                         ))}
                                     </Select>
                                  </FormControl>
                             </Grid>
                             {/* Application Type Dropdown (Filtered) */}
                             <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth size="small" required disabled={!selectedCategoryIdForNewProduct}>
                                     <InputLabel>Application Type</InputLabel>
                                     <Select
                                       label="Application Type"
                                       name="application_id" // This name matches the state and backend
                                       value={newProduct.application_id}
                                       onChange={handleNewProductChange}
                                     >
                                        <MenuItem value=""><em>Select Application</em></MenuItem>
                                         {filteredApplicationsForNewProduct.map(app => (
                                             <MenuItem key={app.id} value={app.id}>{app.name}</MenuItem>
                                         ))}
                                     </Select>
                                  </FormControl>
                             </Grid>

                            {/* Product Details Fields */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Product Name"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  name="name"
                                  value={newProduct.name}
                                  onChange={handleNewProductChange}
                                  required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Brand"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  name="brand"
                                  value={newProduct.brand}
                                  onChange={handleNewProductChange}
                                  required
                                />
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Temperature Range"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  name="temperature_range"
                                  value={newProduct.temperature_range}
                                  onChange={handleNewProductChange}
                                  // Removed 'required' prop:
                                  // required
                                />
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Material"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  name="material"
                                  value={newProduct.material}
                                  onChange={handleNewProductChange}
                                  required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} onPaste={handlePasteImage}> {/* Add onPaste handler here */}
                                {/* File Input */}
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file" // Removed 'multiple' as we expect single product image
                                    name="image_file"
                                    onChange={handleNewProductChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="outlined" component="span" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 1, mr: 1, color: '#2f615d', borderColor: '#2f615d' }}>
                                        Upload Product Image
                                    </Button>
                                </label>

                                {/* Manual Image URL Input */}
                                <TextField
                                  label="Or paste Image URL" // Changed label to differentiate
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  name="image_url" // Name matches newProduct.image_url
                                  value={newProduct.image_url}
                                  onChange={handleNewProductChange}
                                  sx={{ mt: 2 }} // Add some margin
                                  disabled={!!selectedImageFile} // Disable if a file is selected
                                />

                                {imagePreviewUrl && (
                                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={imagePreviewUrl}
                                            alt="Image Preview"
                                            variant="rounded"
                                            sx={{ width: 80, height: 80, mr: 2, border: '1px solid #ddd' }}
                                        />
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setSelectedImageFile(null);
                                                setImagePreviewUrl('');
                                                setNewProduct(prev => ({ ...prev, image_url: '' })); // Clear the URL in state
                                                const fileInput = document.getElementById('raised-button-file');
                                                if (fileInput) fileInput.value = ''; // Clear file input visually
                                            }}
                                        >
                                            Remove Image
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                  label="Description"
                                  variant="outlined"
                                  fullWidth
                                  multiline
                                  rows={2}
                                  size="small"
                                  name="description"
                                  value={newProduct.description}
                                  onChange={handleNewProductChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                 <FormGroup>
                                     <FormControlLabel
                                        control={
                                           <Checkbox
                                               checked={newProduct.is_new}
                                               onChange={handleNewProductChange}
                                               name="is_new"
                                           />
                                        }
                                        label="Mark as New Product"
                                     />
                                  </FormGroup>
                             </Grid>

                             {/* {{ NEW: Product Features Section }} */}
                             <Grid item xs={12}>
                                 <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#2f615d', fontWeight: 'bold' }}>Product Features</Typography>
                                 {newProduct.product_features.map((feature, index) => (
                                     <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, border: '1px solid #eee', p: 2, borderRadius: '4px' }}>
                                         <TextField
                                             label="Feature Name"
                                             variant="outlined"
                                             size="small"
                                             value={feature.name}
                                             onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                                             sx={{ flex: 2 }}
                                             required
                                         />
                                         <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
                                             <InputLabel>Type</InputLabel>
                                             <Select
                                                 value={feature.type}
                                                 label="Type"
                                                 onChange={(e) => handleFeatureChange(index, 'type', e.target.value)}
                                             >
                                                 <MenuItem value="rating">Rating (Stars)</MenuItem>
                                                 <MenuItem value="value">Text Value</MenuItem>
                                             </Select>
                                         </FormControl>
                                         {feature.type === 'rating' ? (
                                             <FormControl size="small" sx={{ flex: 1, minWidth: 100 }}>
                                                 <InputLabel>Stars</InputLabel>
                                                 <Select
                                                     value={feature.value}
                                                     label="Stars"
                                                     onChange={(e) => handleFeatureChange(index, 'rating', e.target.value)}
                                                 >
                                                     {[0, 1, 2, 3, 4, 5].map((star) => (
                                                         <MenuItem key={star} value={star}>
                                                             {star > 0 ? Array(star).fill(<StarIcon sx={{ fontSize: '1em', verticalAlign: 'middle', color: '#FFD700' }} />) : '0 Stars'}
                                                         </MenuItem>
                                                     ))}
                                                 </Select>
                                             </FormControl>
                                         ) : (
                                             <TextField
                                                 label="Feature Value"
                                                 variant="outlined"
                                                 size="small"
                                                 value={feature.textValue}
                                                 onChange={(e) => handleFeatureChange(index, 'textValue', e.target.value)}
                                                 sx={{ flex: 2 }}
                                             />
                                         )}
                                         <IconButton onClick={() => handleRemoveFeature(index)} color="error">
                                             <DeleteIcon />
                                         </IconButton>
                                     </Box>
                                 ))}
                                 <Button
                                     variant="outlined"
                                     startIcon={<AddCircleOutlineIcon />}
                                     onClick={handleAddFeature}
                                     sx={{ mt: 1, color: '#2f615d', borderColor: '#2f615d', '&:hover': { borderColor: '#2f615d', bgcolor: 'rgba(47, 97, 93, 0.04)' } }}
                                 >
                                     Add Product Feature
                                 </Button>
                             </Grid>

                             {/* Product Specs Section (Modified UI for multi-color editing) */}
                             <Grid item xs={12}>
                                 <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#2f615d', fontWeight: 'bold' }}>Product Specs</Typography>

                                 {/* Textarea for pasting specs */}
                                 <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                                     <Grid item xs={12}>
                                              <TextField
                                             label="Paste Specs Table Here (Tab-separated. See Example for format.)"
                                                 variant="outlined"
                                                 fullWidth
                                             multiline
                                             rows={10} // Increased rows for better visibility of example
                                             value={pastedSpecsText}
                                             onChange={(e) => setPastedSpecsText(e.target.value)}
                                             placeholder={
                                               `Example (tab-separated columns, including header rows):\n` +
                                               `ORTAC® 250\n` +
                                               `SAP#\t\t\tNom. ID\t\tNom. OD\t\tMax. WP\t\tWeight\n` +
                                               `Black\tBlue\tRed\tIn\tmm\tIn\tmm\tPsi\tMPa\tlb/ft\tKg/m\n` +
                                               `20025408\t---\t20025498\t1/4\t6.4\t0.54\t13.7\t300\t2.07\t0.14\t0.21\n` +
                                               `20025428\t---\t20025499\t5/16\t7.9\t0.64\t16.3\t300\t2.07\t0.18\t0.27\n` +
                                               `20025430\t20026318\t20025502\t3/8\t9.5\t0.69\t17.5\t300\t2.07\t0.19\t0.28\n` +
                                               `20025450\t20026319\t20025512\t1/2\t12.7\t0.86\t21.8\t300\t2.07\t0.26\t0.39\n` +
                                               `ORTAC® 400\n` +
                                               `SAP#\t\t\tNom. ID\t\tNom. OD\t\tMax. WP\t\tWeight\n` +
                                               `Black\tRed\tIn\tmm\tIn\tmm\tPsi\tMPa\tlb/ft\tKg/m\n` +
                                               `20026596\t---\t20026597\t1/4\t6.4\t0.61\t15.7\t400\t2.76\t0.16\t0.24`
                                             }
                                              />
                                           </Grid>
                                     <Grid item xs={12}>
                                         <Button
                                             variant="contained"
                                             onClick={handlePasteSpecs}
                                             startIcon={<AddCircleOutlineIcon />}
                                             sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, mr: 1 }}
                                         >
                                             Parse & Add Specs Tables
                                         </Button>
                                         <Button
                                             variant="outlined"
                                             onClick={handleAddSpecGroup} // Add a new model group manually
                                             startIcon={<AddCircleOutlineIcon />}
                                             sx={{ color: '#2f615d', borderColor: '#2f615d', '&:hover': { borderColor: '#2f615d', bgcolor: 'rgba(47, 97, 93, 0.04)' } }}
                                         >
                                             Add New Model Group
                                         </Button>
                                     </Grid>
                                 </Grid>

                                 {/* Display and Edit Individual Spec Groups (Pivoted for multi-color editing) */}
                                 {newProduct.specs.map((modelGroup, modelGroupIndex) => (
                                     <Paper key={modelGroupIndex} elevation={1} sx={{ p: 2, mb: 3, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                         <Grid container spacing={2} alignItems="center">
                                             <Grid item xs={12} sm={8}>
                                              <TextField
                                                     label="Model Series"
                                                 variant="outlined"
                                                 fullWidth
                                                 size="small"
                                                     name="model_series"
                                                     value={modelGroup.model_series}
                                                     onChange={(e) => handleSpecGroupChange(modelGroupIndex, e)}
                                              />
                                           </Grid>
                                             <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                                                 <Button
                                                     variant="outlined"
                                                     onClick={() => handleAddColorColumn(modelGroupIndex)}
                                                     startIcon={<AddCircleOutlineIcon />}
                                                     sx={{ mr: 1, color: '#2f615d', borderColor: '#2f615d' }}
                                                 >
                                                     Add Color
                                                 </Button>
                                                 <IconButton
                                                     aria-label="remove spec group"
                                                     onClick={() => handleRemoveSpecGroup(modelGroupIndex)}
                                                     color="error"
                                                 >
                                                     <DeleteIcon /> {/* Using DeleteIcon for removing the whole group */}
                                                 </IconButton>
                                             </Grid>
                                         </Grid>

                                         <TableContainer component={Box} sx={{ mt: 2 }}>
                                             <Table size="small">
                                                 <TableHead>
                                                     {/* Main Headers (SAP#, Nom. ID, Nom. OD, Max. WP, Weight) */}
                                                     <TableRow>
                                                         <TableCell colSpan={modelGroup.uniqueColors.length} sx={{ fontWeight: 'bold' }}>SAP #</TableCell>
                                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Nom. ID</TableCell>
                                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Nom. OD</TableCell>
                                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Max. WP</TableCell>
                                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                                     </TableRow>
                                                     {/* Sub-headers (Colors, In, mm, Psi, MPa, lb/ft, Kg/m) */}
                                                     <TableRow>
                                                         {modelGroup.uniqueColors.map(color => (
                                                             <TableCell key={color} sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                                                                 {color.charAt(0).toUpperCase() + color.slice(1)} {/* Capitalize color */}
                                                                 {modelGroup.uniqueColors.length > 1 && ( // Only show delete if multiple colors
                                                                      <IconButton
                                                                          size="small"
                                                                          onClick={() => handleRemoveColorColumn(modelGroupIndex, color)}
                                                                          sx={{ p: 0.2, ml: 0.5, color: 'error.main' }}
                                                                      >
                                                                          <RemoveCircleOutlineIcon fontSize="inherit" />
                                                                      </IconButton>
                                                                 )}
                                                             </TableCell>
                                                         ))}
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>In</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>mm</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>In</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>mm</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>Psi</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>MPa</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>lb/ft</TableCell>
                                                         <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>Kg/m</TableCell>
                                                     </TableRow>
                                                 </TableHead>
                                                 <TableBody>
                                                     {modelGroup.rows.map((row, rowIndex) => (
                                                         <TableRow key={rowIndex}>
                                                             {/* SAP# inputs for each color */}
                                                             {modelGroup.uniqueColors.map(color => (
                                                                 <TableCell key={color}>
                                                                     <TextField
                                                                         variant="standard"
                                                                         size="small"
                                                                         value={row.sapsByColor[color] || ''}
                                                                         onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, `sap_${color}`, e.target.value)}
                                                                         fullWidth
                                                                     />
                                                                 </TableCell>
                                                             ))}
                                                             {/* Dimensional inputs */}
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.nom_id_in}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'nom_id_in', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.nom_id_mm}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'nom_id_mm', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.nom_od_in}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'nom_od_in', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.nom_od_mm}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'nom_od_mm', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.max_wp_psi}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'max_wp_psi', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.max_wp_mpa}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'max_wp_mpa', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.weight_lbft}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'weight_lbft', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <TextField
                                                                     variant="standard" size="small" fullWidth
                                                                     value={row.weight_kgm}
                                                                     onChange={(e) => handleSpecRowChange(modelGroupIndex, rowIndex, 'weight_kgm', e.target.value)}
                                                                 />
                                                             </TableCell>
                                                             <TableCell>
                                                                 <IconButton
                                                                     aria-label="remove spec row"
                                                                     onClick={() => handleRemoveSpecRow(modelGroupIndex, rowIndex)}
                                                                     color="error"
                                                                 >
                                                                     <RemoveCircleOutlineIcon />
                                                                 </IconButton>
                                                             </TableCell>
                                                         </TableRow>
                                                     ))}
                                                     {modelGroup.rows.length === 0 && (
                                                          <TableRow>
                                                              <TableCell colSpan={modelGroup.uniqueColors.length * 1 + 9} sx={{ textAlign: 'center', fontStyle: 'italic' }}>No spec rows in this group. Add one below!</TableCell>
                                                          </TableRow>
                                                     )}
                                                 </TableBody>
                                             </Table>
                                         </TableContainer>
                                         <Button
                                             variant="text"
                                             onClick={() => handleAddSpecRow(modelGroupIndex)}
                                             startIcon={<AddCircleOutlineIcon />}
                                             sx={{ mt: 1, color: '#2f615d' }}
                                         >
                                             Add Spec Row to this Group
                                  </Button>
                                     </Paper>
                                 ))}
                             </Grid>

                             <Grid item xs={12} sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                 <Button
                                     type="submit"
                                     variant="contained"
                                     sx={{ bgcolor: '#2f615d', '&:hover': { bgcolor: '#244d49' } }}
                                 >
                                     {editingProductId ? 'Update Product' : 'Add Product'}
                                </Button>
                                 {editingProductId && (
                                     <Button
                                         variant="outlined"
                                         onClick={handleCancelEdit}
                                         sx={{ color: '#2f615d', borderColor: '#2f615d', '&:hover': { borderColor: '#2f615d', bgcolor: 'rgba(47, 97, 93, 0.04)' } }}
                                     >
                                         Cancel Edit
                                     </Button>
                                 )}
                             </Grid>
                        </Grid>
                     </Box>
                </Paper>

                {/* Product List Table (Display will also be updated) */}
                <Paper elevation={1} sx={{ p: 3, borderRadius: '8px', boxShadow: 1 }}>
                    <TableContainer>
                  <Table>
                    <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Application Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Material</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Temperature Range</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Is New</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <React.Fragment key={product.id}>
                             <TableRow>
                                 <TableCell>{product.name}</TableCell>
                                                <TableCell>{getFormattedApplicationName(product.application_id)}</TableCell>
                                 <TableCell>{product.brand}</TableCell>
                                 <TableCell>{product.material}</TableCell>
                                 <TableCell>{product.temperature_range}</TableCell>
                                                <TableCell>{product.is_new ? 'Yes' : 'No'}</TableCell>
                                 <TableCell>
                                                    <IconButton
                                                        aria-label="edit product"
                                                        onClick={() => handleEditProductClick(product)}
                                                        sx={{ color: '#2f615d' }}
                                                    >
                                          <EditIcon />
                                      </IconButton>
                                                    <IconButton
                                                        aria-label="delete product"
                                                        onClick={() => handleDeleteProductClick(product.id)}
                                                        color="error"
                                                    >
                                          <DeleteIcon />
                                      </IconButton>
                                                    <IconButton
                                                        aria-label="toggle specs"
                                                        onClick={() => handleToggleSpecs(product.id)}
                                                        sx={{ color: '#2f615d' }}
                                                    >
                                                        {openSpecs[product.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                 </TableCell>
                             </TableRow>
                             <TableRow>
                                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                     <Collapse in={openSpecs[product.id]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" gutterBottom component="div" sx={{ color: '#2f615d' }}>
                                                                Product Specifications
                                           </Typography>
                                           {product.specs && product.specs.length > 0 ? (
                                                                            <Table size="small" aria-label="product specs details">
                                                                                {/* NO TOP-LEVEL TABLE HEAD HERE */}
                                                                                <TableBody>
                                                                                    {/* Render specs grouped by Model Series and then pivoted for multi-color display */}
                                                                                    {prepareSpecsForExcelDisplay(product.specs).map((modelGroup, modelGroupIndex) => (
                                                                                        <React.Fragment key={modelGroupIndex}>
                                                                                            {/* Model Series Title Row */}
                                                                                            <TableRow>
                                                                                                <TableCell colSpan={modelGroup.uniqueColors.length * 1 + 8} sx={{ fontWeight: 'bold', fontSize: '1.05rem', pt: 2, pb: 0, borderBottom: 'none' }}>
                                                                                                    {modelGroup.model_series}
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                            {/* Dynamic Table Headers */}
                                                                                            <TableRow>
                                                                                                <TableCell colSpan={modelGroup.uniqueColors.length} sx={{ fontWeight: 'bold' }}>SAP #</TableCell>
                                                                                                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Nom. ID</TableCell>
                                                                                                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Nom. OD</TableCell>
                                                                                                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Max. WP</TableCell>
                                                                                                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                                                                            </TableRow>
                                                                                            <TableRow>
                                                                                                {/* Color sub-headers */}
                                                                                                {modelGroup.uniqueColors.map(color => (
                                                                                                    <TableCell key={color} sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>{color.charAt(0).toUpperCase() + color.slice(1)}</TableCell>
                                                                                                ))}
                                                                                                {/* Unit sub-headers for dimensional data */}
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>In</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>mm</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>In</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>mm</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>Psi</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>MPa</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>lb/ft</TableCell>
                                                                                                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>Kg/m</TableCell>
                                                                                            </TableRow>
                                                                                            {/* Render the data rows for this model group */}
                                                                                            {modelGroup.rows.map((row, rowIndex) => (
                                                                                                <TableRow key={rowIndex}>
                                                                                                    {/* SAPs for each color */}
                                                                                                    {modelGroup.uniqueColors.map(color => (
                                                                                                        <TableCell key={color}>{row.sapsByColor[color]}</TableCell>
                                                                                                    ))}
                                                                                                    {/* Parsed dimensional data */}
                                                                                                    <TableCell>{row.nom_id_in}</TableCell>
                                                                                                    <TableCell>{row.nom_id_mm}</TableCell>
                                                                                                    <TableCell>{row.nom_od_in}</TableCell>
                                                                                                    <TableCell>{row.nom_od_mm}</TableCell>
                                                                                                    <TableCell>{row.max_wp_psi}</TableCell>
                                                                                                    <TableCell>{row.max_wp_mpa}</TableCell>
                                                                                                    <TableCell>{row.weight_lbft}</TableCell>
                                                                                                    <TableCell>{row.weight_kgm}</TableCell>
                                                                                                </TableRow>
                                                                                            ))}
                                                                                            {/* Add a separator between different Model/Color groups if not the last group */}
                                                                                            {modelGroupIndex < prepareSpecsForExcelDisplay(product.specs).length - 1 && (
                                                                                                <TableRow>
                                                                                                    <TableCell colSpan={modelGroup.uniqueColors.length * 1 + 8} sx={{ borderBottom: '2px solid #ddd', py: 2 }}></TableCell>
                                                                                                </TableRow>
                                                                                            )}
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                                </TableBody>
                                                                            </Table>
                                                                        ) : (
                                                                            <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic' }}>No specifications available.</Typography>
                                                                        )}
                                                                    </Box>
                                                                </Collapse>
                                                             </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} sx={{ textAlign: 'center' }}>No products found.</TableCell>
                                                </TableRow>
                                            )}
                                         </TableBody>
                                     </Table>
                                 </TableContainer>
                </Paper>
              </Box>
            )}
            {selectedMenu === 'Users' && (
              <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Users Management Page</Typography>

                {/* Add New User Form */}
                <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '8px', boxShadow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>Add New User</Typography>
                  <Box component="form" onSubmit={showVerificationInput ? handleConfirmAddUser : handleInitiateAddUser} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={newUserFirstName}
                          onChange={(e) => setNewUserFirstName(e.target.value)}
                          required
                          disabled={showVerificationInput} // Disable fields once verification is initiated
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={newUserLastName}
                          onChange={(e) => setNewUserLastName(e.target.value)}
                          required
                          disabled={showVerificationInput}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Username"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={newUserName}
                          onChange={(e) => {
                              setNewUserName(e.target.value);
                          }}
                          required
                          disabled={showVerificationInput}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          size="small"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          required
                          disabled={showVerificationInput}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" required disabled={showVerificationInput}>
                          <InputLabel>Role</InputLabel>
                          <Select
                            value={newUserRole}
                            label="Role"
                            onChange={(e) => setNewUserRole(e.target.value)}
                          >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="staff">Staff</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {showVerificationInput ? (
                        <Grid item xs={12}>
                          <TextField
                            label="Verification Code"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, bgcolor: '#2f615d', '&:hover': { bgcolor: '#244d49' } }}
                          >
                            Confirm User Creation
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: '#2f615d', '&:hover': { bgcolor: '#244d49' } }}
                          >
                            Initiate User Creation
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                    {addUserMessage && (
                      <Typography
                          variant="body2"
                          sx={{ mt: 2, color: addUserMessage.includes('Success') ? 'green' : 'red' }}
                      >
                          {addUserMessage}
                      </Typography>
                    )}
              </Box>
                </Paper>

                {/* User List Table */}
                <Typography variant="h5" sx={{ mt: 4, color: '#2f615d', fontWeight: 'bold' }} gutterBottom>Current Users</Typography>
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>First Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Last Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Username</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.first_name || 'N/A'}</TableCell>
                            <TableCell>{user.last_name || 'N/A'}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Button variant="outlined" size="small" sx={{ mr: 1, color: '#2f615d', borderColor: '#2f615d' }}>Edit Role</Button>
                              <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} sx={{ textAlign: 'center' }}>No users found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            {selectedMenu === 'Inquiries' && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h4" sx={{ color: '#2f615d', fontWeight: 'bold' }}>
                    Customer Inquiries
                    {unreadInquiryCount > 0 && (
                      <Badge
                        badgeContent={unreadInquiryCount}
                        color="error"
                        sx={{ ml: 2 }}
                      >
                        <MailOutlineIcon />
                      </Badge>
                    )}
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={fetchInquiries}
                      sx={{ mr: 2, color: '#2f615d', borderColor: '#2f615d' }}
                    >
                      Refresh
                    </Button>
                    {unreadInquiryCount > 0 && (
                      <Button
                        variant="contained"
                        startIcon={<DoneAllIcon />}
                        onClick={markAllInquiriesAsRead}
                        sx={{ bgcolor: '#2f615d', '&:hover': { bgcolor: '#1e4a47' } }}
                      >
                        Mark All as Read
                      </Button>
                    )}
                  </Box>
                </Box>

                {inquiriesLoading ? (
                  <LinearProgress sx={{ mb: 2 }} />
                ) : inquiriesError ? (
                  <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>{inquiriesError}</Typography>
                ) : showCustomerInquiryDetails ? ( // NEW: Conditional render for detail view
                  <Paper elevation={3} sx={{ p: 4, borderRadius: '12px' }}>
                      <Button
                          variant="outlined"
                          onClick={handleBackToInquirySummary}
                          startIcon={<ArrowBackIosIcon />}
                          sx={{ mb: 3, color: '#2f615d', borderColor: '#2f615d' }}
                      >
                          Back to Customer List
                      </Button>
                      {selectedCustomerInquiryDetails && (
                          <Box>
                              <Typography variant="h5" gutterBottom sx={{ color: '#2f615d', fontWeight: 'bold' }}>
                                  Inquiry Details for {selectedCustomerInquiryDetails.customer_name}
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Email:</strong> {selectedCustomerInquiryDetails.customer_email}
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                  <strong>Total Inquiries:</strong> {selectedCustomerInquiryDetails.total_inquiries}
                              </Typography>

                              <Divider sx={{ my: 3 }} />

                              <Typography variant="h6" gutterBottom sx={{ color: '#2f615d' }}>
                                  All Inquiries from this Customer:
                              </Typography>
                              <List>
                                  {selectedCustomerInquiryDetails.inquiry_list.map((inquiry, index) => (
                                      <Paper key={inquiry.id} elevation={1} sx={{ p: 2, mb: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                              Inquiry #{index + 1} (Submitted: {new Date(inquiry.created_at).toLocaleString()})
                                          </Typography>
                                          <Typography variant="body2" sx={{ mt: 1 }}>
                                              <strong>Message:</strong> {inquiry.customer_message || 'No message provided.'}
                                          </Typography>
                                          <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                                              Inquired Products:
                                          </Typography>
                                          {inquiry.inquiry_items && inquiry.inquiry_items.length > 0 ? (
                                              <List dense disablePadding sx={{ ml: 2 }}>
                                                  {inquiry.inquiry_items.map((item, idx) => (
                                                      <ListItem key={idx} disablePadding>
                                                          <ListItemText
                                                              primary={item.product_name}
                                                              secondary={`SAP#: ${item.product_sap || 'N/A'}`}
                                                          />
                                                      </ListItem>
                                                  ))}
                                              </List>
                                          ) : (
                                              <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>No products listed for this inquiry.</Typography>
                                          )}
                                          {/* ADD THE DELETE BUTTON HERE: */}
                                          <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteInquiry(inquiry.id)}
                                            sx={{ mt: 1 }}
                                          >
                                            Delete
                                          </Button>
                                      </Paper>
                                  ))}
                              </List>
                          </Box>
                      )}
                  </Paper>
              ) : customerInquirySummaries.length === 0 ? (
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                  No customer inquiries to display yet.
                </Typography>
              ) : (
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Customer Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Total Inquiries</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Unread</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2f615d' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerInquirySummaries.map((summary) => (
                        <TableRow
                          key={summary.customer_email}
                          sx={{
                            bgcolor: summary.unread_count > 0 ? 'rgba(47, 97, 93, 0.05)' : 'inherit',
                            '&:hover': { bgcolor: 'rgba(47, 97, 93, 0.1)' }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {summary.customer_name}
                              {summary.unread_count > 0 && (
                                <Badge
                                  badgeContent={summary.unread_count}
                                  color="error"
                                  sx={{ ml: 1 }}
                                >
                                  <MailOutlineIcon fontSize="small" />
                                </Badge>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>{summary.customer_email}</TableCell>
                          <TableCell>{summary.total_inquiries}</TableCell>
                          <TableCell>{summary.unread_count}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewCustomerInquiries(summary)}
                              sx={{
                                color: '#2f615d',
                                borderColor: '#2f615d',
                                '&:hover': {
                                  bgcolor: 'rgba(47, 97, 93, 0.1)',
                                  borderColor: '#1e4a47'
                                }
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteInquiry(summary.inquiry_list[0]?.id)} // or the correct id
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
            {location.pathname !== '/admin' &&
             location.pathname !== '/admin/categories' &&
             location.pathname !== '/admin/products' &&
             location.pathname !== '/admin/users' &&
             selectedMenu !== 'Inquiries' &&
             location.pathname !== '/admin/brand-partners' && (
               <Box sx={{ paddingTop: 3, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
               </Box>
            )}
            {location.pathname === '/admin/contact-info' && (
              <Box sx={{ paddingTop: 0, paddingRight: 3, paddingBottom: 3, paddingLeft: 0 }}>
                <Typography variant="h4" sx={{ color: '#2f615d', fontWeight: 'bold', mb: 3 }}>
                  Contact Form Submissions
                </Typography>
                <ContactSubmissionsTable />
              </Box>
            )}
          </Box> {/* <-- Add this line */}
        </Container>
      </MainContent>
    </Box>
  );
}
