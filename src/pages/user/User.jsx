import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/translations";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingModal from "../../components/utils/LoadingModal";
import { DocumentTitle } from "../../components/utils/DocumentTitle";
import { ROLES } from "../../utils/roles";
import { userApi } from "../../api/userApi";
import AlertModal from "../../components/utils/AlertModal";

const User = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  DocumentTitle(translations[language].users);

  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userApi.getAllUser();
      setUsers(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Fetching data failed. Please try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => navigate(0);

  const handleAdd = () => {
    setFormData({ name: "", email: "", password: "", role: "" });
    setEditingUser(null);
    setOpenFormModal(true);
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: "" });
    setEditingUser(user);
    setOpenFormModal(true);
  };

  // ✅ fixed: must use arrow function, not call directly
  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (deleteUserId) {
      try {
        await userApi.deleteUser(deleteUserId);
        setMessage("User deleted successfully.");
        fetchUsers();
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete user.";
        setMessage(msg);
      } finally {
        setShowDeleteModal(false);
        setDeleteUserId(null);
      }
    }
  };

  const handleClose = () => setOpenFormModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userApi.updateUser(editingUser._id, formData);
        setMessage("User updated successfully.");
      } else {
        await userApi.createUser(formData);
        setMessage("User created successfully.");
      }
      setOpenFormModal(false);
      fetchUsers();
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to save user.";
      setMessage(msg);
    }
  };

  if (loading) return <LoadingModal status={loading} />;

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Box>
      {message && <AlertModal type="info" message={message} />}

      {/* Top Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5" color="primary">
          {translations[language].users}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label={translations[language].search}
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleRefresh}
          >
            {translations[language].refresh}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAdd}
          >
            {translations[language].add}
          </Button>
        </Stack>
      </Box>

      {showDeleteModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
          }}
        >
          <Paper
            sx={{
              p: 4,
              width: 400,
              textAlign: "center",
              animation: "slideDown 0.3s ease",
            }}
          >
            <Typography variant="h6" mb={2}>
              {translations[language].caution}
            </Typography>
            <Typography mb={3}>
              {translations[language].delete_confirm}
            </Typography>
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={() => setShowDeleteModal(false)}
              >
                {translations[language].cancel}
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                {translations[language].delete}
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Users Table */}
      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>{translations[language]._no}</TableCell>
            <TableCell>{translations[language].name}</TableCell>
            <TableCell>{translations[language].email}</TableCell>
            <TableCell>{translations[language].role}</TableCell>
            <TableCell align="right">{translations[language].action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((u, index) => (
              <TableRow key={u._id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(u)}
                  >
                    {translations[language].edit}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => openDeleteModal(u._id)}
                  >
                    {translations[language].delete}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {translations[language].no_data}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Stack direction="row" spacing={2} mt={2} justifyContent="center">
        <Button
          size="small"
          variant="contained"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          {translations[language].previous}
        </Button>
        <Typography variant="body2">
          {page} / {totalPages} {translations[language].page}
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          {translations[language].next}
        </Button>
      </Stack>

      {/* Add/Edit Modal */}
      <Dialog
        open={openFormModal}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingUser
            ? translations[language].edit
            : translations[language].add}{" "}
          {translations[language].user}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={translations[language].name}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
              required
              size="small"
            />
            <TextField
              fullWidth
              label={translations[language].email}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              margin="normal"
              required
              size="small"
            />
            <TextField
              fullWidth
              label={translations[language].password}
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              margin="normal"
              size="small"
              required={!editingUser}
            />
            <TextField
              fullWidth
              select
              label={translations[language].role}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              margin="normal"
              size="small"
              required
            >
              {Object.values(ROLES).map((role) => (
                <MenuItem key={role} value={role}>
                  {role.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                size="small"
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={handleClose}
              >
                {translations[language].cancel}
              </Button>
              <Button size="small" type="submit" variant="contained">
                {editingUser
                  ? translations[language].update || "Update"
                  : translations[language].add}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default User;
