import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  currentExperience: number,
  challengesCompleted: number,
  level: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  activeChallenge: Challenge,
  resetChallenge: () => void,
  experienceToNextLevel: number
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <challengesContext.Provider
      value={
        {
          currentExperience,
          challengesCompleted,
          level,
          levelUp,
          startNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceToNextLevel
        }
      }
    >
      {children}
    </challengesContext.Provider>
  );
}