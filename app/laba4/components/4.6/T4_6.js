'use client'
import { useEffect, useState } from "react";

export default function T4_6(){
    const [input, setInput] = useState('')
    const [reversedArray, setReversedArray] = useState('')
    
    useEffect(()=>{
        const numberArray = input.split("/").map(Number)
        setReversedArray(numberArray.reverse())

    })


    return(
        <div>
            <h2>Введенный массив: {input}</h2>
            <h2>Перевернутый массив: {reversedArray}</h2>
            <input value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
    )
}