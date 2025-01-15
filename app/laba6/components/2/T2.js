import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

async function* generateFibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}
export function T2() {
  const [fibonacciNumbers, setFibonacciNumbers] = useState([]);

  useEffect(() => {
    const fetchFibonacci = async () => {
      const channel = generateFibonacci(10);
      const numbers = [];
      
      try {
        for await (const number of channel) {
          numbers.push(number);
          console.log(`Получен: ${number}`);
        }
      } catch (error) {
        console.error('Ошибка чтения канала:', error);
      } finally {
        console.log('Канал закрыт');
      }

      setFibonacciNumbers(numbers);
    };

    fetchFibonacci();
  }, []);

  return (
    <div>
      <h2>Числа фибоначчи</h2>
      <ul>
        {fibonacciNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}