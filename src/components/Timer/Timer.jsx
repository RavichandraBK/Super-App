import React, { useState } from 'react'
import styles from './Timer.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Timer = () => {
    const timerChild = ({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
        console.log(seconds, time.clockTime);

        return (
            <p className={styles.clockText}>
                {hours < 10 ? `0${hours}` : `${hours}`}:{minutes < 10 ? `0${minutes}` : `${minutes}`}:{seconds < 10 ? `0${seconds}` : `${seconds}`}
            </p>
        )
    }

    const [time, setTime] = useState({
        hour: 0,
        min: 0,
        sec: 0,
        clockTime: 0,
        newStart: 0,
        started: false,
        play: true,
        invalidTime: false,
    })
    const handleStart = () => {
        if ((time.hour > 0 || time.min > 0 || time.sec > 0)) {
            let clockValue = (time.hour * 3600) + (time.min * 60) + time.sec;
            setTime({ ...time, clockTime: clockValue, newStart: time.newStart + 1, started: true, invalidTime: false });
        }
        else {
            setTime({ ...time, invalidTime: true });
        }
    }
    const handlePause = () => {
        setTime((prev) => ({ ...prev, play: !prev.play }));
    }
    const handleReset = () => {
        setTime((prev) => ({ ...prev, hour: 0, min: 0, sec: 0, clockTime: 0, started: false, play: true }));
    }
    return (
        <>
            <div className={styles.timerParent}>
                <div className={styles.timerLeft}>

                    <CountdownCircleTimer
                        key={time.newStart}
                        isPlaying={time.play}
                        isGrowing
                        size={'250'}
                        rotation='counterclockwise'
                        trailColor='none'
                        duration={time.clockTime >= 0 ? time.clockTime : 0}
                        colors={['#FF6A6A']}
                    >
                        {timerChild}
                    </CountdownCircleTimer>
                </div>
                <div className={styles.timerRight}>
                    <div>
                        <div className={styles.timerSetText}>
                            <p>Hours</p>
                            <p>Minutes</p>
                            <p>Seconds</p>
                        </div>
                        <div className={styles.timerUpArr}>
                            <img src="/assets/timeUpArr.svg" alt="" onClick={() => { time.hour < 23 ? setTime({ ...time, hour: time.hour + 1 }) : setTime({ ...time, hour: 0 }) }} />
                            <img src="/assets/timeUpArr.svg" alt="" onClick={() => { time.min < 60 ? setTime({ ...time, min: time.min + 1 }) : setTime({ ...time, min: 0 }) }} />
                            <img src="/assets/timeUpArr.svg" alt="" onClick={() => { time.sec < 60 ? setTime({ ...time, sec: time.sec + 1 }) : setTime({ ...time, sec: 0 }) }} />
                        </div>
                        <div className={styles.timerSetValue}>
                            <p>{time.hour < 10 ? `0${time.hour}` : time.hour}<span style={{ position: 'relative', left: '50px' }}>:</span></p>
                            <p>{time.min < 10 ? `0${time.min}` : time.min}<span style={{ position: 'relative', left: '50px' }}>:</span></p>
                            <p>{time.sec < 10 ? `0${time.sec}` : time.sec}</p>
                        </div>
                        <div className={styles.timerDownArr}>
                            <img src="/assets/timeDownArr.svg" alt="" onClick={() => { time.hour > 0 ? setTime({ ...time, hour: time.hour - 1 }) : setTime({ ...time, hour: 23 }); }} />
                            <img src="/assets/timeDownArr.svg" alt="" onClick={() => { time.min > 0 ? setTime({ ...time, min: time.min - 1 }) : setTime({ ...time, min: 60 }); }} />
                            <img src="/assets/timeDownArr.svg" alt="" onClick={() => { time.sec > 0 ? setTime({ ...time, sec: time.sec - 1 }) : setTime({ ...time, sec: 60 }); }} />
                        </div>
                    </div>
                    <div className={styles.timerBtns}>
                        {
                            time.started ? (<>
                                <button className={styles.timerPause} onClick={handlePause}>{time.play ? 'Pause' : 'Resume'}</button>
                                <button className={styles.timerReset} onClick={handleReset}>Reset</button>
                            </>
                            ) : (<button className={styles.timerStart} onClick={handleStart}>Start</button>)
                        }

                    </div>
                    {time.invalidTime && ((time.hour === 0 && time.min === 0 && time.sec === 0)) ? (<p style={{ color: 'red', fontFamily: 'Roboto', fontSize: '20px', textAlign: 'center' }}>
                        Please Set Valid Time
                    </p>) : ''}
                </div>
            </div>
        </>
    )
}

export default Timer