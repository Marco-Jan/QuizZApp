import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


interface Props {
    show: boolean;
    onClose: () => void;
    onFrageHinzufügen: (frage: { Question: string; Answers: string[]; CorrectAnswer: string }) => void;
}

const FrageHinzufügenModal: React.FC<Props> = ({ show, onClose, onFrageHinzufügen }) => {
    const [neueFrageText, setNeueFrageText] = useState('');
    const [neueAntworten, setNeueAntworten] = useState(['', '', '', '']);
    const [richtigeAntwort, setRichtigeAntwort] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFrageHinzufügen({
            Question: neueFrageText,
            Answers: neueAntworten,
            CorrectAnswer: richtigeAntwort,
        });
        onClose(); // Modal schließen
    };

    return (
        <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Neue Frage hinzufügen
                <IconButton onClick={onClose} style={{position: 'absolute', right: 8, top: 8}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="frage"
                        label="Frage"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={neueFrageText}
                        onChange={(e) => setNeueFrageText(e.target.value)}
                    />
                    {neueAntworten.map((antwort, index) => (
                        <TextField
                            key={index}
                            margin="dense"
                            id={`antwort-${index}`}
                            label={`Antwort ${index + 1}`}
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={antwort}
                            onChange={(e) => {
                                const updatedAnswers = [...neueAntworten];
                                updatedAnswers[index] = e.target.value;
                                setNeueAntworten(updatedAnswers);
                            }}
                        />
                    ))}
                    <TextField
                        margin="dense"
                        id="richtige-antwort"
                        label="Richtige Antwort"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={richtigeAntwort}
                        onChange={(e) => setRichtigeAntwort(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Abbrechen
                    </Button>
                    <Button type="submit" color="primary">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};


export default FrageHinzufügenModal;
