import React, { useState } from "react";

export function Person({ initialName, initialAge }) {
  // Используем состояние для управления именем и возрастом
  const [name] = useState(initialName);
  const [age, setAge] = useState(initialAge);

  // Метод для увеличения возраста
  const birthday = () => {
    setAge(age + 1); // Обновляем состояние возраста
  };

  return (
    <div>
      <h2>Person Information</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={birthday} className="Button">Увеличить возраст 🎉</button>
    </div>
  );
}