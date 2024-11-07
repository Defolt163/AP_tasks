'use client'
import { useState } from "react";

export default function T2_4(){
    const [number, setNumber] = useState("")
    return(<>
        <div>
            <input value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
            <h2>Длина строки: {number.length}</h2>
        </div>
    </>)
}