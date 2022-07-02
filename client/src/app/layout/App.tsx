import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import AboutPage from "../../features/About/AboutPage";
import Catalog from "../../features/Catalog/catalog";
import ProductDetail from "../../features/Catalog/ProductDetail";
import HomePage from "../../features/Home/HomePage";
import Header from "./Header";

function App(): JSX.Element {
  const [darkMode,setDarkMode] = useState(false);
  const paletteType = darkMode?'dark':'light';

  const theme = createTheme({
palette : {
mode:paletteType,
background : {default : paletteType === 'light' ? '#eaeaea' : '#121212'}
}
  });

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="catalog" element={<Catalog />} />
      <Route path="catalog/:id" element={<ProductDetail />} />
      <Route path="aboutpage" element={<AboutPage />} />
    </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
