'use client'
import { useEffect, useState } from "react";

export default function T4_5(){
    const [input, setInput] = useState('')
    const [sum, setSum] = useState(0)
    
    useEffect(()=>{
        const parts = input.split('/')
        const numbers = parts.map(Number).filter(num => !isNaN(num))
        setSum(numbers.reduce((partialSum, a) => partialSum + a, 0))
    },[input])


    return(
        <div>
            <h2>сумма чисел: {sum}</h2>
            <input value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
    )
}