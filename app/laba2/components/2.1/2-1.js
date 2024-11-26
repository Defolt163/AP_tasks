'use client'
import { useEffect, useState } from "react";

export default function T2_1(){
    const [number, setNumber] = useState("")
    const [result, setResult] = useState("")
    function checkEvenOrOdd() {
        // Преобразуем введенное значение в число
        let num = Number(number);

        // Проверяем, является ли число четным или нечетным
        if (number === 0 || number === NaN) {
            setResult('Пожалуйста, введите корректное число!');
        } else {
            setResult(num % 2 === 0 ? 'Четное' : 'Нечетное');
        }
    }
    return(<>
        <div>
            <input value={number} type='number' onChange={(e)=>{setNumber(e.target.value)}}/>
            <h2>{result}</h2>
            <div className="Button" onClick={()=>{checkEvenOrOdd()}}>Check</div>
        </div>
    </>)
}