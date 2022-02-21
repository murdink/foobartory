import Dashboard from './components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import RobotsList from './components/RobotsList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <Dashboard />
        <RobotsList />
      </div>
    </ThemeProvider>
  );
}

export default App;
