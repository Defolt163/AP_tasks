import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

class Mutex {
  constructor() {
    this._locked = Promise.resolve();
  }

  // Блокируем мьютекс
  lock() {
    let unlock;
    const lock = new Promise(resolve => unlock = resolve);
    const willLock = this._locked.then(() => lock);
    this._locked = willLock.then(() => unlock);
    return willLock;
  }
}
export function T4() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Инициализация мьютекса
  const mutex = new Mutex();

  // Функция для инкремента счётчика с синхронизацией
  const incrementCounter = async () => {
    // Захватываем мьютекс, ожидаем его освобождения
    const release = await mutex.lock();

    // Инкрементируем счётчик с задержкой для имитации асинхронной работы
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      console.log("Counter updated to:", newCounter);
      return newCounter;
    });

    // Освобождаем мьютекс
    release();
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        incrementCounter();
      }, 500); // Каждые 500 мс увеличиваем счётчик

      // Останавливаем интервал через 5 секунд
      setTimeout(() => {
        clearInterval(interval);
        setIsRunning(false);
      }, 5000);

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }
  }, [isRunning]);
  return (
    <div>
      <h1>Счетчик: {counter}</h1>
      <Button onClick={() => setIsRunning(true)} disabled={isRunning}>
        Увеличить счетчик
      </Button>
      <Button onClick={() => setIsRunning(false)} disabled={!isRunning}>
        Остановить
      </Button>
    </div>
  );
}