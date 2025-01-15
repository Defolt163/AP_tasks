import React, { Component } from "react";

export class Circle extends Component {
  // Метод для вычисления площади круга
  calculateArea() {
    const { radius } = this.props;
    return Math.PI * radius * radius;
  }

  render() {
    const { radius } = this.props;
    return (
      <div>
        <h2>Инфо о круге</h2>
        <p>Радиус: {radius}</p>
        <p>Площадь: {this.calculateArea().toFixed(2)}</p>
      </div>
    );
  }
}