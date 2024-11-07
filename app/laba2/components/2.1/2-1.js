'use client'
import { useState } from "react";

export default function T2_1(){
    const [number, setNumber] = useState("")
    const [result, setResult] = useState("")
    function checkEvenOrOdd() {
        // Преобразуем введенное значение в число
        const num = Number(number);

        // Проверяем, является ли число четным или нечетным
        if (num === 0 || num === NaN) {
            setResult('Пожалуйста, введите корректное число!');
        } else {
            setResult(num % 2 === 0 ? 'Четное' : 'Нечетное');
        }
    }
    return(<>
        <div>
            <input value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
            <h2>{result}</h2>
            <div className="Button" onClick={()=>{checkEvenOrOdd()}}>Check</div>
        </div>
    </>)
}