import React from "react";

export class CircleT5 {
  constructor(radius) {
    this.radius = radius;
  }

  Area() {
    return Math.PI * this.radius * this.radius;
  }
}

export class RectangleT5 {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  Area() {
    return this.width * this.height;
  }
}

export function printAreas(shapes) {
  return shapes.map((shape, index) => {
    if (typeof shape.Area === "function") {
      return <p key={index}>Объект {index + 1}: Площадь = {shape.Area().toFixed(2)}</p>;
    } else {
      return <p key={index} style={{ color: "red" }}>Объект {index + 1} - Некорректный</p>;
    }
  });
}