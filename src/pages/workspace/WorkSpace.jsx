import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
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
import { workspaceApi } from "../../api/workspaceApi";
import AlertModal from "../../components/utils/AlertModal";

const WorkSpace = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  DocumentTitle(translations[language].spaces);

  const [message, setMessage] = useState(null);
  const [spaces, setSpaces] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSpaceId, setDeleteSpaceId] = useState(null);

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const res = await workspaceApi.getAllSpace();
      setSpaces(res.data);
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
    fetchSpaces();
  }, []);

  const handleRefresh = () => navigate(0);

  const openDeleteModal = (id) => {
    setDeleteSpaceId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (deleteSpaceId) {
      try {
        await workspaceApi.deleteSpace(deleteSpaceId);
        setMessage("Workspace deleted successfully.");
        fetchSpaces();
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete user.";
        setMessage(msg);
      } finally {
        setShowDeleteModal(false);
        setDeleteSpaceId(null);
      }
    }
  };

  if (loading) return <LoadingModal status={loading} />;

  // Search filter
  const filteredSpaces = spaces.filter((space) =>
    space.name.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedSpaces = filteredSpaces.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalPages = Math.ceil(filteredSpaces.length / rowsPerPage) || 1;

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Box sx={{ px: 3 }}>
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
            <TableCell>{translations[language].space_name}</TableCell>
            <TableCell>{translations[language].company}</TableCell>
            <TableCell>{translations[language].owner}</TableCell>
            <TableCell>{translations[language].status}</TableCell>
            <TableCell align="right">{translations[language].action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedSpaces.length > 0 ? (
            paginatedSpaces.map((u, index) => (
              <TableRow key={u._id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.companyName}</TableCell>
                <TableCell>{u.owner?.name}</TableCell>
                <TableCell>
                  {u.isActive
                    ? translations[language].active
                    : translations[language].in_active}
                </TableCell>
                <TableCell align="right">
                  {/* <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(u)}
                  >
                    {translations[language].edit}
                  </Button>*/}
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
    </Box>
  );
};
export default WorkSpace;
