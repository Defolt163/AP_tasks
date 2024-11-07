import { useState } from "react"

export default function T2_5(){
    const[width, setWidth] = useState(0)
    const[height, setHeight] = useState(0)
    class Rectangle {
        constructor(width, height) {
            this.width = width
            this.height = height
        }
    
        // Метод для вычисления площади
        getArea() {
            return this.width * this.height
        }
    }
    const myRectangle = new Rectangle(width, height)
    return(
        <div>
            <label htmlFor="width">Ширина</label>
            <input id="width" className="mb-15" value={width} onChange={(e)=>{setWidth(e.target.value)}}/>
            <label htmlFor="height">Высота</label>
            <input id="height" value={height} onChange={(e)=>{setHeight(e.target.value)}}/>
            <h2>Площадь прямоугольника: {myRectangle.getArea()}</h2>
        </div>
    )
}