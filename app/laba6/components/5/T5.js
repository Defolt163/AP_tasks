import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";


export function T5() {
  const [result, setResult] = useState(null);
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operator, setOperator] = useState('+');

  // Функция для выполнения вычислений
  const handleCalculate = async () => {
    
    // Преобразуем операнды в числа
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Ошибка пустого инпута');
      return;
    }

    // Выполнение операции
    let calculationResult = 0;
    switch (operator) {
      case '+':
        calculationResult = num1 + num2;
        break;
      case '-':
        calculationResult = num1 - num2;
        break;
      case '*':
        calculationResult = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          calculationResult = 'Ошибка';
        } else {
          calculationResult = num1 / num2;
        }
        break;
    }

    // Обновляем результат
    setResult(calculationResult);
  };

  return (
    <div>
      <h2>Калькулятор</h2>
      <div>
        <input
          type="number"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
        />
        <input
          type="number"
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
        />
        <select className="text-black p-1 my-1" onChange={(e) => setOperator(e.target.value)} value={operator}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
      </div>
      <Button
          onClick={handleCalculate}
        >
          =
      </Button>
      <h3>Результат: {result !== null ? result : 'No result'}</h3>
    </div>
  );
}