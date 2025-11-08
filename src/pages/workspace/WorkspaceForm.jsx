import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  List,
} from "@mui/material";
// import { List as ListIcon } from "@mui/icons-material";
import { AVAILABLE_FUNCTIONS, CATEGORIES, SIZE } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import { DocumentTitle } from "../../components/utils/DocumentTitle";
import { useLanguage } from "../../contexts/LanguageContext";
import { workspaceApi } from "../../api/workspaceApi";
import LoadingModal from "../../components/utils/LoadingModal";
import { useNavigate } from "react-router-dom";
import { translations } from "../../utils/translations";

// -----------------------------------------------------------

const initialFormData = {
  name: "",
  companyName: "",
  companySize: "",
  category: "",
  functions: [],
  owner: "",
};

// --- Step 0 Component: Workspace Name ---
const Step0_Details = ({ formData, handleChange }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <TextField
      label="Workspace Name"
      variant="outlined"
      fullWidth
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      sx={{ mt: 2 }}
    />
  </Box>
);

// --- Step 1 Component: Company Details ---
const Step1_Details = ({ formData, handleChange }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <TextField
      label="Company Name"
      variant="outlined"
      fullWidth
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      required
      sx={{ mt: 2 }}
    />

    <TextField
      fullWidth
      select
      label="Company Size"
      name="companySize"
      value={formData.companySize}
      onChange={handleChange}
      required
    >
      {Object.values(SIZE).map((size) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      fullWidth
      select
      label="Company Category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
    >
      {Object.values(CATEGORIES).map((c) => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

// --- Step 2 Component: Functions Transfer List ---
const Step2_Details = ({ formData, onFunctionsChange }) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(
    formData.functions.length > 0
      ? AVAILABLE_FUNCTIONS.filter((f) => !formData.functions.includes(f))
      : AVAILABLE_FUNCTIONS,
  );
  const [right, setRight] = useState(formData.functions);

  const not = (a, b) => a.filter((value) => !b.includes(value));
  const intersection = (a, b) => a.filter((value) => b.includes(value));

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    const newRight = right.concat(left);
    setRight(newRight);
    setLeft([]);
    onFunctionsChange(newRight);
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked);
    setRight(newRight);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onFunctionsChange(newRight);
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(rightChecked);
    setLeft(newLeft);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    onFunctionsChange(not(right, rightChecked));
  };

  const handleAllLeft = () => {
    const newLeft = left.concat(right);
    setLeft(newLeft);
    setRight([]);
    onFunctionsChange([]);
  };

  const customList = (title, items) => (
    <Paper
      sx={{ width: 250, minHeight: 250, overflow: "auto", borderRadius: 2 }}
    >
      <Typography
        sx={{ p: 1, backgroundColor: "primary.light", color: "white" }}
        align="center"
        variant="subtitle2"
      >
        {title} ({items.length})
      </Typography>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2, width: "100%" }}
    >
      {/* Left column */}
      <Grid item xs={5}>
        {customList("Available", left)}
      </Grid>

      {/* Middle buttons column */}
      <Grid
        item
        xs={2}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          sx={{ my: 0.5 }}
          variant="contained"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          &gt;&gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="contained"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          &lt;&lt;
        </Button>
      </Grid>

      {/* Right column */}
      <Grid item xs={5}>
        {customList("Selected", right)}
      </Grid>
    </Grid>
  );
};

// --- Step Content Selector ---
function getStepContent(step, formData, handleChange, onFunctionsChange) {
  switch (step) {
    case 0:
      return <Step0_Details formData={formData} handleChange={handleChange} />;
    case 1:
      return <Step1_Details formData={formData} handleChange={handleChange} />;
    case 2:
      return (
        <Step2_Details
          formData={formData}
          onFunctionsChange={onFunctionsChange}
        />
      );
    default:
      return "Unknown step";
  }
}

// --- Main Component ---
const WorkspaceForm = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  DocumentTitle(translations[language].new);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const steps = [
    {
      label: translations[language].space_name,
      description: translations[language].name_desc,
    },
    {
      label: translations[language].space_info,
      description: translations[language].info_desc,
    },
    {
      label: translations[language].space_func,
      description: translations[language].func_desc,
    },
  ];

  const validateStep = (step, data) => {
    switch (step) {
      case 0:
        if (!data.name) return translations[language].req_name;
        return null;
      case 1:
        if (!data.companyName || !data.companySize || !data.category)
          return translations[language].req_info;
        return null;
      case 2:
        if (!data.functions || data.functions.length === 0)
          return translations[language].req_func;
        return null;
      default:
        return null;
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (!name) {
      console.error("Missing 'name' attribute on input:", e.target);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      owner: user?.id,
    }));

    if (validationError) setValidationError(null);
  };

  const handleFunctionsChange = (newFunctions) => {
    setFormData((prevData) => ({
      ...prevData,
      functions: newFunctions,
    }));
    if (validationError) setValidationError(null);
  };

  const handleNext = () => {
    const error = validateStep(activeStep, formData);

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);

    if (isLastStep) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await workspaceApi.createSpace(formData);
      navigate("/biz-space/dashboard");
    } catch (err) {
      console.error("Error adding workspace", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingModal status={loading} />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/cover.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: { xs: "100%", sm: 800 },
          width: "100%",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          zIndex: 100,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          {translations[language].new_space}
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">
                      {translations[language].last_step}
                    </Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>

              <StepContent>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {step.description}
                </Typography>

                {getStepContent(
                  index,
                  formData,
                  handleChange,
                  handleFunctionsChange,
                )}

                {validationError && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    {translations[language].error} {" : "} {validationError}
                  </Typography>
                )}

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mr: 1, minWidth: 100 }}
                  >
                    {index === steps.length - 1
                      ? translations[language].finish
                      : translations[language].continue}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {translations[language].go_back}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" sx={{ color: "success.main" }}>
              {translations[language].completed}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default WorkspaceForm;
