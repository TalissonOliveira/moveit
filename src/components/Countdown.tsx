import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout //Definir tipagem dessa variável (js puro)

export function Countdown() {
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinisehd] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') //padStart -> verifica se a string tem 2 caracteres, se não tiver acrescenta o 0 na frente
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('') //split -> divide, exemplo '25'('2', '5')

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.05 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinisehd(true)
            setIsActive(false)
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
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

            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            )}

            
        </div>
    );
}