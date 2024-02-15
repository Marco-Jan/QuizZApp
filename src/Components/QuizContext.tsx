import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Frage {
    id: string;
    Question: string; 
    Answers: string[]; 
    CorrectAnswer: string; 
}

interface QuizContextType {
    fragen: Frage[];
    ladeFragen: () => void;
    frageHinzufügen: (neueFrage: Omit<Frage, 'id'>) => Promise<void>;
    frageLöschen: (frageId: string) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fragen, setFragen] = useState<Frage[]>([]);

    const ladeFragen = async () => {
        const response = await fetch('http://localhost:5000/Questions');
        const data = await response.json();
        setFragen(data);
    };

    const frageHinzufügen = async (neueFrage: Omit<Frage, 'id'>) => {
        await fetch('http://localhost:5000/Questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...neueFrage, id: uuidv4() }),
        });
        ladeFragen();
    };

    const frageLöschen = async (frageId: string) => {
        await fetch(`http://localhost:5000/Questions/${frageId}`, {
            method: 'DELETE',
        });
        ladeFragen();
    };

    useEffect(() => {
        ladeFragen();
    }, []);

    return (
        <QuizContext.Provider value={{ fragen, ladeFragen, frageHinzufügen, frageLöschen }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
