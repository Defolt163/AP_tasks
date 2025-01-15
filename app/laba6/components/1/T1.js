import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export function T1() {
  const [factorialResult, setFactorialResult] = useState(null);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [sumSeries, setSumSeries] = useState(null);

  const calculateFactorial = (n) => {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
  }

  const generateRandomNumbers = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
  }

  const calculateSumSeries = (n) => {
    return (n * (n + 1)) / 2;
  }

  const handleRun = async () => {
    // Start all tasks in parallel
    const factorialTask = new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculateFactorial(5));
      }, 1000);
    })

    const randomNumbersTask = new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateRandomNumbers(10));
      }, 1000);
    })

    const sumSeriesTask = new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculateSumSeries(100));
      }, 1000);
    })

    // Wait for all tasks to complete
    const [factorial, randomNums, sumSeries] = await Promise.all([
      factorialTask,
      randomNumbersTask,
      sumSeriesTask,
    ]);

    setFactorialResult(factorial);
    setRandomNumbers(randomNums);
    setSumSeries(sumSeries);
  }

  return (
    <div>
      <div>
        <h2>Факториал: {factorialResult}</h2>
      </div>
      <div>
        <h2>Рандомные значения: {randomNumbers.join(', ')}</h2>
      </div>
      <div>
        <h2>Сумма числового ряда: {sumSeries}</h2>
      </div>
      <Button onClick={handleRun}>Запустить</Button>
    </div>
  );
}