import React, { useState } from 'react';
import { useQuiz } from './QuizContext';
import DeleteIcon from '@mui/icons-material/Delete'; 
import FrageHinzufügenModal from './FragenHinzufügenModal';

const AdminPanel: React.FC = () => {
    const { frageHinzufügen, frageLöschen, fragen } = useQuiz();
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <button onClick={() => setModalShow(true)}>
                Neue Frage hinzufügen
            </button>
            <FrageHinzufügenModal 
                show={modalShow} 
                onClose={() => setModalShow(false)} 
                onFrageHinzufügen={(neueFrage) => {
                    frageHinzufügen(neueFrage);
                }} 
            />
            {fragen.map((frage) => (
                <div key={frage.id}>
                    <p>{frage.Question}</p>
                    <button onClick={() => frageLöschen(frage.id)}>
                        <DeleteIcon /> 
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
