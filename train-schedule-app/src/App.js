// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTrains from './pages/AllTrains';
import SingleTrain from './pages/SingleTrain';
import { CssBaseline, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Train Schedule App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<AllTrains />} />
            <Route path="/trains/:trainNumber" element={<SingleTrain />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
