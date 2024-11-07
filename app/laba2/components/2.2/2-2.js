'use client'
import { useState } from "react";

export default function T2_2(){
    const [number, setNumber] = useState("")
    const [result, setResult] = useState("")
    function checkEvenOrOdd() {
        const num = Number(number);

        setResult(num < 0 ? "Negative" : num > 0 ? "Positive" : "Zero")
    }
    return(<>
        <div>
            <input value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
            <h2>{result}</h2>
            <div className="Button" onClick={()=>{checkEvenOrOdd()}}>Check</div>
        </div>
    </>)
}