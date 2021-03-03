import { useEffect, useState, useContext } from 'react';

import { challengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/CountDown.module.css';

let countDownTimeOut: NodeJS.Timeout;

export function CountDown() {
  const { startNewChallenge } = useContext(challengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countDownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button
                className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                onClick={resetCountDown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  className={styles.countDownButton}
                  onClick={startCountDown}
                >
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  );
}