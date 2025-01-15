import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

// Асинхронная функция для генерации случайных чисел
async function* randomNumberGenerator(count) {
  for (let i = 0; i < count; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    console.log(`Сгенерирован номер: ${randomNum}`);
    yield randomNum;
    await new Promise(resolve => setTimeout(resolve, 500)); // Имитация задержки
  }
}

// Асинхронная функция для определения чётности/нечётности
async function* evenOddChecker(channel) {
  for await (const number of channel) {
    const message = number % 2 === 0 ? `Четное` : `Нечетное`;
    console.log(`Число: ${number}, Статус: ${message}`);
    yield message;
  }
}

export function T3() {
  useEffect(() => {
    const runSelect = async () => {
      const numberChannel = randomNumberGenerator(10);
      const messageChannel = evenOddChecker(numberChannel);

      let numberDone = false;
      let messageDone = false;

      while (!numberDone || !messageDone) {
        const result = await Promise.race([
          (async () => {
            const n = await numberChannel.next();
            numberDone = n.done;
            return { type: 'number', value: n.done ? null : n.value };
          })(),
          (async () => {
            const m = await messageChannel.next();
            messageDone = m.done;
            return { type: 'message', value: m.done ? null : m.value };
          })(),
        ]);
      }

      console.log('Канал закрыт');
    };

    runSelect();
  }, []);

  return (
    <div>
      <h2>Консоль</h2>
    </div>
  );
}