import { createContext, useState, ReactNode } from 'react';


interface ChallengesContextData {
    level: number;
    currentExperience: number;
    ChallengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [ChallengesCompleted, setChallengesCompleted] = useState(0)

    function levelUp() {
      setLevel(level + 1)
    }

    function startNewChallenge() {
        console.log('New challenge')
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level,
                currentExperience,
                ChallengesCompleted,
                levelUp,
                startNewChallenge
            }}
        > {/* Todos os elementos dentro do Provider vão ter acesso aos dados do daquele contexto */}
            {children}
        </ChallengesContext.Provider>
    );
}