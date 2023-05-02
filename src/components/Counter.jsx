import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export const Counter = ({ countId, refreshCounter, textcolor, countMax, countMin, countChange, title, passCount, initialCount, isActive }) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        if(refreshCounter){
            setCount(initialCount);
        }
    }, [refreshCounter, initialCount])

    const increment = () => {
        if(!isActive){
            if(count < countMax){
                setCount(count + countChange);
                passCount(count + countChange);
            }
            else {
                setCount(countMax)
                passCount(countMax)
            }
        }
    }

    const decrement = () => {
        if(!isActive){
            if(count > countMin){
                setCount(count - countChange);
                passCount(count - countChange);
            }
            else {
                setCount(countMin)
                passCount(countMin)
            }
        }
    }

    return (
        <div className={`container w-75 p-2 bg-dark rounded-pill border border-5 border-${textcolor}`}>
                <div className='row'>
                    <h2 id={`${countId}-label`} className={`col-12 d-flex text-${textcolor} justify-content-center`}>{title}</h2>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-auto'><Button id={`${countId}-decrement`} onClick={() => decrement()} className='btn-danger rounded-circle btn'>-</Button></div>
                    <div className={`col-auto border border-${textcolor} border-3 rounded fs-3 text-${textcolor}`}>{`${(count/countChange)}`}</div> 
                    <div className='col-auto'><Button id={`${countId}-increment`} onClick={() => increment()} className='btn-success rounded-circle btn'>+</Button></div>
                </div>
            </div>
    )
}
