'use client'
import { useEffect, useState } from "react";

export default function T4_4(){
    const [input, setInput] = useState('')
    


    return(
        <div>
            <h2>{input.toUpperCase()}</h2>
            <input value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
    )
}