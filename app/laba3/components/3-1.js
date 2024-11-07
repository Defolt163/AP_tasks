'use client'
import { useEffect, useState } from "react";
export default function T3_1(){
    const[factorialInput, setFactorialInput] = useState('')
    const [factorial, setFactorial] = useState('')

    function factorialMath(n) {
        if (n < 0) return null; // Факториал для отрицательных чисел не определён
        if (n === 0 || n === 1) return 1; // Базовый случай
        return n * factorialMath(n - 1); // Рекурсия
    }

    // Функция для обработки ввода и обновления факториала
    const handleCalculate = () => {
        const inputNumber = parseInt(factorialInput, 10);
        const result = factorialMath(inputNumber);
        setFactorial(result);
    }
   
    return(
        <div className="input-form_block">
            <input className="mb-15" value={factorialInput} onChange={(e)=>{setFactorialInput(e.target.value)}}/>
            <h2>Факториал {factorialInput} равен: {factorial}</h2>
            <div className="Button" onClick={handleCalculate}>Результат</div>
        </div>
    )
}