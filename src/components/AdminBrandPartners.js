import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import API_BASE_URL from '../config'; // or './config' if in src/

export default function AdminBrandPartners({ token }) {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all brand partners
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/brand-partners`);
    setPartners(res.data);
  };

  // Add a new brand partner
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }
    await axios.post(`${API_BASE_URL}/api/brand-partners`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setName("");
    setImageUrl("");
    setImageFile(null);
    fetchPartners();
    setLoading(false);
  };

  // Delete a brand partner
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand partner?")) return;
    await axios.delete(`${API_BASE_URL}/api/brand-partners/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPartners();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "48px auto 0 auto", px: 2 }}>
      <Typography variant="h4" sx={{ color: "#2f615d", fontWeight: 700, mb: 3 }}>
        Brand Partners
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          py: 5,
          borderRadius: 3,
          maxWidth: 900,
          minHeight: 220,
          margin: "0 auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <form onSubmit={handleAdd}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageFile(null);
                }}
                fullWidth
                size="small"
                disabled={!!imageFile}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{ width: "100%" }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    setImageUrl("");
                  }}
                />
              </Button>
              {imageFile && (
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  {imageFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#2f615d", color: "#fff" }}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid container spacing={3}>
        {partners.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center", position: "relative" }}>
              <Avatar
                src={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${API_BASE_URL}${p.image_url}`) : undefined}
                alt={p.name}
                variant="rounded"
                sx={{ width: 80, height: 80, mx: "auto", mb: 1, bgcolor: "#e0f2f1" }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {p.name}
              </Typography>
              <IconButton
                onClick={() => handleDelete(p.id)}
                color="error"
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
