import React, { useState } from 'react';
import { useQuiz } from './QuizContext';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const QuizList: React.FC = () => {
    const { fragen } = useQuiz();
    const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0);
    const [korrekteAntworten, setKorrekteAntworten] = useState(0);
    const [quizBeendet, setQuizBeendet] = useState(false);

    const handleAntwortAuswahl = (ausgewählteAntwort: string) => {
        if (fragen[aktuelleFrageIndex].CorrectAnswer === ausgewählteAntwort) {
            setKorrekteAntworten(korrekteAntworten + 1);
        }
        if (aktuelleFrageIndex < fragen.length - 1) {
            setAktuelleFrageIndex(aktuelleFrageIndex + 1);
        } else {
            setQuizBeendet(true);
        }
    };

    if (quizBeendet) {
        return (
            <Container maxWidth="sm">
                <Paper elevation={3}>
                    <Box p={3}>
                        <Typography variant="h5" component="h2">Quiz beendet!</Typography>
                        <Typography>
                            Du hast {korrekteAntworten} von {fragen.length} Fragen richtig beantwortet.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
                            Quiz neu starten
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h5" component="h2">{fragen[aktuelleFrageIndex].Question}</Typography>
                    <Box>
                        {fragen[aktuelleFrageIndex].Answers.map((antwort, index) => (
                            <Button key={index} variant="contained" color="primary" onClick={() => handleAntwortAuswahl(antwort)} style={{ margin: '10px' }}>
                                {antwort}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default QuizList;
