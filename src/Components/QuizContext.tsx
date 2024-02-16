import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
    const accessKey = '$2a$10$DBmnuMhyBOF9qvRc34n6WuVPl/2jb9vPcp98yDdCALQPMNiGBQegy'; 

    const ladeFragen = async () => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/65cf0e441f5677401f300e1b/latest', {
            headers: {
                'X-Master-Key': accessKey,
            },
        });
        setFragen(response.data.record.Questions); 
    } catch (error) {
        console.error('Error loading questions:', error);
    }
};


    const frageHinzufügen = async (neueFrage: Omit<Frage, 'id'>) => {
        try {
            await axios.post('https://api.jsonbin.io/v3/b/65cf0e441f5677401f300e1b', {
                ...neueFrage,
                id: uuidv4(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': accessKey,
                },
            });
            ladeFragen();
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const frageLöschen = async (frageId: string) => {
        try {
            await axios.delete(`https://api.jsonbin.io/v3/b/65cf0e441f5677401f300e1b/record/${frageId}`, {
                headers: {
                    'X-Master-Key': accessKey,
                },
            });
            ladeFragen();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
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
        throw new Error('use a Provider');
    }
    return context;
};
