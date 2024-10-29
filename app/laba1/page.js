'use client'

import { useEffect, useState } from "react";

export default function LabaPage(){
    //1.1
    const[time, setTime] = useState(null)

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const currentTime = `${hours}:${minutes}:${seconds}`; // Используем обратные кавычки для шаблонной строки
            setTime(currentTime);
        };

        updateTime(); // Обновляем время сразу при монтировании компонента
        const intervalId = setInterval(updateTime, 1000); // Устанавливаем интервал для обновления времени каждую секунду

        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
    }, []);
    //1.2
    // Целое число
    const intVariable = 42

    // Вещественное число (число с плавающей запятой)
    const floatVariable = 3.14

    // Строка
    const stringVariable = 'Hello, world!'

    // Логическое значение
    const boolVariable = true
    useEffect(()=>{
        console.log(`
            Целое число: ${intVariable} \n
            Double: ${floatVariable} \n
            Строка: ${stringVariable} \n
            Логика: ${boolVariable} \n
        `)
    },[])

    //1.4
    const [taskMath, setTaskMath] = useState("")
    function taskOk(){
        try {
            // Определяем оператор
            let operator;
            if(taskMath.includes('/')) {
                operator = '/'
            } else if(taskMath.includes('*')) {
                operator = '*'
            } else if(taskMath.includes('+')){
                operator = '+'
            } else if(taskMath.includes('-')){
                operator = '-'
            }
            else {
                alert('Введите выражение в формате "число/число" или "число*число"');
                return;
            }

            // Разделяем строку по оператору
            const parts = taskMath.split(operator)
            const num1 = parseFloat(parts[0])
            const num2 = parseFloat(parts[1])

            if (operator === '/' && num2 === 0) {
                alert('Деление на ноль невозможно!')
                return;
            }

            let result;
            if (operator === '/') {
                result = num1 / num2; // Выполняем деление
            }if (operator === '*') {
                result = num1 * num2; // Выполняем деление
            }if (operator === '+') {
                result = num1 + num2; // Выполняем деление
            }if (operator === '-') {
                result = num1 - num2; // Выполняем деление
            }

            setTaskMath(result)
        } catch (error) {
            alert('Ошибка при вычислении: ' + error.message);
        }

    }
    //1.6
    const[averageMath, setAverageMath] = useState([])
    function getAverageNumbers() {
        const parts = averageMath.split('/'); // Разделяем по '/'
        const numbers = parts.map(Number).filter(num => !isNaN(num)); // Преобразуем в массив чисел
        const sum = numbers.reduce((partialSum, a) => partialSum + a, 0)
        setAverageMath((sum/numbers.length).toFixed(2)) 
        console.log(sum)
    }

    return(
        <div className="dark">
            <div className="center">
                <h2 style={{fontSize: '18px'}}><strong>1</strong></h2>
                <h1 style={{fontSize: '42px'}}>{time}</h1>
                <h2 style={{fontSize: '18px'}}><strong>2-3</strong></h2>
                <h3>Целое число: {intVariable}</h3>
                <h3>Плавающая запятая: {floatVariable}</h3>
                <h3>Строка: {stringVariable}</h3>
                <h3 className="mb-15">Логическое значение: {!boolVariable ? "false" : "true"}</h3>
                <h2 style={{fontSize: '18px'}}><strong>4-5</strong></h2>
                <div className="input-form_block">
                    <input className="mb-15" value={taskMath} onChange={(e)=>{setTaskMath(e.target.value)}}/>
                    <div className="Button" onClick={()=>{taskOk()}}>Результат</div>
                </div>
                <h2 style={{fontSize: '18px'}}><strong>6</strong></h2>
                <div className="input-form_block">
                    <input className="mb-15" value={averageMath} onChange={(e)=>{setAverageMath(e.target.value)}}/>
                    <div className="Button" onClick={()=>{getAverageNumbers()}}>Результат</div>
                </div>
            </div>
        </div>
    )
}