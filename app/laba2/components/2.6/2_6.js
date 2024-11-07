'use client'
import { useEffect, useState } from "react";
export default function T2_6(){
    const[averageMath, setAverageMath] = useState([])
    function getAverageNumbers() {
        const parts = averageMath.split('/'); // Разделяем по '/'
        const numbers = parts.map(Number).filter(num => !isNaN(num)); // Преобразуем в массив чисел
        const sum = numbers.reduce((partialSum, a) => partialSum + a, 0)
        setAverageMath((sum/numbers.length).toFixed(2)) 
        console.log(sum)
    }
    return(
        <div className="input-form_block">
            <input className="mb-15" value={averageMath} onChange={(e)=>{setAverageMath(e.target.value)}}/>
            <div className="Button" onClick={()=>{getAverageNumbers()}}>Результат</div>
        </div>
    )
}