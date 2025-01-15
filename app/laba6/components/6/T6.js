import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

// Пример асинхронной задачи
const performTask = async (task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(`Задание ${task} выполнено`);
      } else {
        reject(new Error(`Задание ${task} провалено`));
      }
    }, 1000);
  });
};

// Многопоточный пул воркеров
const workerPool = async (tasks) => {
  const results = [];
  const workers = tasks.map((task, index) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`Воркер начал задачу: ${task}`);
        const result = await performTask(task); // Асинхронная операция
        console.log(`Воркер завершил задачу: ${task}`);
        results.push(result);
        resolve(result);
      } catch (error) {
        console.error(`Ошибка ${index + 1}:`, error);
        reject(error);
      }
    });
  });

  try {
    const finalResults = await Promise.all(workers); // Ждем завершения всех воркеров
    console.log('Все задания выполнены', finalResults);
    return results;
  } catch (error) {
    console.error('Ошибка работы воркеров:', error);
  }
};


export function T6() {
  const [taskResults, setTaskResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Флаг, чтобы избежать состояния после размонтирования

    const startWorkerPool = async () => {
      if (isMounted) {
        setLoading(true);
        console.log('Старт');
        try {
          const results = await workerPool([1, 2, 3, 4, 5, 6, 7]);
          if (isMounted) setTaskResults(results); // Обновление состояния только если компонент активен
        } catch (error) {
          console.error('Ошибка', error);
        } finally {
          if (isMounted) setLoading(false); // Окончание загрузки
        }
      }
    };

    startWorkerPool();

    return () => {
      isMounted = false; // Очистка флага при размонтировании компонента
    };
  }, []);

  return (
    <div>
      <h1>Результаты</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {taskResults && taskResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div> 
  );
}