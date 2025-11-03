import { Box } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { DocumentTitle } from "../components/utils/DocumentTitle";

const Home = () => {
  const { language } = useLanguage();
  DocumentTitle();
  return <Box>Hello From Home Page</Box>;
};

export default Home;
