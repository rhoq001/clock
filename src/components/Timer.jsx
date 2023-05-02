import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import beep from '../audio/beep.mp3'
import { FaPlay, FaPause,  } from 'react-icons/fa';
import {GrRefresh} from 'react-icons/gr'

const Timer = ({ setRefresh, activeTimer, timer, timeout }) => {

    const audioRef = useRef(null)

    const [isRunning, setIsRunning] = useState(false);
    const [started, setStarted] = useState(false);
    const [clock, setClock] = useState(true)
    
    const [timeoutLeft, setTimeoutLeft] = useState(timeout);
    const [timeLeft, setTimeLeft] = useState(timer);

    useEffect(() => {
        setTimeLeft(timer);
        setTimeoutLeft(timeout);
    }, [timer, timeout, clock])

    useEffect(() => {
        if(!started){
            setTimeLeft(timer)
        }
    }, [started, timer])

    useEffect(() => {
        if(!started){
            setTimeoutLeft(timeout)
        }
    }, [started, timeout])

    useEffect(() => {
        let intervalId = null;
        let intervalOutId = null;
        
        
        if (clock && isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        
        if (!clock && isRunning && timeoutLeft > 0) {
            intervalOutId = setInterval(() => {
                setTimeoutLeft(timeoutLeft - 1);
            }, 1000);
        }
        
        if (timeLeft === 0) {
            audioRef.current.play();
            setTimeout(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setClock(false)
            }, 1000);
        }
        else if (timeoutLeft === 0) {
            audioRef.current.play();
            setTimeout(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setClock(true)
            }, 1000);
        }
        
        return () => {clearInterval(intervalId); clearInterval(intervalOutId);}
    }, [isRunning, timeLeft, timeoutLeft, clock]);

    const handleClick = (running) => {
        setIsRunning(running);
        activeTimer(running);
        if(running){
            setStarted(true);
        }
    }

    const handleRefresh = () => {
        setTimeLeft(timer);
        setTimeoutLeft(timeout);
        setIsRunning(false);
        setClock(true);
        setStarted(false);
        setRefresh();
        activeTimer(false);
    }

    const getTime = (time) => {
        const minutes = Math.floor(time/60);
        const seconds = (time - 60*minutes);
        return (
            <>
                {`${minutes > 9 ? minutes : `0 ${minutes}`} : ${seconds > 9 ? seconds : `0 ${seconds}`}`}
            </>
        )
    }

    return (
        <div className={`container bg-dark p-4 border border-5 rounded-pill ${clock ? 'border-info' : 'border-warning'}`}>
            <div className='row'>
                <h1 id="timer-label" className={`col-12 d-flex justify-content-center ${clock ? 'text-info' : 'text-warning'}`}>
                    {clock ? 'Session' : 'Break'}
                </h1>
            </div>
            <div className='row mb-5'>
                <h3 id="timer-left" className={`col-12 text-light rounded-pill d-flex border-5 border justify-content-center ${isRunning ? 'border-success' : 'border-danger'}`}>
                    {clock ? getTime(timeLeft) : getTime(timeoutLeft)}
                </h3>
            </div>
            <div className='row mt-5 mb-3 '>
                <div id="start_stop" className='col-8 d-flex justify-content-center'><Button onClick={() => handleClick(!isRunning)} className={`bg-${isRunning ? 'danger' : 'success'} border-light btn-primary rounded-pill btn border border-5`}><FaPlay /> / <FaPause /></Button></div>
                <div id="reset" className='col-4 d-flex justify-content-center'><Button onClick={() => handleRefresh()} className={`btn-primary border-light rounded-circle btn border border-5`}><GrRefresh /></Button></div>
                <audio className='d-none' id='beep' ref={audioRef} src={beep} controls></audio>
            </div>
        </div>
    )
}

export default Timer