import { useState } from 'react';
import { QuizProvider } from './Components/QuizContext';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './App.css';
import QuizList from './Components/QuizList';
import AdminPanel from './Components/AdminPanel';

function App() {
  const [modus, setModus] = useState<'admin' | 'spiel' | 'start'>('start');

  return (
    <QuizProvider>
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          {modus === 'start' && (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setModus('admin')}
                style={{ marginRight: '10px' }}
              >
                Admin-Bereich
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setModus('spiel')}
              >
                Quiz starten
              </Button>
            </>
          )}
          {modus === 'admin' && (
            <>
              <h1>Admin-Bereich</h1>
              <AdminPanel />
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => setModus('start')}
                style={{ marginTop: '20px' }}
              >
                Zurück
              </Button>
            </>
          )}
          {modus === 'spiel' && (
            <>
              <h1>Quiz</h1>
              <QuizList />
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => setModus('start')}
                style={{ marginTop: '20px' }}
              >
                Zurück
              </Button>
            </>
          )}
        </Box>
      </Container>
    </QuizProvider>
  );
}

export default App;
