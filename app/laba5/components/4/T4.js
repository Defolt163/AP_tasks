import React from "react";

// Класс Circle с методом Area
export class CircleT4 {
  constructor(radius) {
    this.radius = radius;
  }

  // Метод для вычисления площади круга
  Area() {
    return Math.PI * this.radius * this.radius;
  }
}

// Класс Rectangle с методом Area
export class RectangleT4 {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // Метод для вычисления площади прямоугольника
  Area() {
    return this.width * this.height;
  }
}

export function ShapeInfo({ shape }) {
  // Проверка наличия метода Area (имитация интерфейса)
  if (typeof shape.Area !== "function") {
    throw new Error("Ошибка");
  }

  return (
    <div>
      <p>Area: {shape.Area().toFixed(2)}</p>
    </div>
  );
}