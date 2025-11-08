import { Box } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import LoadingModal from "../components/utils/LoadingModal";
import { DocumentTitle } from "../components/utils/DocumentTitle";

const Home = () => {
  const { language } = useLanguage();
  DocumentTitle();
  return <Box></Box>;
};

export default Home;
